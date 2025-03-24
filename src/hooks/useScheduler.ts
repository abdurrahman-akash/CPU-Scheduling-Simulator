import { useState } from 'react';
import { Process, SchedulerStats, SchedulingAlgorithm, Resource } from '../types';

export function useScheduler() {
  const [processes, setProcesses] = useState<Process[]>([]);
  const [results, setResults] = useState<Process[]>([]);
  const [stats, setStats] = useState<SchedulerStats>({
    avgTurnaroundTime: 0,
    avgWaitingTime: 0,
    throughput: 0
  });
  const [resources, setResources] = useState<Resource>({
    available: [],
    maximum: [],
    allocation: [],
    need: []
  });

  const addProcess = (process: Process) => {
    setProcesses(prev => [...prev, process]);
  };

  const calculateFCFS = () => {
    let time = 0;
    const sorted = [...processes].sort((a, b) => a.arrivalTime - b.arrivalTime);
    const completed: Process[] = [];

    sorted.forEach(process => {
      time = Math.max(time, process.arrivalTime);
      const completedTime = time + process.burstTime;
      const turnaroundTime = completedTime - process.arrivalTime;
      const waitingTime = turnaroundTime - process.burstTime;

      completed.push({
        ...process,
        completedTime,
        turnAroundTime: turnaroundTime,
        waitingTime
      });

      time = completedTime;
    });

    return completed;
  };

  const calculateSJF = () => {
    const completed: Process[] = [];
    const queue: Process[] = [];
    let time = 0;
    const remaining = [...processes];

    while (remaining.length > 0 || queue.length > 0) {
      while (remaining.length > 0 && remaining[0].arrivalTime <= time) {
        queue.push(remaining.shift()!);
      }

      if (queue.length === 0) {
        time = remaining[0].arrivalTime;
        continue;
      }

      queue.sort((a, b) => a.burstTime - b.burstTime);

      const process = queue.shift()!;
      const completedTime = time + process.burstTime;
      const turnaroundTime = completedTime - process.arrivalTime;
      const waitingTime = turnaroundTime - process.burstTime;

      completed.push({
        ...process,
        completedTime,
        turnAroundTime: turnaroundTime,
        waitingTime
      });

      time = completedTime;
    }

    return completed;
  };

  const calculateSRTF = () => {
    const completed: Process[] = [];
    const queue: (Process & { remainingTime: number })[] = [];
    let time = 0;
    const remaining = [...processes].map(p => ({ ...p, remainingTime: p.burstTime }));

    while (remaining.length > 0 || queue.length > 0) {
      while (remaining.length > 0 && remaining[0].arrivalTime <= time) {
        queue.push(remaining.shift()!);
      }

      if (queue.length === 0) {
        time = remaining[0].arrivalTime;
        continue;
      }

      queue.sort((a, b) => a.remainingTime - b.remainingTime);

      const process = queue[0];
      process.remainingTime--;
      time++;

      if (process.remainingTime === 0) {
        queue.shift();
        completed.push({
          ...process,
          completedTime: time,
          turnAroundTime: time - process.arrivalTime,
          waitingTime: time - process.arrivalTime - process.burstTime
        });
      }
    }

    return completed;
  };

  const calculateRR = (timeQuantum: number) => {
    const completed: Process[] = [];
    const queue: (Process & { remainingTime: number })[] = [];
    let time = 0;
    const remaining = [...processes].map(p => ({ ...p, remainingTime: p.burstTime }));

    while (remaining.length > 0 || queue.length > 0) {
      while (remaining.length > 0 && remaining[0].arrivalTime <= time) {
        queue.push(remaining.shift()!);
      }

      if (queue.length === 0) {
        time = remaining[0].arrivalTime;
        continue;
      }

      const process = queue.shift()!;
      const executionTime = Math.min(timeQuantum, process.remainingTime);
      process.remainingTime -= executionTime;
      time += executionTime;

      if (process.remainingTime === 0) {
        completed.push({
          ...process,
          completedTime: time,
          turnAroundTime: time - process.arrivalTime,
          waitingTime: time - process.arrivalTime - process.burstTime
        });
      } else {
        while (remaining.length > 0 && remaining[0].arrivalTime <= time) {
          queue.push(remaining.shift()!);
        }
        queue.push(process);
      }
    }

    return completed;
  };

  const calculatePriority = () => {
    const completed: Process[] = [];
    const queue: Process[] = [];
    let time = 0;
    const remaining = [...processes];

    while (remaining.length > 0 || queue.length > 0) {
      while (remaining.length > 0 && remaining[0].arrivalTime <= time) {
        queue.push(remaining.shift()!);
      }

      if (queue.length === 0) {
        time = remaining[0].arrivalTime;
        continue;
      }

      queue.sort((a, b) => (a.priority || 0) - (b.priority || 0));

      const process = queue.shift()!;
      const completedTime = time + process.burstTime;
      const turnaroundTime = completedTime - process.arrivalTime;
      const waitingTime = turnaroundTime - process.burstTime;

      completed.push({
        ...process,
        completedTime,
        turnAroundTime: turnaroundTime,
        waitingTime
      });

      time = completedTime;
    }

    return completed;
  };

  const isSafeState = (available: number[], allocation: number[][], need: number[][]): boolean => {
    const n = allocation.length; // number of processes
    const m = available.length; // number of resources
    const work = [...available];
    const finish = new Array(n).fill(false);

    let count = 0;
    while (count < n) {
      let found = false;
      for (let i = 0; i < n; i++) {
        if (!finish[i]) {
          let j;
          for (j = 0; j < m; j++) {
            if (need[i][j] > work[j]) break;
          }
          if (j === m) {
            for (let k = 0; k < m; k++) {
              work[k] += allocation[i][k];
            }
            finish[i] = true;
            found = true;
            count++;
          }
        }
      }
      if (!found) break;
    }
    return count === n;
  };

  const calculateBankers = () => {
    const { available, maximum, allocation, need } = resources;
    if (!isSafeState(available, allocation, need)) {
      throw new Error('System is not in safe state');
    }
    return processes;
  };

  const updateStats = (completed: Process[]) => {
    const totalTurnaround = completed.reduce((sum, p) => sum + (p.turnAroundTime || 0), 0);
    const totalWaiting = completed.reduce((sum, p) => sum + (p.waitingTime || 0), 0);
    const maxCompletedTime = Math.max(...completed.map(p => p.completedTime || 0));

    setStats({
      avgTurnaroundTime: totalTurnaround / completed.length,
      avgWaitingTime: totalWaiting / completed.length,
      throughput: completed.length / maxCompletedTime
    });
  };

  const calculate = (algorithm: SchedulingAlgorithm, timeQuantum?: number) => {
    if (processes.length === 0) return;

    let completed: Process[];
    switch (algorithm) {
      case 'FCFS':
        completed = calculateFCFS();
        break;
      case 'SJF':
        completed = calculateSJF();
        break;
      case 'SRTF':
        completed = calculateSRTF();
        break;
      case 'RR':
        completed = calculateRR(timeQuantum || 1);
        break;
      case 'Priority':
        completed = calculatePriority();
        break;
      case 'Bankers':
        completed = calculateBankers();
        break;
      default:
        completed = calculateFCFS();
    }

    setResults(completed);
    updateStats(completed);
  };

  const reset = () => {
    setProcesses([]);
    setResults([]);
    setStats({
      avgTurnaroundTime: 0,
      avgWaitingTime: 0,
      throughput: 0
    });
    setResources({
      available: [],
      maximum: [],
      allocation: [],
      need: []
    });
  };

  const setResourceState = (newResources: Resource) => {
    setResources(newResources);
  };

  return {
    processes,
    results,
    stats,
    resources,
    addProcess,
    calculate,
    reset,
    setResourceState
  };
}
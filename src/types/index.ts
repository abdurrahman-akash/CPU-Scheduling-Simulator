export interface Process {
  processID: number;
  arrivalTime: number;
  burstTime: number;
  priority?: number;
  completedTime?: number;
  waitingTime?: number;
  turnAroundTime?: number;
}

export interface Resource {
  available: number[];
  maximum: number[][];
  allocation: number[][];
  need: number[][];
}

export interface SchedulerStats {
  avgTurnaroundTime: number;
  avgWaitingTime: number;
  throughput: number;
}

export type SchedulingAlgorithm = 'FCFS' | 'SJF' | 'SRTF' | 'RR' | 'Priority' | 'Bankers';
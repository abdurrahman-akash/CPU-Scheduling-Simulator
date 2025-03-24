import React from 'react';
import { motion } from 'framer-motion';
import { Process } from '../types';
import { Paper, Typography, Box, Tooltip } from '@mui/material';

interface GanttChartProps {
  processes: Process[];
}

export function GanttChart({ processes }: GanttChartProps) {
  if (!processes.length) return null;

  const sortedProcesses = [...processes].sort((a, b) => 
    (a.completedTime || 0) - (b.completedTime || 0)
  );

  const maxCompletionTime = Math.max(...processes.map(p => p.completedTime || 0));
  const timeScale = Array.from({ length: maxCompletionTime + 1 }, (_, i) => i);

  return (
    <Paper elevation={2} sx={{ p: 3, mt: 4 }}>
      <Typography variant="h6" sx={{ mb: 3 }}>Gantt Chart</Typography>
      <Box sx={{ position: 'relative', width: '100%', overflowX: 'auto' }}>
        {/* Time Scale */}
        <Box sx={{ 
          display: 'flex', 
          borderBottom: '1px solid rgba(0,0,0,0.1)',
          mb: 2,
          pb: 1
        }}>
          {timeScale.map((time) => (
            <Box
              key={time}
              sx={{
                minWidth: '50px',
                textAlign: 'center',
                fontSize: '0.75rem',
                color: 'text.secondary',
                fontFamily: 'monospace'
              }}
            >
              {time}
            </Box>
          ))}
        </Box>

        {/* Process Bars */}
        <Box sx={{ position: 'relative', minHeight: '200px' }}>
          {sortedProcesses.map((process, index) => {
            const startPosition = (process.arrivalTime || 0) * 50;
            const width = ((process.completedTime || 0) - (process.arrivalTime || 0)) * 50;
            const yPosition = index * 60;
            
            return (
              <Box
                key={`${process.processID}-${index}`}
                sx={{ position: 'absolute', top: yPosition, left: 0, right: 0, height: '50px' }}
              >
                {/* Process Label */}
                <Typography
                  variant="body2"
                  sx={{
                    position: 'absolute',
                    left: -80,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    fontWeight: 'bold'
                  }}
                >
                  P{process.processID}
                </Typography>

                {/* Process Bar */}
                <Tooltip
                  title={
                    <Box sx={{ p: 1 }}>
                      <Typography variant="body2">Process: P{process.processID}</Typography>
                      <Typography variant="body2">Arrival: {process.arrivalTime}</Typography>
                      <Typography variant="body2">Burst: {process.burstTime}</Typography>
                      <Typography variant="body2">Completion: {process.completedTime}</Typography>
                      <Typography variant="body2">Waiting: {process.waitingTime}</Typography>
                      <Typography variant="body2">Turnaround: {process.turnAroundTime}</Typography>
                      {process.priority !== undefined && (
                        <Typography variant="body2">Priority: {process.priority}</Typography>
                      )}
                    </Box>
                  }
                  arrow
                >
                  <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ 
                      width,
                      opacity: 1,
                      x: startPosition
                    }}
                    transition={{ 
                      duration: 0.5,
                      delay: index * 0.1,
                      ease: "easeOut"
                    }}
                    style={{
                      position: 'absolute',
                      height: '40px',
                      borderRadius: '8px',
                      background: `linear-gradient(45deg, 
                        hsl(${(index * 50) % 360}, 70%, 50%) 0%, 
                        hsl(${(index * 50 + 30) % 360}, 70%, 60%) 100%
                      )`,
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      transition: 'transform 0.2s ease',
                      '&:hover': {
                        transform: 'scale(1.02)'
                      }
                    }}
                  >
                    <Typography variant="body2" sx={{ color: 'white', fontWeight: 'bold' }}>
                      P{process.processID}
                    </Typography>
                  </motion.div>
                </Tooltip>

                {/* Completion Time Marker */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  style={{
                    position: 'absolute',
                    left: (process.completedTime || 0) * 50 - 10,
                    top: '100%',
                    marginTop: '4px'
                  }}
                >
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      fontFamily: 'monospace',
                      backgroundColor: 'rgba(0,0,0,0.05)',
                      padding: '2px 4px',
                      borderRadius: '4px'
                    }}
                  >
                    {process.completedTime}
                  </Typography>
                </motion.div>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Paper>
  );
}
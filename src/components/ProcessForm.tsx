import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Process } from '../types';
import { Plus } from 'lucide-react';
import { TextField, Button, Grid, Paper, Typography } from '@mui/material';

interface ProcessFormProps {
  onAddProcess: (process: Process) => void;
  showPriority?: boolean;
}

export function ProcessForm({ onAddProcess, showPriority = false }: ProcessFormProps) {
  const [processID, setProcessID] = useState('');
  const [arrivalTime, setArrivalTime] = useState('');
  const [burstTime, setBurstTime] = useState('');
  const [priority, setPriority] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!processID || !arrivalTime || !burstTime) return;

    onAddProcess({
      processID: parseInt(processID, 10),
      arrivalTime: parseInt(arrivalTime, 10),
      burstTime: parseInt(burstTime, 10),
      ...(showPriority && priority ? { priority: parseInt(priority, 10) } : {})
    });

    setProcessID('');
    setArrivalTime('');
    setBurstTime('');
    setPriority('');
  };

  return (
    <Paper 
      component={motion.form}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onSubmit={handleSubmit}
      elevation={2}
      sx={{ p: 3, mb: 4 }}
    >
      <Typography variant="h6" sx={{ mb: 3 }}>Add New Process</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={showPriority ? 2 : 3}>
          <TextField
            fullWidth
            label="Process ID"
            type="number"
            value={processID}
            onChange={(e) => setProcessID(e.target.value)}
            required
            InputProps={{ inputProps: { min: 0 } }}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} md={showPriority ? 2 : 3}>
          <TextField
            fullWidth
            label="Arrival Time"
            type="number"
            value={arrivalTime}
            onChange={(e) => setArrivalTime(e.target.value)}
            required
            InputProps={{ inputProps: { min: 0 } }}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} md={showPriority ? 2 : 3}>
          <TextField
            fullWidth
            label="Burst Time"
            type="number"
            value={burstTime}
            onChange={(e) => setBurstTime(e.target.value)}
            required
            InputProps={{ inputProps: { min: 0 } }}
            variant="outlined"
          />
        </Grid>
        {showPriority && (
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              label="Priority"
              type="number"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              required
              InputProps={{ inputProps: { min: 0 } }}
              variant="outlined"
            />
          </Grid>
        )}
        <Grid item xs={12} md={3} sx={{ display: 'flex', alignItems: 'center' }}>
          <Button
            component={motion.button}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            variant="contained"
            fullWidth
            startIcon={<Plus />}
            sx={{
              height: '56px',
              background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
              boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
            }}
          >
            Add Process
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}
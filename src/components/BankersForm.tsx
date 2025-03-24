import React, { useState } from 'react';
import { Resource } from '../types';
import { TextField, Button, Grid, Paper, Typography } from '@mui/material';

interface BankersFormProps {
  onSubmit: (resources: Resource) => void;
}

export function BankersForm({ onSubmit }: BankersFormProps) {
  const [numProcesses, setNumProcesses] = useState(3);
  const [numResources, setNumResources] = useState(3);
  const [available, setAvailable] = useState<number[]>([]);
  const [maximum, setMaximum] = useState<number[][]>([]);
  const [allocation, setAllocation] = useState<number[][]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const need: number[][] = maximum.map((max, i) =>
      max.map((m, j) => m - allocation[i][j])
    );

    onSubmit({
      available,
      maximum,
      allocation,
      need
    });
  };

  const handleMatrixChange = (
    matrix: number[][],
    setMatrix: React.Dispatch<React.SetStateAction<number[][]>>,
    i: number,
    j: number,
    value: string
  ) => {
    const newMatrix = [...matrix];
    if (!newMatrix[i]) newMatrix[i] = [];
    newMatrix[i][j] = parseInt(value) || 0;
    setMatrix(newMatrix);
  };

  return (
    <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
      <Typography variant="h6" sx={{ mb: 3 }}>Banker's Algorithm Configuration</Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Number of Processes"
              type="number"
              value={numProcesses}
              onChange={(e) => setNumProcesses(parseInt(e.target.value))}
              InputProps={{ inputProps: { min: 1 } }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Number of Resources"
              type="number"
              value={numResources}
              onChange={(e) => setNumResources(parseInt(e.target.value))}
              InputProps={{ inputProps: { min: 1 } }}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle1" sx={{ mb: 2 }}>Available Resources</Typography>
            <Grid container spacing={2}>
              {Array(numResources).fill(0).map((_, j) => (
                <Grid item xs={4} key={j}>
                  <TextField
                    fullWidth
                    label={`Resource ${j + 1}`}
                    type="number"
                    value={available[j] || ''}
                    onChange={(e) => {
                      const newAvailable = [...available];
                      newAvailable[j] = parseInt(e.target.value) || 0;
                      setAvailable(newAvailable);
                    }}
                    InputProps={{ inputProps: { min: 0 } }}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle1" sx={{ mb: 2 }}>Maximum Matrix</Typography>
            <Grid container spacing={2}>
              {Array(numProcesses).fill(0).map((_, i) => (
                Array(numResources).fill(0).map((_, j) => (
                  <Grid item xs={4} key={`max-${i}-${j}`}>
                    <TextField
                      fullWidth
                      label={`Process ${i + 1}, Resource ${j + 1}`}
                      type="number"
                      value={maximum[i]?.[j] || ''}
                      onChange={(e) => handleMatrixChange(maximum, setMaximum, i, j, e.target.value)}
                      InputProps={{ inputProps: { min: 0 } }}
                    />
                  </Grid>
                ))
              ))}
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle1" sx={{ mb: 2 }}>Allocation Matrix</Typography>
            <Grid container spacing={2}>
              {Array(numProcesses).fill(0).map((_, i) => (
                Array(numResources).fill(0).map((_, j) => (
                  <Grid item xs={4} key={`alloc-${i}-${j}`}>
                    <TextField
                      fullWidth
                      label={`Process ${i + 1}, Resource ${j + 1}`}
                      type="number"
                      value={allocation[i]?.[j] || ''}
                      onChange={(e) => handleMatrixChange(allocation, setAllocation, i, j, e.target.value)}
                      InputProps={{ inputProps: { min: 0 } }}
                    />
                  </Grid>
                ))
              ))}
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                height: '56px',
                background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
              }}
            >
              Calculate Safe Sequence
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
}
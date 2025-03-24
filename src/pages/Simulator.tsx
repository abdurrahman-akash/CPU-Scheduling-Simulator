import React, { useState } from 'react';
import { ProcessForm } from '../components/ProcessForm';
import { ProcessTable } from '../components/ProcessTable';
import { GanttChart } from '../components/GanttChart';
import { BankersForm } from '../components/BankersForm';
import { useScheduler } from '../hooks/useScheduler';
import { SchedulingAlgorithm } from '../types';
import { Calculator, Clock, BarChart, ArrowLeft, RefreshCw, Cpu } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Container, 
  AppBar, 
  Toolbar, 
  Typography, 
  Box, 
  Paper, 
  Select, 
  MenuItem, 
  FormControl, 
  InputLabel,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  Tooltip,
  Zoom
} from '@mui/material';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const algorithmDescriptions = {
  FCFS: "First Come First Served: Processes are executed in the order they arrive",
  SJF: "Shortest Job First: Executes the process with the shortest burst time first",
  SRTF: "Shortest Remaining Time First: Preemptive version of SJF",
  RR: "Round Robin: Each process gets a fixed time quantum",
  Priority: "Priority Scheduling: Processes are executed based on priority",
  Bankers: "Banker's Algorithm: Deadlock avoidance algorithm for resource allocation"
};

export function Simulator() {
  const [algorithm, setAlgorithm] = useState<SchedulingAlgorithm>('FCFS');
  const [timeQuantum, setTimeQuantum] = useState<number>(1);
  const { processes, results, stats, resources, addProcess, calculate, reset, setResourceState } = useScheduler();

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f0f4f8' }}>
      <AppBar 
        position="static" 
        sx={{ 
          background: 'linear-gradient(135deg, #1a365d 0%, #2563eb 100%)',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
        }}
      >
        <Toolbar>
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <Cpu className="h-8 w-8 mr-3 text-blue-100" />
            <Typography 
              variant="h5" 
              sx={{ 
                fontWeight: 700,
                background: 'linear-gradient(to right, #ffffff, #bfdbfe)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              CPU Scheduling Simulator
            </Typography>
          </Box>
          <Button 
            component={Link} 
            to="/" 
            color="inherit" 
            startIcon={<ArrowLeft />}
            sx={{
              backdropFilter: 'blur(8px)',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '12px',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.2)'
              }
            }}
          >
            Back to Home
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ py: 6 }}>
        <motion.div {...fadeIn}>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Paper 
                elevation={0}
                sx={{ 
                  p: 4, 
                  borderRadius: 3,
                  background: 'linear-gradient(145deg, #ffffff, #f8fafc)',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                }}
              >
                <Typography 
                  variant="h6" 
                  sx={{ 
                    mb: 3,
                    color: '#1a365d',
                    fontWeight: 600
                  }}
                >
                  Algorithm Selection
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={algorithm === 'RR' ? 8 : 12}>
                    <Tooltip 
                      title={algorithmDescriptions[algorithm]}
                      placement="top"
                      TransitionComponent={Zoom}
                      arrow
                    >
                      <FormControl fullWidth>
                        <InputLabel>Scheduling Algorithm</InputLabel>
                        <Select
                          value={algorithm}
                          label="Scheduling Algorithm"
                          onChange={(e) => setAlgorithm(e.target.value as SchedulingAlgorithm)}
                          sx={{
                            borderRadius: 2,
                            '& .MuiOutlinedInput-notchedOutline': {
                              borderColor: '#e2e8f0'
                            }
                          }}
                        >
                          <MenuItem value="FCFS">First Come First Served (FCFS)</MenuItem>
                          <MenuItem value="SJF">Shortest Job First (SJF)</MenuItem>
                          <MenuItem value="SRTF">Shortest Remaining Time First (SRTF)</MenuItem>
                          <MenuItem value="RR">Round Robin (RR)</MenuItem>
                          <MenuItem value="Priority">Priority Scheduling</MenuItem>
                          <MenuItem value="Bankers">Banker's Algorithm</MenuItem>
                        </Select>
                      </FormControl>
                    </Tooltip>
                  </Grid>
                  <AnimatePresence>
                    {algorithm === 'RR' && (
                      <Grid item xs={12} md={4}>
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                        >
                          <TextField
                            fullWidth
                            label="Time Quantum"
                            type="number"
                            value={timeQuantum}
                            onChange={(e) => setTimeQuantum(parseInt(e.target.value, 10))}
                            InputProps={{ 
                              inputProps: { min: 1 },
                              sx: { borderRadius: 2 }
                            }}
                            sx={{
                              '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#e2e8f0'
                              }
                            }}
                          />
                        </motion.div>
                      </Grid>
                    )}
                  </AnimatePresence>
                </Grid>
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <AnimatePresence mode="wait">
                {algorithm === 'Bankers' ? (
                  <motion.div
                    key="bankers"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <BankersForm onSubmit={setResourceState} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="process"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <ProcessForm 
                      onAddProcess={addProcess} 
                      showPriority={algorithm === 'Priority'}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </Grid>

            <Grid item xs={12}>
              <ProcessTable processes={processes} />
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
                <Button
                  variant="contained"
                  onClick={() => calculate(algorithm, timeQuantum)}
                  startIcon={<Calculator />}
                  sx={{
                    py: 1.5,
                    px: 4,
                    borderRadius: 2,
                    background: 'linear-gradient(135deg, #1a365d 0%, #2563eb 100%)',
                    boxShadow: '0 4px 6px -1px rgba(37, 99, 235, 0.5)',
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 6px 8px -1px rgba(37, 99, 235, 0.6)'
                    }
                  }}
                >
                  Calculate
                </Button>
                <Button
                  variant="outlined"
                  onClick={reset}
                  startIcon={<RefreshCw />}
                  sx={{
                    py: 1.5,
                    px: 4,
                    borderRadius: 2,
                    borderColor: '#2563eb',
                    color: '#2563eb',
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                      borderColor: '#1d4ed8',
                      background: 'rgba(37, 99, 235, 0.04)',
                      transform: 'translateY(-2px)'
                    }
                  }}
                >
                  Reset
                </Button>
              </Box>
            </Grid>

            <AnimatePresence>
              {results.length > 0 && (
                <>
                  <Grid item xs={12}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                    >
                      <ProcessTable processes={results} />
                    </motion.div>
                  </Grid>

                  {algorithm !== 'Bankers' && (
                    <Grid item xs={12}>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                      >
                        <GanttChart processes={results} />
                      </motion.div>
                    </Grid>
                  )}

                  <Grid item xs={12}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                    >
                      <Paper 
                        elevation={0}
                        sx={{ 
                          p: 4,
                          borderRadius: 3,
                          background: 'linear-gradient(145deg, #ffffff, #f8fafc)',
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                        }}
                      >
                        <Typography 
                          variant="h6" 
                          sx={{ 
                            mb: 4,
                            color: '#1a365d',
                            fontWeight: 600
                          }}
                        >
                          Performance Metrics
                        </Typography>
                        <Grid container spacing={4}>
                          <Grid item xs={12} md={4}>
                            <Card 
                              elevation={0}
                              sx={{
                                height: '100%',
                                background: 'linear-gradient(145deg, #ffffff, #f8fafc)',
                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                                borderRadius: 3,
                                transition: 'all 0.3s ease-in-out',
                                '&:hover': {
                                  transform: 'translateY(-4px)',
                                  boxShadow: '0 6px 8px -1px rgba(0, 0, 0, 0.15)'
                                }
                              }}
                            >
                              <CardContent sx={{ p: 3 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                  <Clock className="h-6 w-6 text-blue-600" />
                                  <Typography 
                                    sx={{ 
                                      ml: 1.5,
                                      color: '#1a365d',
                                      fontWeight: 500
                                    }}
                                  >
                                    Average Turnaround Time
                                  </Typography>
                                </Box>
                                <Typography 
                                  variant="h4"
                                  sx={{
                                    background: 'linear-gradient(135deg, #1a365d 0%, #2563eb 100%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    fontWeight: 700
                                  }}
                                >
                                  {stats.avgTurnaroundTime.toFixed(2)}
                                </Typography>
                              </CardContent>
                            </Card>
                          </Grid>
                          <Grid item xs={12} md={4}>
                            <Card 
                              elevation={0}
                              sx={{
                                height: '100%',
                                background: 'linear-gradient(145deg, #ffffff, #f8fafc)',
                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                                borderRadius: 3,
                                transition: 'all 0.3s ease-in-out',
                                '&:hover': {
                                  transform: 'translateY(-4px)',
                                  boxShadow: '0 6px 8px -1px rgba(0, 0, 0, 0.15)'
                                }
                              }}
                            >
                              <CardContent sx={{ p: 3 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                  <Clock className="h-6 w-6 text-blue-600" />
                                  <Typography 
                                    sx={{ 
                                      ml: 1.5,
                                      color: '#1a365d',
                                      fontWeight: 500
                                    }}
                                  >
                                    Average Waiting Time
                                  </Typography>
                                </Box>
                                <Typography 
                                  variant="h4"
                                  sx={{
                                    background: 'linear-gradient(135deg, #1a365d 0%, #2563eb 100%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    fontWeight: 700
                                  }}
                                >
                                  {stats.avgWaitingTime.toFixed(2)}
                                </Typography>
                              </CardContent>
                            </Card>
                          </Grid>
                          <Grid item xs={12} md={4}>
                            <Card 
                              elevation={0}
                              sx={{
                                height: '100%',
                                background: 'linear-gradient(145deg, #ffffff, #f8fafc)',
                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                                borderRadius: 3,
                                transition: 'all 0.3s ease-in-out',
                                '&:hover': {
                                  transform: 'translateY(-4px)',
                                  boxShadow: '0 6px 8px -1px rgba(0, 0, 0, 0.15)'
                                }
                              }}
                            >
                              <CardContent sx={{ p: 3 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                  <BarChart className="h-6 w-6 text-blue-600" />
                                  <Typography 
                                    sx={{ 
                                      ml: 1.5,
                                      color: '#1a365d',
                                      fontWeight: 500
                                    }}
                                  >
                                    Throughput
                                  </Typography>
                                </Box>
                                <Typography 
                                  variant="h4"
                                  sx={{
                                    background: 'linear-gradient(135deg, #1a365d 0%, #2563eb 100%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    fontWeight: 700
                                  }}
                                >
                                  {stats.throughput.toFixed(2)}
                                </Typography>
                              </CardContent>
                            </Card>
                          </Grid>
                        </Grid>
                      </Paper>
                    </motion.div>
                  </Grid>
                </>
              )}
            </AnimatePresence>
          </Grid>
        </motion.div>
      </Container>
    </Box>
  );
}
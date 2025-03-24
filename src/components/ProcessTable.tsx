import React from 'react';
import { Process } from '../types';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Paper, Typography } from '@mui/material';
import { motion } from 'framer-motion';

interface ProcessTableProps {
  processes: Process[];
}

export function ProcessTable({ processes }: ProcessTableProps) {
  const columns: GridColDef[] = [
    { 
      field: 'processID', 
      headerName: 'Process ID', 
      width: 130,
      renderCell: (params) => `P${params.value}`
    },
    { field: 'arrivalTime', headerName: 'Arrival Time', width: 130 },
    { field: 'burstTime', headerName: 'Burst Time', width: 130 },
    { 
      field: 'completedTime', 
      headerName: 'Completed Time', 
      width: 150,
      valueGetter: (params) => params.value || '-'
    },
    { 
      field: 'waitingTime', 
      headerName: 'Waiting Time', 
      width: 130,
      valueGetter: (params) => params.value || '-'
    },
    { 
      field: 'turnAroundTime', 
      headerName: 'Turnaround Time', 
      width: 150,
      valueGetter: (params) => params.value || '-'
    },
  ];

  const rows = processes.map((process, index) => ({
    id: index,
    ...process
  }));

  if (processes.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Paper 
          sx={{ 
            p: 4, 
            textAlign: 'center',
            background: 'linear-gradient(45deg, #f5f5f5 30%, #fafafa 90%)'
          }}
        >
          <Typography variant="h6" color="text.secondary">
            No processes added yet
          </Typography>
        </Paper>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Paper elevation={2} sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10, 20]}
          disableRowSelectionOnClick
          sx={{
            '& .MuiDataGrid-cell:hover': {
              color: 'primary.main',
            },
          }}
        />
      </Paper>
    </motion.div>
  );
}
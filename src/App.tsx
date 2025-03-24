import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { Simulator } from './pages/Simulator';
import { Footer } from './components/Footer';
import { Box } from '@mui/material';

function App() {
  return (
    <Router>
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        minHeight: '100vh'
      }}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/simulator" element={<Simulator />} />
        </Routes>
        <Footer />
      </Box>
    </Router>
  );
}

export default App;
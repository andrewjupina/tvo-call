import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginScreen from './LoginScreen';
import HomeScreen from './HomeScreen';
import ProtectedRoute from './ProtectedRoute'; // Import the ProtectedRoute component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/" element={<ProtectedRoute><HomeScreen /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;

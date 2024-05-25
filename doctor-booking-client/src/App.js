import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes ,Route } from 'react-router-dom';
import DoctorList from './components/DoctorList';
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DoctorList />} />
      </Routes>
    </Router>
  );
}

export default App;

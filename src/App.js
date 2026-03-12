import Home from './pages/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Mycourses from './pages/Mycourses';
import Signup from './pages/Signup';
import Coursedetail from './pages/Coursedetail';
import Dashboard from './pages/Dashboard';

import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/mycourses" element={<Mycourses />} />
          <Route path="/Coursedetail/:id" element={<Coursedetail />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
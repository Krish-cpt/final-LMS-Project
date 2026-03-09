import Home from './pages/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Mycourses from './pages/Mycourses';
import Signup from './pages/Signup';
import Coursedetail from './pages/Coursedetail';


import './App.css';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path ="/" element={<Home/>}/>
        <Route path ="/Login" element={<Login/>}/>
        <Route path ="/Mycourses" element={<Mycourses/>}/>
        <Route path ="/Signup" element={<Signup/>}/>
        <Route path="/Coursedetail/:id" element={<Coursedetail/>}/>
        
      </Routes>
      </BrowserRouter>

     
    </div>
  );
}

export default App;

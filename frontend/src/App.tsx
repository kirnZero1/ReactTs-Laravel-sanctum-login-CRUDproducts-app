import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '/node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'
import Home from './pages/Home';
import View from './pages/View';
import Create from './pages/Create';
import Update from './pages/Update';
import Login from './users/Login';
import Register from './users/Register';
import Navbar from './components/Navbar';
import ProtectedRoutes from './components/ProtectedRoutes';

function App() {
  return (
    <Router>
      <Navbar />
          <Routes>
                       <Route path='/user/login' element={<Login />} />
                       <Route path='/user/register' element={<Register />} />
                <Route  element={<ProtectedRoutes />} >
                        <Route path='/' element={<Home />} />
                        <Route path='/create' element={<Create />} />
                        <Route path='/update/:id' element={<Update />} />
                        <Route path='/view/:id' element={<View />} />
                        <Route path='*' element={<div><Link to='/' > Back to login</Link></div>} />
                </Route>
          </Routes>
    </Router>
  );
}

export default App;

import React, { useEffect } from 'react';
import './App.css';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserNavbar from './Components/UserNavbar';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Transactions from './Components/Transactions';
import Watchlist from './Components/Watchlist';
import Dashboard from './Components/Dashboard';
import Stocks from './Components/Stocks';
import Stock from './Components/Stock';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Portfolio from './Components/Portfolio';

function App(){
  const [user, setUser] = useState(false);
  useEffect(() => {
    let k = sessionStorage.getItem('user');
    if(k==='user') setUser(true);
    else setUser(false);
  },[]);
  return(
    <Router>
      {user && <UserNavbar />}
      {!user && <Navbar/>}
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/stocks" element={<Stocks />} />
        <Route path="/stock" element={<Stock />} />
        <Route path="/watchlist" element={<Watchlist />} />
        <Route path="/transactions" element={<Transactions />} />
      </Routes>
      <footer>
        <div>
          <h4>Contact Us</h4>
          <p>+910000000000</p>
          <p>Email: developer@gmail.com</p>
        </div>
        <p>All rights are reserved</p>
      </footer>
    </Router>
  )
}
export default App;
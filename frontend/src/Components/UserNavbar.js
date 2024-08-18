import React from 'react';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';

const UserNavbar = () => {
  const [state, setState] = useState(false);
  const width = {true:'200px',false:'40px'}
  const color = {true:"rgb(103,136,136)", false:"transparent"};
  const menu = {true:'opened',false:"closed"};
  const handleState = () => {
    setState(!state);
    let k = document.querySelector('button');
    k.style.width = width[!state];
    k.style.backgroundColor = color[!state];
    k.className = menu[!state];
  }
  const logout = () => {
    sessionStorage.setItem('user',"");
    window.location.href = './login';
  }
  return (
    <div id='main'>
        <div id='header'>
        <button id='menub' onClick={handleState}>
            <div id='menu'>
                <div id='div1'></div>
                <div id='div2'></div>
                <div id='div3'></div>
            </div>
         </button>
         <button id='logout' onClick={logout}>Logout</button>
        </div>
    <nav id='usernav'>
       {state && <div id='profile'>
            <div id = 'image'>
                <div id='head'></div>
                <div id = 'body'></div>
            </div>
            <div id="name">
                <b>Name</b><br/>
                <b>Total Profit/Loss</b>
            </div>
        </div>}

      {state&&<ul>
        <li><NavLink to="/dashboard"><div>Dashboard</div></NavLink></li>
        <li><NavLink to="/stocks"><div>Stocks</div></NavLink></li>
        <li><NavLink to="/portfolio"><div>Portfolio</div></NavLink></li>
        <li><NavLink to="/watchlist"><div>Watchlist</div></NavLink></li>
        <li><NavLink to="/transactions"><div>Transactions</div></NavLink></li>
      </ul>}
    </nav>
    </div>
  );
};

export default UserNavbar;

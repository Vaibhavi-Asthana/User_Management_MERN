// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Signup from './components/Signup';
import Login from './components/Login';
import Profile from './components/profile'; // Ensure this component exists and is imported correctly

const App = () => {
  return (
    <Router>
      <div className="container">
        <header className="header">
          <h1>User Management </h1>
        </header>
        <nav className="navbar">
          <ul>
            <li><a href="/signup">Signup</a></li>
            <li><a href="/login">Login</a></li>
            <li><a href="/profile">Profile</a></li>
          </ul>
        </nav>
        <Switch>
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/profile" component={Profile} />
          <Route exact path="/" component={Signup} />
        </Switch>
        <footer className="footer">
          <p>&copy; 2024 VApp. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
};

export default App;

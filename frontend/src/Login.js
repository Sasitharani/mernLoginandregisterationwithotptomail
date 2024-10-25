import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { login } from './loginSLice';

const Login = ({ setShowRegister }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (username === '123' && password === '123') {
      dispatch(login({ username, password }));
    } else {
      alert('Invalid credentials');
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded"
          />
          <button onClick={handleLogin} type="submit" className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600">
            Login
          </button>
        </form>
        <button
          onClick={() => setShowRegister(true)}
          className="w-full mt-4 text-blue-500 hover:underline"
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default Login;

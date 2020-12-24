import React, { createContext, useState } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = (props) => {
  const [authObj, setAuthObj] = useState({
    isAuthenticated: false,
    token: null,
    username: '',
  });

  const register = async (username, email, password) => {
    try {
      const res = await axios.post('/api/v1/auth/register', {
        username,
        email,
        password,
      });
      return res.data;
    } catch (err) {
      throw err;
    }
  };

  const login = async (email, password) => {
    try {
      const res = await axios.post('/api/v1/auth/login', {
        email,
        password,
      });
      return res.data;
    } catch (err) {
      throw err;
    }
  };

  return (
    <AuthContext.Provider value={[authObj, setAuthObj, register, login]}>
      {props.children}
    </AuthContext.Provider>
  );
};

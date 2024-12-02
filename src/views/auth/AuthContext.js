// AuthContext.js
import React, { createContext, useContext, useState } from 'react';

import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [authToken, setAuthToken] = useState(localStorage.getItem('userToken'));
  const [authUser, setAuthUser] = useState(localStorage.getItem('user'));

  const login = (token,formData) => {
    localStorage.setItem('userToken', token);
    localStorage.setItem('user', formData);
    setAuthToken(token);
    setAuthUser(formData);
  };

  const logout = () => {
    localStorage.removeItem('userToken');
    setAuthToken(null);
    setAuthUser(null);
    navigate('auth/loginformik')
  };
  
  return (
    <AuthContext.Provider value={{ authToken,authUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
};
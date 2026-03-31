import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const proroute = ({ children }) => {
  const { token } = useSelector((state) => state.auth);
  return token ? children : <Navigate to="/Login" />;
};

export default proroute;

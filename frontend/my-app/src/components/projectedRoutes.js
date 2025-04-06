import React from 'react';
import { Redirect } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const ProtectedRoute = ({ element }) => {
  const { isAuthenticated } = useAuth0();

  if (!isAuthenticated) {
    // If not authenticated, redirect to login page
    return <Redirect to="/login" />;
  }

  return element;
};

export default ProtectedRoute;

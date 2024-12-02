// PrivateRoute.js
// import React from 'react';
// import { Navigate, useLocation } from 'react-router-dom';
// import PropTypes from 'prop-types';
// import { useAuth } from './AuthContext';

// const PrivateRoute = ({ children }) => {
//   const { authToken } = useAuth();
//   const location = useLocation();

//   if (!authToken) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
//     return <Navigate to="/auth/loginformik" state={{ from: location }} replace />;
//   };

//   return children;
// };

// Add PropTypes validation
// PrivateRoute.propTypes = {
//   children: PropTypes.node.isRequired
// };

// export default PrivateRoute;

// PrivateRoute.js
import React, { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useAuth } from './AuthContext';

const PrivateRoute = ({ children }) => {
  const { authToken } = useAuth();
  const location = useLocation();
  const [status, setStatus] = useState('checking'); // 'checking', 'authorized', 'unauthorized'

  useEffect(() => {
    const validateToken = async () => {
      if (!authToken) {
        console.log('token is not present')
        setStatus('unauthorized');
        return;
      }

      try {
        const response = await fetch(`https://factory.teamasia.in/api/public/addresstypes?is_trashed=0`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${authToken}`
          }
        });

        if (response.ok) {
          console.log('token is present and authorized')
          setStatus('authorized');
        } else {
          // If the token is not valid or expired
          console.log('token is present and unauthorized')
          setStatus('unauthorized');
        }
      } catch (error) {
        console.error('Error while validating token:', error);
        setStatus('unauthorized');
      }
    };
    console.log('privateRoute...........')
    validateToken();
  }, []); // Effect runs when authToken changes

  if (status === 'checking') {
    // You can replace this with a spinner or a loader component
    return <div>Loading...</div>;
  } 
  if (status === 'unauthorized') {
    // Redirect to the login page if unauthorized
    return <Navigate to="/auth/loginformik" state={{ from: location }} replace />;
  } 
    // If authorized, render the children
    return children;
 
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired
};

export default PrivateRoute;

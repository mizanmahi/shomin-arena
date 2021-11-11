import React from 'react';
import { Redirect, Route } from 'react-router';
import { useAuth } from '../../hooks/useAuth';
import Spinner from '../Spinner/Spinner';

const ProtectedRoute = ({ children, ...rest }) => {
   const { user, userLoading } = useAuth();

   if(userLoading) return <Spinner />

   return (
      <Route
         {...rest}
         render={({ location }) =>
            user ? (
               children
            ) : (
               <Redirect
                  to={{ pathname: '/signin', state: { from: location } }}
               />
            )
         }
      ></Route>
   );
};

export default ProtectedRoute;

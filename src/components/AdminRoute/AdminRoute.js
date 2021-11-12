import React from 'react';
import { Redirect, Route } from 'react-router';
import { useAuth } from '../../hooks/useAuth';
import Spinner from '../Spinner/Spinner';

const AdminRoute = ({ children, ...rest }) => {
   const { user, admin, userLoading } = useAuth();

   if (userLoading) return <Spinner />;

   return (
      <Route
         {...rest}
         render={({ location }) =>
            user && admin ? (
               children
            ) : (
               <Redirect
                  to={{ pathname: '/', state: { from: location } }}
               />
            )
         }
      ></Route>
   );
};

export default AdminRoute;

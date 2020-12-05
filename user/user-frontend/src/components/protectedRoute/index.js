import React from 'react'
import { Redirect, Route } from 'react-router-dom';
import Auth from './authentication';

export default function ProtectedRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={routeProps =>
          {
            if(Auth.isAuthenticated())
            {
              return <Component {...routeProps}></Component>;
            }
            else
            {
              return <Redirect to= "/"></Redirect>
            }
          }
      }
    />
  );
}
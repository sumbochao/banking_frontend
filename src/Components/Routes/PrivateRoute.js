/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-props-no-spreading */
// follow https://medium.com/better-programming/building-basic-react-authentication-e20a574d5e71

import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from './Context';

export const PrivateRoute = ({ component: Component, render, ...rest }) => {
  const { authTokens } = useAuth();

  return (
    <Route
      {...rest}
      render={props => {
        return authTokens ? (
          render ? (
            render(props)
          ) : (
            <Component {...props} />
          )
        ) : (
          <Redirect to="/welcome" />
        );
      }}
    />
  );
};

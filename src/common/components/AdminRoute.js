import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PrivateRoute from './PrivateRoute';

const AdminRoute = ({ component: Component, ...rest }) => {
  const { isAdmin } = useSelector(state => state.auth);

  return (
    <PrivateRoute
      {...rest}
      render={props =>
        isAdmin ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/products' }} />
        )
      }
    />
  );
};

export default AdminRoute;
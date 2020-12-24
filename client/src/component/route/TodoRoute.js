import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../../context/auth/AuthProvider';

const TodoRoute = ({ component: Component, ...rest }) => {
  const [authObj, ,] = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={(props) =>
        authObj.isAuthenticated === true ? (
          <Component {...props} />
        ) : (
          <Redirect to='/' />
        )
      }
    />
  );
};

export default TodoRoute;

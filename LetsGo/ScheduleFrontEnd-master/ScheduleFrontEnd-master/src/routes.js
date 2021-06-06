import React, {useContext} from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

// Public routes
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

// Private routes
import Users from './pages/home/Schedule';


import { Context } from './Context/AuthContext';


function CustomRoutes({ isPrivate, ...rest}) {
  const {authenticated, loading} = useContext(Context);

  if (loading) {
    return <h1>Loading...</h1>
}

  if (isPrivate && !authenticated) {
    return <Redirect to="/auth" />;
  }

  return <Route {...rest} />
}

export default function Routes() {
  return (
    <Switch>
      <CustomRoutes exact path="/auth" component={Login} />
      <CustomRoutes exact path="/auth/register" component={Register} />
      <CustomRoutes isPrivate exact path="/" component={Users} />
    </Switch>
  );
}
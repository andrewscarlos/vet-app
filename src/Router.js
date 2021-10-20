import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux'
import CssBaseline from "@material-ui/core/CssBaseline";

import PrivateRoute from "./components/PrivateRoute"
import Menu from "./components/menu";

import SignIn from './pages/singin';
import Dashboard from './pages/dashboard';

import Atendimento from './pages/atendimento';
import Usuarios from './pages/usuarios'

import Pets from './pages/pets'

import { useStyles } from "./styles"

const Router = () => {
  const classes = useStyles();
  const isLogged = useSelector(({ user }) => user.userLog !== null)
  console.log("loged ", isLogged)

  return (
    <BrowserRouter>
      <div className={classes.root}>
        <CssBaseline />
        <Menu />


        <Switch>
          <Route
            path="/login"
            exact
            render={({ location }) => {
              if (!isLogged) {
                return SignIn
              }

              return (
                <Redirect
                  to={{
                    pathname: '/',
                    state: { from: location }
                  }}
                />
              )
            }}
          />

          <main className={classes.content}>
            <PrivateRoute path="/" exact component={Dashboard} />
            <PrivateRoute path="/atendimento" exact component={Atendimento} />
            <PrivateRoute path="/usuarios" exact component={Usuarios} />
            <PrivateRoute path="/pets" >
              <Pets />
            </PrivateRoute>
          </main>
        </Switch>
      </div>
    </BrowserRouter>
  )
};

export default Router;
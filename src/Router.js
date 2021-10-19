import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { useSelector } from 'react-redux'
import CssBaseline from "@material-ui/core/CssBaseline";

import PrivateRoute from "./components/PrivateRoute"
import Menu from "./components/menu";

import SignIn from './pages/singin';
import Dashboard from './pages/dashboard';

import Atendimento from './pages/atendimento';
import Usuarios from './pages/usuarios'
import Pets from './pages/pets';

import Alergias from './pages/atendimento/alergias';
import Dados from './pages/atendimento/dados';
import Medicamento from './pages/atendimento/medicamento';
import Prontuario from './pages/atendimento/prontuario';
import Tratamentos from './pages/atendimento/tratamentos';
import Vacinas from './pages/atendimento/vacinas';
import Vermifugo from './pages/atendimento/vermifugo';


import AddPets from './pages/pets/pets.adicionar'

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
        <main className={classes.content}>
          {/* 
          <Switch>
            <Route path="/" exact component={SignIn} />
            <PrivateRoute path="/dashboard" exact component={Dashboard} />

            <PrivateRoute path="/atendimento" exact component={Atendimento} />
            <PrivateRoute path="/usuarios" exact component={Usuarios} />

            <PrivateRoute path="/pets" exact component={Pets} />
            <PrivateRoute path="/pets/adicionar" exact component={AddPets} />

            <PrivateRoute path="/pets/alergias/:id" exact component={Alergias} />
            <PrivateRoute path="/pets/dados/:id" exact component={Dados} />
            <PrivateRoute path="/pets/medicamentos/:id" exact component={Medicamento} />
            <PrivateRoute path="/pets/prontuario/:id" exact component={Prontuario} />
            <PrivateRoute path="/pets/tratamentos/:id" exact component={Tratamentos} />
            <PrivateRoute path="/pets/vacinas/:id" exact component={Vacinas} />
            <PrivateRoute path="/pets/vermifugos/:id" exact component={Vermifugo} />

          </Switch>
        */}
        </main>
      </div>
    </BrowserRouter>
  )
};

export default Router;
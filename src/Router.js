import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import SignIn from './pages/singin';
import Dashboard from './pages/dashboard';

import Atendimento  from './pages/atendimento';
import Usuarios from './pages/usuarios'
import Pets from './pages/pets';

import AddPets from './pages/pets/pets.adicionar'
const Router = () => {
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={SignIn} /> 
                <Route path="/dashboard" exact component={Dashboard} /> 
                
                <Route path="/atendimento" exact component={Atendimento} /> 
                <Route path="/usuarios" exact component={Usuarios} /> 
                
                <Route path="/pets" exact component={Pets} /> 
                <Route path="/pets/adicionar" exact component={AddPets} /> 
            </Switch>
        </BrowserRouter>
    )
};

export default Router;
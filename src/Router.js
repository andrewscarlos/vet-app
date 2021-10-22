import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import SignIn from './pages/singin';
import Dashboard from './pages/dashboard';

import Atendimento  from './pages/atendimento';
import Usuarios from './pages/usuarios'
import Pets from './pages/pets';

import Alergias from './pages/atendimento/alergias';
import Dados from './pages/atendimento/dados';
import Medicamento from './pages/atendimento/medicamento';
import Prontuario from './pages/atendimento/prontuario';
import Tratamentos from './pages/atendimento/tratamentos';
import Vacinas from './pages/atendimento/vacinas';
import Vermifugo from './pages/atendimento/vermifugo';

import AdmRoute from './components/AdmRoute'

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

                <Route path="/pets/alergias/:id" exact component={Alergias} /> 
                <Route path="/pets/dados/:id" exact component={Dados} /> 
                <Route path="/pets/medicamentos/:id" exact component={Medicamento} /> 
                <Route path="/pets/prontuario/:id" exact component={Prontuario} /> 
                <Route path="/pets/tratamentos/:id" exact component={Tratamentos} /> 
                <Route path="/pets/vacinas/:id" exact component={Vacinas} /> 
                <Route path="/pets/vermifugos/:id" exact component={Vermifugo} /> 




            </Switch>
        </BrowserRouter>
    )
};

export default Router;
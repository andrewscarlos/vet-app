import { Switch, Route, useRouteMatch } from "react-router-dom"
import List from "./list"
import Owner from "./Owner"
import Pet from "./Pets"


import Alergias from './../atendimento/alergias';
import Dados from './../atendimento/dados';
import Medicamento from './../atendimento/medicamento';
import Prontuario from './../atendimento/prontuario';
import Tratamentos from './../atendimento/tratamentos';
import Vacinas from './../atendimento/vacinas';
import Vermifugo from './../atendimento/vermifugo';

const Pets = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={path}>
        <List />
      </Route>

      <Route path={`${path}/add`} exact>
        <Owner />
      </Route>

      <Route path={`${path}/pet`} exact>
        <Pet />
      </Route>

      <Route path="/pets/alergias/:id" exact >
        <Alergias />
      </Route>

      <Route path="/pets/dados/:id" exact >
        <Dados />
      </Route>

      <Route path="/pets/medicamentos/:id" exact >
        <Medicamento />
      </Route>

      <Route path="/pets/prontuario/:id" exact >
        <Prontuario />
      </Route>

      <Route path="/pets/tratamentos/:id" exact >
        <Tratamentos />
      </Route>

      <Route path="/pets/vacinas/:id" exact >
        <Vacinas />
      </Route>

      <Route path="/pets/vermifugos/:id" exact >
        <Vermifugo />
      </Route>
    </Switch>
  )
}

export default Pets
import Paper from "@material-ui/core/Paper"
import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"
import { useParams, Link, useLocation } from "react-router-dom"
import includes from 'lodash/includes'

import { useStyles } from "./../styles"

const AtendimentoHeader = () => {
  const { id } = useParams()
  const { pathname } = useLocation()

  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <Grid container spacing={3} className={classes.aaa}>
        <Link to={`/pets/prontuario/${id}`}>
          <Button variant={includes(pathname, "/pets/prontuario") ? "contained" : "outlined"}>
            Prontuario
          </Button>
        </Link>

        <Link to={`/pets/tratamentos/${id}`}>
          <Button variant={includes(pathname, "/pets/tratamentos") ? "contained" : "outlined"}>
            Tratamentos
          </Button>
        </Link>

        <Link to={`/pets/alergias/${id}`}>
          <Button variant={includes(pathname, "/pets/alergias") ? "contained" : "outlined"}>
            Alergias
          </Button>
        </Link>

        <Link to={`/pets/medicamentos/${id}`}>
          <Button variant={includes(pathname, "/pets/medicamentos") ? "contained" : "outlined"}>
            Medicamento
          </Button>
        </Link>

        <Link to={`/pets/vacinas/${id}`}>
          <Button variant={includes(pathname, "/pets/vacinas") ? "contained" : "outlined"}>
            Vacinas
          </Button>
        </Link>

        <Link to={`/pets/vermifugos/${id}`}>
          <Button variant={includes(pathname, "/pets/vermifugos") ? "contained" : "outlined"}>
            Vermifugo
          </Button>
        </Link>

        <Link to={`/pets/dados/${id}`}>
          <Button variant={includes(pathname, "/pets/dados") ? "contained" : "outlined"}>
            Dados
          </Button>
        </Link>
      </Grid>
    </Paper>
  )
}

export default AtendimentoHeader

import clsx from "clsx"
import Paper from "@material-ui/core/Paper"
import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"
import { useParams, Link } from "react-router-dom";

import { useStyles } from "./../styles"

const AtendimentoHeader = () => {
  const { id } = useParams();

  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <Paper className={fixedHeightPaper}>
      <Grid container spacing={3} className={classes.aaa}>
        <Link to={`/pets/prontuario/${id}`}>
          <Button variant="outlined" >
            Prontuario
          </Button>
        </Link>

        <Link to={`/pets/tratamentos/${id}`}>
          <Button variant="outlined" >
            Tratamentos
          </Button>
        </Link>

        <Link to={`/pets/alergias/${id}`}>
          <Button variant="contained" >
            Alergias
          </Button>
        </Link>

        <Link to={`/pets/medicamentos/${id}`}>
          <Button variant="outlined" >
            Medicamento
          </Button>
        </Link>

        <Link to={`/pets/vacinas/${id}`}>
          <Button variant="outlined" >
            Vacinas
          </Button>
        </Link>

        <Link to={`/pets/vermifugos/${id}`}>
          <Button variant="outlined" >
            Vermifugo
          </Button>
        </Link>

        <Link to={`/pets/dados/${id}`}>
          <Button variant="outlined" >
            Dados
          </Button>
        </Link>
      </Grid>
    </Paper>
  )
}

export default AtendimentoHeader

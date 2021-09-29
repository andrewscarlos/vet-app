import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Menu from "../../../components/menu";
import Button from "@material-ui/core/Button";
import { useHistory, useParams } from "react-router-dom";
import AdicionarTratamento from "./cadastrarTratamento";
import TableTratamento from "./TratamentoTable";
import NoteAdd from "@material-ui/icons/NoteAdd";
import EditTratamento from "./EdittTratamento";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 80,
  },
  aaa: {
    display: "flex",
    justifyContent: "space-between",
    padding: "18px",
  },
  table: {
    marginTop: "10px",
    padding: theme.spacing(2),
    minHeight: 100,
  },
  createTratamento: {
    marginTop: "40px",
  },
}));

const Prontuario = () => {
  const history = useHistory();
  const { id } = useParams();

  const onClick = (ev) => {
    const types = ev.target.innerText;
    switch (types) {
      case "PRONTUARIO": {
        return history.push(`/pets/prontuario/${id}`);
      }

      case "TRATAMENTOS": {
        return history.push(`/pets/tratamentos/${id}`);
      }

      case "ALERGIAS": {
        return history.push(`/pets/alergias/${id}`);
      }

      case "MEDICAMENTO": {
        return history.push(`/pets/medicamentos/${id}`);
      }

      case "VACINAS": {
        return history.push(`/pets/vacinas/${id}`);
      }

      case "VERMIFUGO": {
        return history.push(`/pets/vermifugos/${id}`);
      }

      case "DADOS": {
        return history.push(`/pets/dados/${id}`);
      }

      default:
        return history.push("/dashboard");
    }
  };
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const [createTratamentoButton, setCreateTratamento] = useState(false);
  const [viewTratamento, setviewTratamento] = useState(false);
  const createTratamento = () => {
    setCreateTratamento(false);
    setCreateTratamento(true);
  };
  return (
    <div className={classes.root}>
      <CssBaseline />
      <Menu msg="Atendimento" />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid item sm={12}>
            <Paper className={fixedHeightPaper}>
              <Grid container spacing={3} className={classes.aaa}>
                <Button variant="outlined" onClick={onClick}>
                  Prontuario
                </Button>
                <Button variant="contained" onClick={onClick}>
                  Tratamentos
                </Button>
                <Button variant="outlined" onClick={onClick}>
                  Alergias
                </Button>
                <Button variant="outlined" onClick={onClick}>
                  Medicamento
                </Button>
                <Button variant="outlined" onClick={onClick}>
                  Vacinas
                </Button>
                <Button variant="outlined" onClick={onClick}>
                  Vermifugo
                </Button>
                <Button variant="outlined" onClick={onClick}>
                  Dados
                </Button>
              </Grid>
            </Paper>
            <Button
              className={classes.createTratamento}
              variant="contained"
              onClick={createTratamento}
              type="submit"
              color="primary"
            >
              <NoteAdd />
            </Button>
            {viewTratamento && viewTratamento !== false ? (
              <Paper className={classes.table}>
                {<EditTratamento data={viewTratamento} />}
              </Paper>
            ) : (
              <Paper className={classes.table}>
                {createTratamentoButton && createTratamentoButton === true ? (
                  <AdicionarTratamento />
                ) : (
                  <TableTratamento
                  viewTratamento={setviewTratamento}
                    data={id}
                  />
                )}
              </Paper>
            )}
          </Grid>

          <Box pt={4}>{/* <Footer /> */}</Box>
        </Container>
      </main>
    </div>
  );
};

export default Prontuario;

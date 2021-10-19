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

import AdicionarVacinas from "./adicionarVacinas";
import TableVacinas from "./vacinasTable";
import NoteAdd from "@material-ui/icons/NoteAdd";
import EditVacinas from "./EditVacinas";

import AtendimentoHeader from "./../../../components/AtendimentosHeader"
import { useStyles } from "./../../../styles"

const Prontuario = () => {
  const history = useHistory();
  const { id } = useParams();

  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const [createTratamentoButton, setCreateTratamento] = useState(false);
  const [viewTratamento, setviewTratamento] = useState(false);
  const createTratamento = () => {
    setCreateTratamento(false);
    setCreateTratamento(true);
  };
  return (

    <Container maxWidth="lg" className={classes.container}>
      <Grid item sm={12}>
        <AtendimentoHeader />
        <Button
          className={classes.createTratamento}
          variant="contained"
          onClick={createTratamento}
          type="submit"
          color="primary"
        >
          <NoteAdd />
        </Button>
        {/* {viewTratamento && viewTratamento !== false ? (
          <Paper className={classes.table}>
            {<EditVacinas data={viewTratamento} />}
          </Paper>
        ) : (
          <Paper className={classes.table}>
            {createTratamentoButton && createTratamentoButton === true ? (
              <AdicionarVacinas />
            ) : (
              <TableVacinas
                viewTratamento={setviewTratamento}
                data={id}
              />
            )}
          </Paper>
        )} */}
      </Grid>

      <Box pt={4}>{/* <Footer /> */}</Box>
    </Container>
  );
};

export default Prontuario;

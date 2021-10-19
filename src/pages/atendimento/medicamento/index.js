import React, { useState } from "react"
import Box from "@material-ui/core/Box"
import Container from "@material-ui/core/Container"
import Grid from "@material-ui/core/Grid"
import Paper from "@material-ui/core/Paper"
import Button from "@material-ui/core/Button"
import { useParams } from "react-router-dom"

import AdicionarMedicamentos from "./adicionarMedicamento"
import TableMedicamento from "./tableMedicamento"
import NoteAdd from "@material-ui/icons/NoteAdd"
import EditMedicamento from "./EditMedimento"

import AtendimentoHeader from "./../../../components/AtendimentosHeader"
import { useStyles } from "./../../../styles"


const Prontuario = () => {
  const { id } = useParams();

  const classes = useStyles();
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
        {viewTratamento && viewTratamento !== false ? (
          <Paper className={classes.table}>
            {<EditMedicamento data={viewTratamento} />}
          </Paper>
        ) : (
          <Paper className={classes.table}>
            {createTratamentoButton && createTratamentoButton === true ? (
              <AdicionarMedicamentos />
            ) : (
              <TableMedicamento
                viewTratamento={setviewTratamento}
                data={id}
              />
            )}
          </Paper>
        )}
      </Grid>

      <Box pt={4}>{/* <Footer /> */}</Box>
    </Container>

  );
};

export default Prontuario;

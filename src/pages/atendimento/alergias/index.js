import React, { useState, useCallback } from "react"
import Box from "@material-ui/core/Box"
import Container from "@material-ui/core/Container"
import Grid from "@material-ui/core/Grid"
import Paper from "@material-ui/core/Paper"
import Button from "@material-ui/core/Button"
import { useParams } from "react-router-dom"
import NoteAdd from "@material-ui/icons/NoteAdd"
import Stack from '@mui/material/Stack'

import FormAlergias from "./FormAlergias"
import TableAlergia from "./TableAlergia"
import AtendimentoHeader from "./../../../components/AtendimentosHeader"
import { useStyles } from "./../../../styles"


const Prontuario = () => {
  const { id } = useParams();
  const classes = useStyles();

  const [viewTratamento, setviewTratamento] = useState(false)
  const [editData, setEditData] = useState(null);

  const createTratamento = useCallback(() => {
    setviewTratamento(true)
  }, [])

  return (
    <Container maxWidth="lg" className={classes.container}>
      <Grid item sm={12}>
        <AtendimentoHeader />

        <Stack
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
          spacing={2}
          style={{ marginTop: 10 }}
        >
          <Button
            className={classes.createTratamento}
            variant="contained"
            onClick={createTratamento}
            type="submit"
            color="primary"
          >
            <NoteAdd />
          </Button>
        </Stack>

        {viewTratamento
          ? (
            <Paper className={classes.table}>
              {<FormAlergias editData={editData} />}
            </Paper>)
          : (
            <Paper className={classes.table}>
              <TableAlergia viewTratamento={setviewTratamento} id={id} onEdit={setEditData} />
            </Paper>
          )}
      </Grid>

      <Box pt={4}>{/* <Footer /> */}</Box>
    </Container>
  );
};

export default Prontuario;

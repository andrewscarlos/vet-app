import React, { useState, useCallback } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from "redux"
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import Stack from '@mui/material/Stack'

import TableProtuario from './ProtuarioTable'
import NoteAdd from '@material-ui/icons/NoteAdd'
import { useParams } from 'react-router-dom'

import AdicionarProntuario from './AdicionarPronturio'
import { fetchAnimals } from '../../../redux/actions'
import EditProntuario from './EditProntuario'

import AtendimentoHeader from "./../../../components/AtendimentosHeader"
import { useStyles } from "./../../../styles"

const Prontuario = ({ animalReducer, fetchAnimals }) => {
  const { id } = useParams();
  const [createProntuarioButton, setCreateProntuario] = useState(false)
  const [viewProntuario, setViewProntuario] = useState(false)
  const classes = useStyles();

  const createProntuario = useCallback(() => {
    setViewProntuario(false)
    setCreateProntuario(true)
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
          style={{ marginTop: 20 }}
        >
          <Button className={classes.createProntuario} variant="contained" onClick={createProntuario} type="submit" color="primary">
            <NoteAdd />
          </Button>
        </Stack>

        {viewProntuario
          ? (<Paper className={classes.table} >
            {<EditProntuario data={viewProntuario} />}
          </Paper>)
          : (<Paper className={classes.table} >
            {createProntuarioButton ? <AdicionarProntuario viewProntuario={setViewProntuario} /> : <TableProtuario viewProntuario={setViewProntuario} id={id} />}
          </Paper>)
        }
      </Grid>
      <Box pt={4}>
        {/* <Footer /> */}
      </Box>
    </Container>

  );
};

const mapStateToProps = state => ({
  animalReducer: state.animals,
  userReducer: state.user,
  stateAll: state
});

const mapDispatch = dispatch => bindActionCreators({
  fetchAnimals
}, dispatch);


export default connect(mapStateToProps, mapDispatch)(Prontuario)
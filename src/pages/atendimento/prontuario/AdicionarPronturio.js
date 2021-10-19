import React, { useState, useCallback } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import { useParams } from 'react-router-dom'
import Divider from '@material-ui/core/Divider'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useDispatch, useSelector } from 'react-redux'

import { createProntuario } from '../../../redux/actions'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  table: {
    marginTop: '80px',
    padding: theme.spacing(2),
    minHeight: 100
  },
  divider: {
    border: 'solid 1px',
    marginTop: '10px'
  },
  salvar: {
    margin: '10px'
  },
  grids: {
    paddingTop: '10px'
  }
}));

const Prontuario = ({ viewProntuario }) => {
  const { id } = useParams();
  const dispatch = useDispatch()
  const veterinario = useSelector(state => state.user.userLog.name)


  // const veterinario = [] //userReducer.user.nome
  // const history = useHistory();

  const [values, setValues] = useState({
    idAnimal: id,
    veterinario,
    data: Date.now()
  })

  const onChange = useCallback((ev) => {
    const { name, value } = ev.target;
    setValues({ ...values, [name]: value });
  }, [values])

  const onSubmit = useCallback((ev) => {
    ev.preventDefault();

    dispatch(createProntuario(values))
    viewProntuario(false)
  }, [dispatch, values, viewProntuario])

  const classes = useStyles();
  return (
    <Paper className={classes.table} >
      <form onSubmit={onSubmit}>
        <h1>Análise Geral</h1>
        <Divider className={classes.divider} />
        <Grid item sm={12} className={classes.grids}>
          <Grid container spacing={6}>

            <Grid item xs={12} sm={6} >
              <TextField
                required
                id="peso"
                name="peso"
                label="Peso"
                type="number"
                variant="outlined"
                fullWidth
                onChange={onChange}
                autoComplete="shipping address-line1"
              />
            </Grid>

            <Grid item xs={12} sm={6} >
              <TextField
                required
                id="idade"
                name="idade"
                label="Idade"
                type="number"
                variant="outlined"
                fullWidth
                onChange={onChange}
                autoComplete="shipping address-line1"
              />
            </Grid>

            <Grid item xs={12} sm={6} >
              <TextField

                id="descricao"
                name="descricao"
                label="Descrição"
                type="textarea"
                multiline
                rows={3}
                variant="outlined"
                fullWidth
                onChange={onChange}
                autoComplete="shipping address-line1"
              />
            </Grid>

            <Grid item xs={12} sm={6} >
              <TextField

                id="pregresso"
                name="progresso"
                label="Pregresso"
                type="textarea"
                multiline
                rows={3}
                variant="outlined"
                fullWidth
                onChange={onChange}
                autoComplete="shipping address-line1"
              />
            </Grid>

            <Grid item xs={12} sm={6} >
              <TextField

                id="resultado"
                name="resultado"
                label="Resultado"
                type="textarea"
                multiline
                rows={3}
                variant="outlined"
                fullWidth
                onChange={onChange}
                autoComplete="shipping address-line1"
              />
            </Grid>
          </Grid>

          <h1>Exame Físico</h1>
          <Divider className={classes.divider} />
          <Grid container spacing={6} className={classes.grids}>

            <Grid item xs={12} sm={6} >
              <TextField

                id="temperatura"
                name="temperatura"
                label="Temperatura Cº"
                type="number"
                variant="outlined"
                fullWidth
                onChange={onChange}
                autoComplete="shipping address-line1"
              />
            </Grid>

            <Grid item xs={12} sm={6} >
              <TextField

                id="frequencia-respiratoria"
                name="frequenciaRespiratoria"
                label="Frequencia respiratoria (MPM)"
                type="number"
                variant="outlined"
                fullWidth
                onChange={onChange}
                autoComplete="shipping address-line1"
              />
            </Grid>

            <Grid item xs={12} sm={6} >
              <TextField

                id="frequencia-cardiaca"
                name="frequenciaCardiaca"
                label="Frequencia Cardiaca (BPM)"
                type="number"
                variant="outlined"
                fullWidth
                onChange={onChange}
                autoComplete="shipping address-line1"
              />
            </Grid>

            <Grid item xs={12} sm={6} >
              <TextField

                id="tempo-de-preenchimento-capilar"
                name="tempoPreenchimentoCapilar"
                label="Tempo de preenchimento capilar (S)"
                type="number"
                variant="outlined"
                fullWidth
                onChange={onChange}
                autoComplete="shipping address-line1"
              />
            </Grid>

            <Grid item xs={12} sm={6} >
              <TextField

                id="mucosas"
                name="mucosas"
                label="Mucosas"
                type="text"
                variant="outlined"
                fullWidth
                onChange={onChange}
                autoComplete="shipping address-line1"
              />
            </Grid>

            <Grid item xs={12} sm={6} >
              <TextField

                id="hidratacao"
                name="hidratacao"
                label="Hidratação"
                type="text"
                variant="outlined"
                fullWidth
                onChange={onChange}
                autoComplete="shipping address-line1"
              />
            </Grid>

            <Grid item xs={12} sm={6} >
              <TextField

                id="ectoparasitos"
                name="ectoparasitos"
                label="Ectoparasitos"
                type="text"
                variant="outlined"
                fullWidth
                onChange={onChange}
                autoComplete="shipping address-line1"
              />
            </Grid>
          </Grid>
          <h1>Exame Físico Específico</h1>
          <Divider className={classes.divider} />
          <Grid container spacing={6} className={classes.grids}>
            <Grid item xs={12} sm={6} >
              <TextField

                id="exame-ficico"
                name="exameFisico"
                label="Exame Fífico Específico"
                type="textarea"
                multiline
                rows={3}
                variant="outlined"
                fullWidth
                onChange={onChange}
                autoComplete="shipping address-line1"
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button variant="contained" type="submit" color="primary" className={classes.salvar}>
            Salvar
          </Button>
        </Grid>
      </form>
      <ToastContainer />
    </Paper>

  );
};

export default Prontuario
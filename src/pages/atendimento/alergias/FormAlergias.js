import React, { useState, useCallback, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { createAlergias, updatedAlergias } from '../../../redux/actions'

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

const AdicionarTratamento = ({ editData }) => {
  const { id } = useParams();
  const classes = useStyles();
  const veterinario = useSelector(state => state.user.userLog.user.nome)
  const dispatch = useDispatch()

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
    ev.preventDefault()
    if (editData) {
      dispatch(
        updatedAlergias({
          ...editData,
          idDaAlergia: editData._id,
        })
      )
    } else {
      dispatch(
        createAlergias(values)
      )
    }
  }, [dispatch, editData, values])

  useEffect(() => {
    setValues(editData)
  }, [editData])


  const { alergias, descricao } = values

  return (
    <Paper className={classes.table} >
      <form onSubmit={onSubmit}>
        <h1>Alergias</h1>
        <Divider className={classes.divider} />
        <Grid item sm={12} className={classes.grids}>
          <Grid container spacing={6}>
            <Grid item xs={12} sm={12} >
              <TextField
                required
                id="alergias"
                name="alergias"
                label="Alergias"
                type="text"
                variant="outlined"
                fullWidth
                autoComplete="shipping address-line1"
                value={alergias}
                onChange={onChange}
              />
            </Grid>

            <Grid item xs={12} sm={12} >
              <TextField
                required
                id="descricao"
                name="descricao"
                label="Descrição"
                type="text"
                multiline
                rows={5}
                variant="outlined"
                fullWidth
                autoComplete="shipping address-line1"
                value={descricao}
                onChange={onChange}
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


export default AdicionarTratamento
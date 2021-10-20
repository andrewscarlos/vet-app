import React, { useState, useCallback, useEffect } from "react"
import { makeStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import TextField from "@material-ui/core/TextField"
import Paper from "@material-ui/core/Paper"
import Button from "@material-ui/core/Button"
import Divider from "@material-ui/core/Divider"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'

import { updatedTratamento, createTratamento } from "../../../redux/actions"

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  table: {
    marginTop: "80px",
    padding: theme.spacing(2),
    minHeight: 100,
  },
  divider: {
    border: "solid 1px",
    marginTop: "10px",
  },
  salvar: {
    margin: "10px",
  },
  grids: {
    paddingTop: "10px",
  },
}));

const FormTratamento = ({ editData }) => {
  const { id } = useParams()
  const dispatch = useDispatch()

  const veterinario = useSelector(state => state.user.userLog.user.nome)
  const [descricao, setDescricao] = useState("")
  const [tratamento, setTratamento] = useState("")

  useEffect(() => {
    setDescricao(editData.descricao)
    setTratamento(editData.tratamento)
  }, [editData])


  const onSubmit = useCallback((ev) => {
    ev.preventDefault();
    if (editData) {
      dispatch(
        updatedTratamento({
          descricao,
          tratamento,
          idAnimal: id,
          veterinario,
          data: Date.now(),
          idDoTratamento: editData._id
        })
      )
    } else {
      dispatch(
        createTratamento({
          descricao,
          tratamento,
          idAnimal: id,
          veterinario,
          data: Date.now()
        })
      )
    }
  }, [descricao, dispatch, editData, id, tratamento, veterinario])

  const classes = useStyles();

  return (
    <Paper className={classes.table}>
      <form onSubmit={onSubmit}>
        <h1>Tratamentos</h1>
        <Divider className={classes.divider} />
        <Grid item sm={12} className={classes.grids}>
          <Grid container spacing={6}>
            <Grid item xs={12} sm={12}>
              <TextField
                required
                id="Tratramento"
                name="tratamento"
                label="Tratramento"
                type="text"
                variant="outlined"
                fullWidth
                value={tratamento}
                onChange={e => setTratamento(e.target.value)}
                autoComplete="shipping address-line1"
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <TextField
                required
                id="descricao"
                name="descricao"
                label="Descrição"
                type="text"
                value={descricao}
                multiline
                rows={5}
                variant="outlined"
                fullWidth
                onChange={e => setDescricao(e.target.value)}
                autoComplete="shipping address-line1"
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button
            variant="contained"
            type="submit"
            color="primary"
            className={classes.salvar}
          >
            Salvar
          </Button>
        </Grid>
      </form>
      <ToastContainer />
    </Paper>
  );
};

export default FormTratamento;

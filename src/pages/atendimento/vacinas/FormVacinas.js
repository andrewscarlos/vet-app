import React, { useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import TextField from "@material-ui/core/TextField"
import Paper from "@material-ui/core/Paper"
import Button from "@material-ui/core/Button"
import Divider from "@material-ui/core/Divider"
import "react-toastify/dist/ReactToastify.css"

import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'

import { updatedVacinas, createVacinas } from "../../../redux/actions"

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

const FormVacinas = ({ editData }) => {
  const classes = useStyles()
  const { id } = useParams()
  const dispatch = useDispatch()
  const veterinario = useSelector(state => state.user.userLog.user.nome)

  const [descricao, setDescricao] = useState("")
  const [vacina, setVacina] = useState("")

  const onSubmit = async (ev) => {
    ev.preventDefault();
    if (editData) {
      updatedVacinas({
        descricao,
        vacina,
        idAnimal: id,
        veterinario,
        data: Date.now(),
        idDaVacina: editData._id,
      });
    } else {
      dispatch(
        createVacinas({
          descricao,
          vacina,
          idAnimal: id,
          veterinario,
          data: Date.now(),
        })
      )
    }
  };

  return (
    <Paper className={classes.table}>
      <form onSubmit={onSubmit}>
        <h1>Vacinas</h1>
        <Divider className={classes.divider} />
        <Grid item sm={12} className={classes.grids}>
          <Grid container spacing={6}>
            <Grid item xs={12} sm={12}>
              <TextField
                required
                id="Tratramento"
                name="vacina"
                label="Vacinas"
                type="text"
                variant="outlined"
                fullWidth
                autoComplete="shipping address-line1"
                value={vacina}
                onChange={e => setVacina(e.target.value)}
              />
            </Grid>

            <Grid item xs={12} sm={12}>
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
                onChange={e => setDescricao(e.target.value)}
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
            Atualizar
          </Button>
        </Grid>
      </form>
    </Paper>
  );
};

export default FormVacinas

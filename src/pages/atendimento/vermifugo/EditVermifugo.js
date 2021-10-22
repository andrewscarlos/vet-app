import React, { useState } from "react";
import clsx from "clsx";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { useHistory, useParams } from "react-router-dom";
import Divider from "@material-ui/core/Divider";
import { updatedVermifugos } from "../../../redux/actions";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from 'react-redux';

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

const EditProntuario = ({ updatedVermifugos, userReducer, data }) => {

  const { id } = useParams();
  const veterinario = useSelector(state => state.user.userInfo.user.nome)
  const [descricao, setDescricao] = useState(data.descricao || "");
  const [vermifugo, setVermifugo] = useState(data.vermifugo || "");
  
  const history = useHistory();

  const onSubmit = async (ev) => {
    ev.preventDefault();
    updatedVermifugos({
      descricao,
      vermifugo,
      idAnimal: id,
      veterinario,
      data: Date.now(),
      idDovermifugo: data._id,
    });

    const timer = setTimeout(() => {
      history.push("/dashboard");
    }, 1000);
    return () => clearTimeout(timer);
  };

  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  return (
    <Paper className={classes.table}>
      <form onSubmit={onSubmit}>
        <h1>Vermifugos</h1>
        <Divider className={classes.divider} />
        <Grid item sm={12} className={classes.grids}>
          <Grid container spacing={6}>
            <Grid item xs={12} sm={12}>
              <TextField
                required
                id="Tratramento"
                name="vermifugo"
                label="Vermifugo"
                type="text"
                variant="outlined"
                fullWidth
                value={vermifugo}
                onChange={e => setVermifugo(e.target.value)}
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
            Atualizar
          </Button>
        </Grid>
      </form>
      <ToastContainer />
    </Paper>
  );
};

const mapStateToProps = (state) => ({
  animalReducer: state.animals,
  userReducer: state.user,
  stateAll: state,
});

const mapDispatch = (dispatch) =>
  bindActionCreators(
    {
      updatedVermifugos,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatch)(EditProntuario);

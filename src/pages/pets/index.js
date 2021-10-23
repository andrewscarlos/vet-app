import React, { useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import clsx from "clsx";
import { Link } from "react-router-dom"
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Menu from "../../components/menu";
import InputMask from "react-input-mask";
import Button from "@material-ui/core/Button";
import Pets from "@material-ui/icons/Pets";

import { toast ,ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchAnimals, creatPessoa } from "../../redux/actions";
import { fetchCep } from "./../../utils/cep"
import { ValidarCPF } from "./../../utils/cpf"

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
    padding: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 350,
  },
  Button: {
    marginBottom: "auto",
  },
  pets: {
    marginLeft: "10px",
  },
}));

const Animais = ({
  fetchAnimals,
  creatPessoa,
  stateReducer,
  stateReducerUser,
  stateAll,
}) => {

  const classes = useStyles()
  
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight)
  const [values, setValues] = useState({
    nome: "",
    cpf: "",
    email: "",
    telefone: "",
    sus: "",
    cep: "",
    endereco: "",
    bairro: "",
    numero: "",
    uf: "",
  });

  
  const { nome, cpf, email, telefone, sus, cep, endereco, bairro, numero, uf } = values
  let cpfConsumer = cpf ? cpf : null;
  useEffect(async () => {
    if(cpfConsumer !== null){
      cpfConsumer = cpfConsumer.replace(/[^\d]+/g,'');
      if (cpfConsumer.length == 11 ) {
        const cpfValidado = ValidarCPF(cpfConsumer)
        if(!cpfValidado){
          toast.error("CPF invalido !")
        }
      }
    }
  }, [cpfConsumer]);

  const onChange = useCallback((ev) => {
    const { name, value } = ev.target;
    setValues({ ...values, [name]: value });
  }, [values])

  const onSubmit = useCallback((env) => {
    env.preventDefault();
    creatPessoa(values);

  }, [creatPessoa, values])

  const findCep = useCallback(() => {
    if (cep.length && cep.length >= 8) {
      (async () => {
        const response = await fetchCep(cep.replace("-", ""))
        if (response) {
          setValues({
            ...values,
            uf: response.uf,
            bairro: response.bairro,
            endereco: response.logradouro,
          })
        }
      })()
    }
  }, [cep, values])

 

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Menu msg="Pets" />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
        <h1>Responsável</h1>
        <form onSubmit={onSubmit}>
          <Grid item sm={12}>
            <Paper className={fixedHeightPaper}>
              <Grid container spacing={4}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="nome"
                    name="nome"
                    label="Nome"
                    fullWidth
                    value={nome}
                    autoComplete="shipping address-line1"
                    onChange={onChange}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <InputMask
                    mask="999.999.999-99"
                    maskChar=" "
                    id="cpf"
                    name="cpf"
                    value={cpf}
                    onChange={onChange}
                  >
                    {() => (
                      <TextField
                        fullWidth
                        className={classes.inputText}
                        label="CPF"
                        required
                        name="cpf"
                      />
                    )}
                  </InputMask>
                </Grid>
              </Grid>

              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    type="email"
                    id="email"
                    name="email"
                    label="Email"
                    fullWidth
                    autoComplete="shipping address-line1"
                    value={email}
                    onChange={onChange}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <InputMask
                    mask="(99) - 9 9999-9999"
                    maskChar=" "
                    id="celular"
                    name="telefone"
                    value={telefone}
                    onChange={onChange}
                  >
                    {() => (
                      <TextField
                        fullWidth
                        className={classes.inputText}
                        label="Celular"
                        name="telefone"
                      />
                    )}
                  </InputMask>
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="sus"
                    name="sus"
                    label="Carteirinha do SUS"
                    fullWidth
                    value={sus}
                    onChange={onChange}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <InputMask
                    mask="99999-999"
                    maskChar=" "
                    id="cep"
                    name="cep"
                    value={cep}
                    onChange={onChange}
                    onBlur={findCep}
                  >
                    {() => (
                      <TextField
                        fullWidth
                        className={classes.inputText}
                        label="CEP"
                        required
                        name="cep"
                      />
                    )}
                  </InputMask>
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="endereco"
                    name="endereco"
                    label="Endereço"
                    fullWidth
                    value={endereco}
                    onChange={onChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="bairro"
                    name="bairro"
                    label="Bairro"
                    fullWidth
                    value={bairro}
                    onChange={onChange}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="numero"
                    name="numero"
                    label="numero"
                    value={numero}
                    fullWidth
                    onChange={onChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="uf"
                    name="uf"
                    label="UF"
                    value={uf}
                    fullWidth
                    autoComplete="shipping address-line1"
                    onChange={onChange}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Button variant="contained" type="submit" color="primary">
                    Salvar
                  </Button>

                  <Link to={`/pets/adicionar`}>
                    <Button className={classes.pets} variant="contained" color="primary" >
                      <Pets />
                    </Button>
                  </Link>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </form>
      </Container>
      </main>
      <ToastContainer />
    </div>
  );
};

const mapStateToProps = (state) => ({
  stateReducer: state.animals,
  stateReducerUser: state.user,
  stateAll: state,
});

const mapDispatch = (dispatch) =>
  bindActionCreators(
    {
      creatPessoa,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatch)(Animais);

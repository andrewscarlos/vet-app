import React, { useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Menu from "../../components/menu";
import InputMask from "react-input-mask";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { createUser, stateReducer, stateAll } from "../../redux/actions";
import Permissao from './Permissao'
import { useSelector } from 'react-redux'
import { ValidarCPF } from "./../../utils/cpf"
import Settings from "@material-ui/icons/Settings";

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
    paddingTop: theme.spacing(4),
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
}));

const CreatedUser = ({ createUser, stateReducer, stateAll }) => {

  const permissao = useSelector(state => state.user.userInfo.user)
  const { funcao:funcPermissao } = permissao
  
  const history = useHistory();
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const { success, loading } = stateReducer;
  const [values, setValues] = useState({
    nome: '',
    cpf: '',
    telefone: '',
    crmv: '',
    funcao:'',
    email: '',
    senha: ''
  });

  const { nome, cpf, email, telefone, crmv, funcao, senha } = values
  const onChange = useCallback((ev) => {
    const { name, value } = ev.target;
    setValues({ ...values, [name]: value });
  }, [values])

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

  const onSubmit = async (ev) => {
    ev.preventDefault();
    createUser(values);
    
    if (success) {
      const timer = setTimeout(() => {
        history.push("/dashboard");
      }, 1000);
      return () => clearTimeout(timer);
    }
  };

const goGerencimento = ()=>{
  history.push("/usuarios/gerenciamento");
}

  return (
    funcPermissao === 'Administrativo' ?
  <form onSubmit={onSubmit}>
    <div className={classes.root}>
      <CssBaseline />
      <Menu msg="Usuarios" />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid item sm={10}>
            <Paper className={fixedHeightPaper}>
              <Grid container spacing={4}>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="nome"
                    name="nome"
                    label="Nome"
                    fullWidth
                    autoComplete="shipping address-line1"
                    onChange={onChange}
                  />
                </Grid>
              </Grid>

              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <InputMask
                    mask="999.999.999-99"
                    maskChar=" "
                    onChange={onChange}
                    id="cpf"
                    name="cpf"
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

                <Grid item xs={12} sm={6}>
                  <InputMask
                    mask="(99) - 9 9999-9999"
                    maskChar=" "
                    onChange={onChange}
                    id="celular"
                    name="telefone"
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
                    required
                    id="crmv"
                    name="crmv"
                    label="Crmv"
                    fullWidth
                    onChange={onChange}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth className={classes.formControl}>
                    <InputLabel item>Função</InputLabel>
                    <Select name="funcao" onChange={onChange} native>
                      <option aria-label="None" value="" />
                      <option value={"Administrativo"}>Administrativo</option>
                      <option value={"Médico"}>Médico</option>
                      <option value={"Recepcionista"}>Recepcionista</option>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>

              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    type="email"
                    id="email"
                    name="email"
                    label="Email"
                    fullWidth
                    autoComplete="shipping address-line1"
                    onChange={onChange}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    type="password"
                    required
                    id="senha"
                    name="senha"
                    label="Senha"
                    fullWidth
                    autoComplete="shipping address-line1"
                    onChange={onChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button type="submit" variant="contained" color="primary">
                    {loading ? "loading" : "Salvar"}
                  </Button>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <Button onClick={goGerencimento} variant="contained" color="primary">
                    <Settings/>
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Container>
      </main>
    </div>
    <ToastContainer />
  </form> : <Permissao/>
   
   );
};

const mapStateToProps = (state) => ({
  stateReducer: state.user,
  stateAll: state,
});

const mapDispatch = (dispatch) =>
  bindActionCreators(
    {
      createUser,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatch)(CreatedUser);

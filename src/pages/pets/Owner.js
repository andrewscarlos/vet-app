import React, { useState, useCallback } from "react"
import { Link, useRouteMatch } from "react-router-dom"
import Container from "@material-ui/core/Container"
import Grid from "@material-ui/core/Grid"
import TextField from "@material-ui/core/TextField"
import Paper from "@material-ui/core/Paper"
import InputMask from "react-input-mask"
import Button from "@material-ui/core/Button"
import Pets from "@material-ui/icons/Pets"
import clsx from "clsx"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { creatPessoa } from "../../redux/actions";
import { useStyles } from "./../../styles"
import { fetchCep } from "./../../utils/cep"


const Animais = ({ creatPessoa }) => {
  const classes = useStyles()
  const { path } = useRouteMatch()

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
    <>
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

                  <Link to={`/pets/pet`}>
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
      <ToastContainer />
    </>
  );
};

const mapStateToProps = (state) => ({
  stateReducer: state.animals,
  stateReducerUser: state.user,
  stateAll: state,
});

const mapDispatch = (dispatch) => bindActionCreators({ creatPessoa }, dispatch);

export default connect(mapStateToProps, mapDispatch)(Animais);

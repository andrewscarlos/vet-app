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
import { updatedUsuario } from "../../redux/actions";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import InputMask from "react-input-mask";
import { CropFreeOutlined } from "@material-ui/icons";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

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

const EditProntuario = ({ updatedUsuario, userReducer, data }) => {
  const { id } = useParams();
  const veterinario = useSelector((state) => state.user.userInfo.user.nome);

  const [nome, setNome] = useState(data.nome || "");
  const [cpf, setCpf] = useState(data.cpf || "");
  const [email, setEmail] = useState(data.email || "");
  const [telefone, setTelefone] = useState(data.telefone || "");
  const [crmv, setCrmv] = useState(data.crmv || "");
  const [senha, setSenha] = useState('');
  const [funcao, setFuncao] = useState(data.funcao || "");

  const history = useHistory();

  console.log("data", data);
  const onSubmit = async (ev) => {
    ev.preventDefault();
    updatedUsuario({
      nome,
      cpf,
      email,
      crmv,
      telefone,
      senha,
      funcao,
      data: Date.now(),
      idDoProntuario: data._id,
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
        <h1>{data.nome}</h1>
        <Divider className={classes.divider} />
        <Grid item sm={12} className={classes.grids}>
          <Grid container spacing={6}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="nome"
                name="nome"
                label="Nome"
                type="text"
                value={nome}
                variant="outlined"
                fullWidth
                onChange={(e) => setNome(e.target.value)}
                autoComplete="shipping address-line1"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="email"
                name="email"
                label="Email"
                type="text"
                value={email}
                variant="outlined"
                fullWidth
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="shipping address-line1"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <InputMask
                mask="999.999.999-99"
                maskChar=" "
                onChange={(e) => setCpf(e.target.value)}
                id="cpf"
                name="cpf"
                value={cpf}
                variant="outlined"
                autoComplete="shipping address-line1"
              >
                {() => (
                  <TextField
                    fullWidth
                    className={classes.inputText}
                    label="CPF"
                    required
                    variant="outlined"
                    autoComplete="shipping address-line1"
                    name="cpf"
                  />
                )}
              </InputMask>
            </Grid>

            <Grid item xs={12} sm={6}>
              <InputMask
                mask="(99) - 9 9999-9999"
                maskChar=" "
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
                id="celular"
                name="telefone"
              >
                {() => (
                  <TextField
                    fullWidth
                    className={classes.inputText}
                    label="Celular"
                    name="telefone"
                    variant="outlined"
                    autoComplete="shipping address-line1"
                  />
                )}
              </InputMask>
            </Grid>


            <Grid item xs={12} sm={6}>
              <TextField
             
                id="crmv"
                name="crmv"
                label="Crmv"
                type="text"
                value={crmv}
                variant="outlined"
                fullWidth
                onChange={(e) => setCrmv(e.target.value)}
                autoComplete="shipping address-line1"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
               
                id="senha"
                name="senha"
                label="Atulizar Senha"
                type="password"
                variant="outlined"
                fullWidth
                onChange={(e) => setSenha(e.target.value)}
                autoComplete="shipping address-line1"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
                  <FormControl fullWidth className={classes.formControl} >
                      
                    <InputLabel item >Função</InputLabel >
                    <Select variant="outlined" name="funcao" onChange={(e) => setFuncao(e.target.value)} native>
                    <option >{funcao}</option>
                      <option value={"Administrativo"}>Administrativo</option>
                      <option value={"Médico"}>Médico</option>
                      <option value={"Recepcionista"}>Recepcionista</option>
                    </Select>
                  </FormControl>
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
      updatedUsuario,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatch)(EditProntuario);

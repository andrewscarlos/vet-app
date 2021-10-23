import React, { useState, useEffect } from "react";
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
import { updatedVermifugos, fetchAnimals } from "../../../redux/actions";
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

const EditProntuario = ({
  updatedVermifugos,
  userReducer,
  fetchAnimals,
  animalReducer,
}) => {
  const { id } = useParams();
  useEffect(async () => {
    await fetchAnimals();
  }, []);

  const animal = animalReducer.animals;

  const redenrTable = animal.filter((el) => el._id === id);
  const veterinario = useSelector(state => state.user.userInfo.user.nome)

  const [nome, setNome] = useState(redenrTable[0].nome || "");
  const [especie, setEspecie] = useState(redenrTable[0].especie || "");
  const [raca, setRaca] = useState(redenrTable[0].raca || "");
  const [cpf, setCpf] = useState(redenrTable[0].cpf || "");
  const [idade, setIdade] = useState(redenrTable[0].idade || "");
  const [sexo, setSexo] = useState(redenrTable[0].sexo || "");
  const [pelagem, setPelagem] = useState(redenrTable[0].pelagem || "");
  const [temperamento, setTemperamento] = useState(
    redenrTable[0].temperamento || ""
  );
  const [peso, setPeso] = useState(redenrTable[0].peso || "");
    
 
  const history = useHistory();

  const onSubmit = async (ev) => {
    ev.preventDefault();
    updatedVermifugos({
      
      idAnimal: id,
      veterinario,
      data: Date.now(),
      idDovermifugo: id._id,
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
        <h1>Dados</h1>
        <Divider className={classes.divider} />
        <Grid item sm={12} className={classes.grids}>
          <Grid container spacing={6}>
            <Grid item xs={12} sm={12}>
              <TextField
                required
                id="Tratramento"
                name="nome"
                label="Nome"
                type="text"
                variant="outlined"
                fullWidth
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                autoComplete="shipping address-line1"
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <TextField
                required
                id="descricao"
                name="especie"
                label="Especie"
                type="text"
                value={especie}        
                variant="outlined"
                fullWidth
                onChange={(e) => setEspecie(e.target.value)}
                autoComplete="shipping address-line1"
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <TextField
                required
                id="descricao"
                name="especie"
                label="Raça"
                type="text"
                value={raca}        
                variant="outlined"
                fullWidth
                onChange={(e) => setRaca(e.target.value)}
                autoComplete="shipping address-line1"
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <TextField
                required
                id="descricao"
                name="especie"
                label="CPF do Dono"
                type="text"
                value={cpf}        
                variant="outlined"
                fullWidth
                autoComplete="shipping address-line1"
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <TextField
                required
                id="descricao"
                name="especie"
                label="Idade"
                type="text"
                value={idade}        
                variant="outlined"
                fullWidth
                onChange={(e) => setIdade(e.target.value)}
                autoComplete="shipping address-line1"
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <TextField
                required
                id="descricao"
                name="especie"
                label="Sexo"
                type="text"
                value={sexo}        
                variant="outlined"
                fullWidth
                autoComplete="shipping address-line1"
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                required
                id="descricao"
                name="especie"
                label="Pelagem"
                type="text"
                value={pelagem}        
                variant="outlined"
                fullWidth
                onChange={(e) => setPelagem(e.target.value)}
                autoComplete="shipping address-line1"
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                required
                id="descricao"
                name="especie"
                label="Temperamento"
                type="text"
                value={temperamento}        
                variant="outlined"
                fullWidth
                onChange={(e) => setTemperamento(e.target.value)}
                autoComplete="shipping address-line1"
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                required
                id="descricao"
                name="especie"
                label="Peso"
                type="text"
                value={peso}        
                variant="outlined"
                fullWidth
                onChange={(e) => setPeso(e.target.value)}
                autoComplete="shipping address-line1"
              />
            </Grid>

          </Grid>
        </Grid>
        <Grid item xs={12} sm={6}>
          
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
      fetchAnimals,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatch)(EditProntuario);

import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Menu from "../../components/menu";
import Button from "@material-ui/core/Button";
import { Divider } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import CardAnimal from "./cardAnimal";
import { fetchAnimals } from "../../redux/actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Search from "@material-ui/icons/Search";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import InputMask from "react-input-mask";
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5001",
});

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
    flexDirection: "row",
    flexWrap: "nowrap",
  },
  fixedHeight: {
    height: 300,
  },
  hr: {
    marginTop: "60px",
    border: "1px solid ",
  },
  title: {
    fontSize: "30px",
    fontFamily: "Patua One",
    position: "absolute",
    marginTop: "10px",
  },
  divCard: {
    display: "flex",
    overflowX: "scroll",
    flexDirection: "row",
    flexWrap: "nowrap",
    padding: theme.spacing(2),
  },
  findCpf: {
    width: "20px",
    height: "40px",
    marginTop: "30px",
  },
  wrapper: {
    display: "flex",
    border: "solid 1px black",
    alignItems: "center",
  },
}));

const Atendimento = ({ fetchAnimals, stateReducer }) => {
  useEffect(async () => {
    await fetchAnimals();
  }, []);

  const host = "http://localhost:5001/";

  let dados = "";
  const [fetchAnimaisPessoas, setFetchAnimais] = useState();
  const [modal, showModal] = useState(false);

  const fetchAnimalsByPessoa = async (data) => {
    const cpf = data;

    const animais = API.post(`${host}pessoas/fetch`, { cpf }).then((r) => r);
    return animais;
  };

  const onSubmit = async (ev) => {
    ev.preventDefault();
    dados = await fetchAnimalsByPessoa(fetchAnimaisPessoas);
  
    dados = dados.data.animais
    showModal(true)
  };

  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  return (
    <form onSubmit={onSubmit}>
      <div className={classes.root}>
        <CssBaseline />
        <Menu msg="Atendimento" />
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="lg" className={classes.container}>
            <Typography className={classes.title}>Buscar Animais</Typography>
            <Divider className={classes.hr} light="true" />
            <Grid item sm={12} className={classes.grids}>
              <Grid container spacing={6}>
                <Grid item xs={6} sm={6}>
                  <InputMask
                    mask="999.999.999-99"
                    maskChar=" "
                    value={fetchAnimaisPessoas}
                    onChange={(e) => setFetchAnimais(e.target.value)}
                    id="cpf"
                    name="cpf"
                  >
                    {() => (
                      <TextField
                        fullWidth
                        className={classes.inputText}
                        label="Buscar por CPF"
                        required
                        name="cpf"
                      />
                    )}
                  </InputMask>
                </Grid>

                <Button
                  variant="contained"
                  type="submit"
                  color="primary"
                  className={classes.findCpf}
                >
                  <Search />
                </Button>
              </Grid>
            </Grid>
            {modal ? (
              <Paper className={classes.divCard}>
                  {dados.map((el) => <CardAnimal data={el}></CardAnimal>)}
              </Paper>
            ) : null}

            <Box pt={4}>{/* <Footer /> */}</Box>
          </Container>
        </main>
      </div>
    </form>
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
      fetchAnimals,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatch)(Atendimento);

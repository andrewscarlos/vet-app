import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Menu from "../../components/menu";
import Button from "@material-ui/core/Button";
import { useHistory, useParams } from "react-router-dom";
import { fetchAnimals } from "../../redux/actions";
import { useSelector } from "react-redux";
import Permissao from "./Permissao";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Search from "@material-ui/icons/Search";

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
    height: 80,
  },
  gridContainer: {
    display: "flex",
    justifyContent: "space-between",
    padding: "18px",
  },
  table: {
    marginTop: "10px",
    padding: theme.spacing(2),
    minHeight: 100,
  },
  createProntuario: {
    marginTop: "40px",
  },
  botaofind: {
    marginTop: "40px",
  },
}));

const Relatorios = ({ animalReducer, fetchAnimals }) => {
  const API = axios.create({
    baseURL: "http://localhost:5001",
  });
  const host = "http://localhost:5001/";

  useEffect(async () => {
    await fetchAnimals();
  }, []);
  const permissao = useSelector((state) => state.user.userInfo.user);

  const { funcao } = permissao;
  const [dataInicial, setDataInicial] = useState();
  const [dataFinal, setDataFinal] = useState();

  const getByday = async (dataInicial, dataFinal) => {
    const { data } = await API.post(`${host}animaisdays`, {
      dataInicial,
      dataFinal,
    })
      .then((r) => r)
      .catch((e) => e);
    return data;
  };

  const findAnimais = async () => {
    const response = await getByday(dataInicial, dataFinal);

    if (response) {
      setAnimais(response);
      setShowModal(true);
    }
  };

  const [animais, setAnimais] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const ShowTable = () => {
    return (
      <>
        <Paper className={classes.table}>
          <Grid item sm={12}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nome</TableCell>
                  <TableCell>Especie</TableCell>
                  <TableCell>Raça</TableCell>
                  <TableCell>Sexo</TableCell>
                  <TableCell>Pelagem</TableCell>
                  <TableCell>Peso</TableCell>
                  <TableCell>Temperamento</TableCell>
                  <TableCell>CPF do Dono</TableCell>
                  <TableCell align="right">Idade</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {animais.map((row) => (
                  <TableRow>
                    <TableCell>{row.nome}</TableCell>
                    <TableCell>{row.especie}</TableCell>
                    <TableCell>{row.raca}</TableCell>
                    <TableCell>{row.sexo}</TableCell>
                    <TableCell>{row.pelagem}</TableCell>
                    <TableCell>{row.peso}</TableCell>
                    <TableCell>{row.temperamento}</TableCell>
                    <TableCell>{row.cpf}</TableCell>
                    <TableCell align="right">{row.idade}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Grid>
        </Paper>
      </>
    );
  };

  return funcao === "Administrativo" ? (
    <div className={classes.root}>
      <CssBaseline />
      <Menu msg="Relatorios" />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid item sm={10}>
            <Grid container sm={6} spacing={4}>
              <Grid item xs={12} sm={6}>
                <label>
                  Data Inicial
                  <TextField
                    required
                    id="dataInicial"
                    name="dataInicial"
                    fullWidth
                    type="date"
                    variant="outlined"
                    onChange={(e) => setDataInicial(e.target.value)}
                  />
                </label>
              </Grid>
              <Grid item xs={12} sm={6}>
                <label>
                  Data Final
                  <TextField
                    required
                    id="dataFinal"
                    name="dataFinal"
                    fullWidth
                    type="date"
                    variant="outlined"
                    onChange={(e) => setDataFinal(e.target.value)}
                  />
                </label>
              </Grid>
              {showModal ? <ShowTable /> : null}
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                className={classes.botaofind}
                variant="contained"
                color="primary"
                onClick={findAnimais}
              >
                <Search />
              </Button>
            </Grid>
          </Grid>

          <Box pt={4}>{/* <Footer /> */}</Box>
        </Container>
      </main>
    </div>
  ) : (
    <Permissao />
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
      fetchAnimals,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatch)(Relatorios);

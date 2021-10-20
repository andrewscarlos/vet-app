import React, { useEffect } from "react"
import Box from "@material-ui/core/Box"
import Paper from "@material-ui/core/Paper"
import Container from "@material-ui/core/Container"
import { Divider } from "@material-ui/core"
import { Typography } from "@material-ui/core"

import { connect } from "react-redux"
import { bindActionCreators } from "redux"

import CardAnimal from "./cardAnimal"
import { useStyles } from "./../../styles"

import { fetchAnimals } from "../../redux/actions"

const Atendimento = ({ fetchAnimals, stateReducer }) => {
  useEffect(() => {
    (async () => {
      await fetchAnimals();
    })()
  }, [fetchAnimals]);

  let dados = stateReducer.animals;

  const classes = useStyles();

  return (
    <Container maxWidth="lg" className={classes.container}>
      <Typography className={classes.title}>Animais</Typography>
      <Divider className={classes.hr} light="true" />

      <Paper className={classes.divCard}>
        {dados.length > 0 &&
          dados.map((el) => <CardAnimal data={el}></CardAnimal>)}
      </Paper>
      <Box pt={4}>{/* <Footer /> */}</Box>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  stateReducer: state.animals,
  stateReducerUser: state.user,
  stateAll: state,
});

const mapDispatch = (dispatch) => bindActionCreators({ fetchAnimals }, dispatch);

export default connect(mapStateToProps, mapDispatch)(Atendimento);
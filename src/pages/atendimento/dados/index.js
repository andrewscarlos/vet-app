import React from 'react'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'

import AtendimentoHeader from "./../../../components/AtendimentosHeader"

import { useStyles } from '../../../styles'

const Prontuario = () => {
  const classes = useStyles();
  return (

    <Container maxWidth="lg" className={classes.container}>
      <AtendimentoHeader />

      <Box pt={4}>
        {/* <Footer /> */}
      </Box>
    </Container>

  );
};

export default Prontuario
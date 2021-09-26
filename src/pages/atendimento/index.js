import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Menu from '../../components/menu';
import Button from '@material-ui/core/Button';
import { Divider } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import CardAnimal from './cardAnimal'
import { fetchAnimals } from '../../redux/actions';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
        
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'row',
        flexWrap:"nowrap"
    },
    fixedHeight: {
        height: 300,
    },
    hr: {
        marginTop: '60px',
        border: '1px solid '
    },
    title: {
        fontSize: '30px',
        fontFamily: 'Patua One',
        position: 'absolute',
        marginTop: '10px'
    }
}));



const Atendimento = ({ fetchAnimals, stateReducer }) => {

    useEffect(async () => {
        await fetchAnimals()
    }, [])

    let dados = stateReducer.animals;

    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    return (
        <div className={classes.root}>
            <CssBaseline />
            <Menu msg="Atendimento" />
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>

                    <Typography className={classes.title}>Animais</Typography>
                    <Divider className={classes.hr} light="true" />

                    <Paper className={fixedHeightPaper}>
                        {
                            dados.length > 0 && dados.map(el => <CardAnimal data={el}></CardAnimal>)
                        }
                    </Paper>
                    <Box pt={4}>
                        {/* <Footer /> */}
                    </Box>
                </Container>
            </main>
        </div>
    );
}

const mapStateToProps = state => ({
    stateReducer: state.animals,
    stateReducerUser: state.user,
    stateAll: state
});

const mapDispatch = dispatch => bindActionCreators({
    fetchAnimals
}, dispatch);


export default connect(mapStateToProps, mapDispatch)(Atendimento);
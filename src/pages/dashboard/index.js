import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Menu from '../../components/menu';
import Chart from './chart';
import Orders from './orders';
import Deposits from './deposits';
import axios from "axios";
import { useSelector } from 'react-redux'
import { exitPessoa } from '../../redux/actions';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

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
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
}));

const API = axios.create({
    baseURL: "http://localhost:5001",
  });
const host = "http://localhost:5001/";

const getToday = async ()=>{
    const { data } =  await API.get(`${host}animaistoday`).then((r) => r).catch(e => e);
    return data
};
const Dashboard = ({exitPessoa})=> {
    
    const permissao = useSelector(state => state.user)
    
    useEffect(()=>{
        exitPessoa()
    },[])
    
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    return (
        <div className={classes.root}>
            <CssBaseline />
            <Menu msg="Dashboard" />
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>

                    <Grid container spacing={3}>
                        {/* Chart */}
                        <Grid item xs={12} md={8} lg={9}>
                            <Paper className={fixedHeightPaper}>
                                <Chart />
                            </Paper>
                        </Grid>
                        {/* Recent Deposits */}
                        <Grid item xs={12} md={4} lg={3}>
                            <Paper className={fixedHeightPaper}>
                                <Deposits />
                            </Paper>
                        </Grid>
                        {/* Recent Orders */}
                        <Grid item xs={12}>
                            <Paper className={classes.paper}>
                                <Orders />
                            </Paper>
                        </Grid>
                    </Grid>

                </Container>
            </main>
        </div >
    );
}

const mapStateToProps = (state) => ({
    stateReducer: state.animals,
    stateReducerUser: state.user,
    stateAll: state,
  });

const mapDispatch = (dispatch) =>
  bindActionCreators(
    {
        exitPessoa,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatch)(Dashboard);
import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Menu from '../../components/menu';
import Button from '@material-ui/core/Button';

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
        height: 80,

    },
    aaa: {  
        display:"flex",
        justifyContent:"space-between",
        padding: "18px"
    }
}));

export default function Dashboard() {
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    return (
        <div className={classes.root}>
            <CssBaseline />
            <Menu msg="Atendimento" />
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    <Grid item sm={12}>
                        <Paper className={fixedHeightPaper}>
                            <Grid container spacing={3} className={classes.aaa}>
                                <Button variant="contained">Prontuario</Button>
                                <Button variant="outlined">Tratamentos</Button>
                                <Button variant="outlined">Alergias</Button>
                                <Button variant="outlined">Medicamento</Button>
                                <Button variant="outlined">Vacinas</Button>
                                <Button variant="outlined">Vermifugo</Button>
                                <Button variant="outlined">Dados</Button>
                            </Grid>
                        </Paper>
                    </Grid>

                    <Box pt={4}>
                        {/* <Footer /> */}
                    </Box>
                </Container>
            </main>
        </div>
    );
}
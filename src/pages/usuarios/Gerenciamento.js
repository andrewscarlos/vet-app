import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from "redux"
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Menu from '../../components/menu';
import Button from '@material-ui/core/Button';
import { useHistory, useParams } from 'react-router-dom';
import TableProtuario from './TableUsuarios'
import NoteAdd from '@material-ui/icons/NoteAdd';
import { fetchUsuarios } from '../../redux/actions'
import EditProntuario from './EditUsuario'
import { useSelector } from 'react-redux';
import Permissao from './Permissao';

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
    gridContainer: {
        display: "flex",
        justifyContent: "space-between",
        padding: "18px"
    },
    table: {
        marginTop: '10px',
        padding: theme.spacing(2),
        minHeight: 100
    },
    createProntuario: {
        marginTop: '40px'
    }
}));

const Prontuario = ({ animalReducer, fetchUsuarios }) => {

    useEffect(async () => {
        await fetchUsuarios();
      }, []);
      const permissao = useSelector(state => state.user.userInfo.user)

      const { funcao } = permissao

    const history = useHistory();

    const { id } = useParams();
    const [createProntuarioButton, setCreateProntuario] = useState(false)

    const [viewProntuario, setViewProntuario] = useState(false)
    
    const createProntuario = () => {
        setViewProntuario(false)
        setCreateProntuario(true)
    }

    

    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    return (
        funcao === 'Administrativo' ?
        <div className={classes.root}>
            <CssBaseline />
            <Menu msg="Gerenciamento de Usuarios" />
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    <Grid item sm={12}>
                      

                        {
                            viewProntuario && viewProntuario !== false ?

                                <Paper className={classes.table} >
                                    {
                                        <EditProntuario data={viewProntuario}/>
                                    }
                                </Paper> :
                                <Paper className={classes.table} >
                                    {
                                        <TableProtuario viewProntuario={setViewProntuario} data={id} />
                                    }
                                </Paper>
                        }

                    </Grid>

                    <Box pt={4}>
                        {/* <Footer /> */}
                    </Box>
                </Container>
            </main>
        </div>:<Permissao/>
    );
};



const mapStateToProps = state => ({
    animalReducer: state.animals,
    userReducer: state.user,
    stateAll: state
});

const mapDispatch = dispatch => bindActionCreators({
    fetchUsuarios
}, dispatch);


export default connect(mapStateToProps, mapDispatch)(Prontuario)
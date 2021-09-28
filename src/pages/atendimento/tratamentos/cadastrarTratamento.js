import React, { useState } from 'react';
import clsx from 'clsx';
import { connect } from 'react-redux'
import { bindActionCreators } from "redux"
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { useHistory, useParams } from 'react-router-dom';
import Divider from '@material-ui/core/Divider';
import { createTratamento } from '../../../redux/actions'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    table: {
        marginTop: '80px',
        padding: theme.spacing(2),
        minHeight: 100
    },
    divider: {
        border: 'solid 1px',
        marginTop: '10px'
    },
    salvar: {
        margin: '10px'
    },
    grids:{
        paddingTop: '10px'
    }
}));

const AdicionarTratamento = ({ createTratamento, userReducer }) => {


    const { id } = useParams();
    const veterinario = userReducer.user.nome
    const history = useHistory();
    
    const [values, setValues] = useState({
        idAnimal: id,
        veterinario,
        data: Date.now()
    })

    const onChange = (ev) => {
        const { name, value } = ev.target;
        setValues({ ...values, [name]: value });
    };

    const onSubmit = async (ev) => {
        ev.preventDefault();
        createTratamento(values)

        const timer = setTimeout(() => {
            history.push('/dashboard')
        }, 1000);
        return () => clearTimeout(timer);
    };

    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    return (

        <Paper className={classes.table} >

           
            <form onSubmit={onSubmit}>
            <h1>Tratamentos</h1>
            <Divider className={classes.divider} />
                <Grid item sm={12} className={classes.grids}>
                    <Grid container spacing={6}>

                        <Grid item xs={12} sm={12} >
                            <TextField
                                required
                                id="Tratramento"
                                name="tratamento"
                                label="Tratramento"
                                type="text"
                                variant="outlined"
                                fullWidth
                                onChange={onChange}
                                autoComplete="shipping address-line1"
                            />
                        </Grid>

                        <Grid item xs={12} sm={12} >
                            <TextField
                                required
                                id="descricao"
                                name="descricao"
                                label="Descrição"
                                type="text"
                                multiline
                                rows={5}
                                variant="outlined"
                                fullWidth
                                onChange={onChange}
                                autoComplete="shipping address-line1"
                            />
                        </Grid>
         
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Button variant="contained" type="submit" color="primary" className={classes.salvar}>
                        Salvar
                    </Button>
                </Grid>
            </form>
            <ToastContainer/>
        </Paper>

    );
};

const mapStateToProps = state => ({
    animalReducer: state.animals,
    userReducer: state.user,
    stateAll: state
});

const mapDispatch = dispatch => bindActionCreators({
    createTratamento
}, dispatch);


export default connect(mapStateToProps, mapDispatch)(AdicionarTratamento)
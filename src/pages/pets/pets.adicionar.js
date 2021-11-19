import React, { useState } from 'react';
import clsx from 'clsx';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Menu from '../../components/menu';
import InputMask from "react-input-mask";
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { connect } from 'react-redux'
import { bindActionCreators } from "redux"
import { creatAnimal } from '../../redux/actions';

const caes = ['Pastor-Alemão', 'Labrador', 'Zwergspitz', 'Husky', 'Golden', 'Buldogue', 'Poodle', 'Pit-Bull', 'Chihuahua', 'Shiba Inu', 'Rottweiler', 'Bobermann', 'Pug', 'Dachshulund'];
const gatos = ['Persa', ' Maine Coon', 'Siamês', 'Gato Inglês', 'Ragdoll', 'Munchkin', 'Norueguês', 'Siberiano'];

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
        padding: theme.spacing(4),
        paddingBottom: theme.spacing(4),

    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column'
    },
    fixedHeight: {
        height: 350,
    },
    Button: {
        marginBottom: 'auto'
    },
    pets: {
        marginLeft: '10px'
    }
}));

const AdicionarAnimals = ({ creatAnimal, stateReducer }) => {

    const [values, setValues] = useState();
    const [created, setCreated] = useState(false);
    const history = useHistory();

    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    const [especie, setEspecie] = useState(null);

    const selectEspecie = (ev) => {
        const selected = ev.target.value
        setEspecie(selected)
    };

    const { success } = stateReducer;
    
   
    const onSubmit = async (ev) => {
        ev.preventDefault();
        creatAnimal(values)
        setCreated(true)
         if (success) {
            const timer = setTimeout(() => {
              history.push("/pets");
            }, 1000);
            return () => clearTimeout(timer);
          }
    };
    const onChange = (ev) => {
        const { name, value } = ev.target;
        setValues({ ...values, [name]: value });
       
    }
    const callTowFunction = (ev) =>{
        onChange(ev)
        selectEspecie(ev)
    }
    return (
        <div className={classes.root}>
            <CssBaseline />
            <Menu msg="Pets" />
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    <h1>
                        Cadastrar Pet
                    </h1>
                    <form onSubmit={onSubmit}>
                        <Grid item sm={10}>
                            <Paper className={fixedHeightPaper}>
                                <Grid container spacing={4}>
                                    <Grid item xs={12} >
                                        <TextField
                                            required
                                            id="nome"
                                            name="nome"
                                            label="Nome"
                                            fullWidth
                                            onChange={onChange}
                                            autoComplete="shipping address-line1"
                                        />
                                    </Grid>
                                </Grid>

                                <Grid container spacing={3}>
                                    <Grid item xs={12} sm={6}>
                                        <InputMask
                                            mask="999.999.999-99"
                                            maskChar=" "
                                            onChange={onChange}
                                            id="cpf"
                                            name="cpf"
                                        >
                                            {() => <TextField fullWidth className={classes.inputText} label="CPF do Dono" required name="cpf" />}
                                        </InputMask>
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <FormControl fullWidth className={classes.formControl} >
                                            <InputLabel item >Espécie</InputLabel>
                                            <Select
                                                name="especie"
                                                onChange={callTowFunction}
                                                native
                                            >

                                                <option aria-label="None" value="" />
                                                <option value={'Cachorro'}>Cachorro</option>
                                                <option value={'Gato'}>Gato</option>

                                            </Select>
                                        </FormControl>
                                    </Grid>

                                </Grid>

                                <Grid container spacing={3}>

                                    <Grid item xs={12} sm={6}>
                                        <FormControl fullWidth className={classes.formControl} >
                                            <InputLabel item >Raça</InputLabel>
                                            <Select
                                                name="raca"
                                                onChange={onChange}
                                                native
                                            >
                                                <option aria-label="None" value="" />
                                                {
                                                    especie && especie === 'Cachorro' ? caes.map(i => <option value={i}>{i}</option>) : ''

                                                }
                                                {
                                                    especie && especie === 'Gato' ? gatos.map(i => <option value={i}>{i}</option>) : ''

                                                }

                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormControl fullWidth className={classes.formControl} >
                                            <InputLabel item >Pelagem</InputLabel>
                                            <Select
                                                name="pelagem"
                                                onChange={onChange}
                                                native
                                            >
                                                <option aria-label="None" value="" />
                                                <option value='Curto'>Curto</option>
                                                <option value='Médio'>Médio</option>
                                                <option value='Alto'>Alto</option>
                                            </Select>
                                        </FormControl>
                                    </Grid>


                                </Grid>

                                <Grid container spacing={3}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            id="idade"
                                            name="idade"
                                            label="Idade"
                                            type="number"
                                            onChange={onChange}
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormControl fullWidth className={classes.formControl} >
                                            <InputLabel item >Sexo</InputLabel>
                                            <Select
                                                name='sexo'
                                                native
                                                onChange={onChange}
                                            >
                                                <option aria-label="None" value="" />
                                                <option value='Femea'>Femea</option>
                                                <option value='Macho'>Macho</option>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                </Grid>

                                <Grid container spacing={3}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            id="peso"
                                            name="peso"
                                            label="Peso"
                                            type="number"
                                            onChange={onChange}
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormControl fullWidth className={classes.formControl} >
                                            <InputLabel item >Temperamento</InputLabel>
                                            <Select
                                                native
                                                name='temperamento'
                                                onChange={onChange}
                                            >
                                                <option aria-label="None" value="" />
                                                <option value='Calmo'>Calmo</option>
                                                <option value='Bravo'>Bravo</option>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Button variant="contained" type="submit" color="primary">
                                            Adicionar
                                        </Button>

                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                    </form>
                </Container>
            </main>
            <ToastContainer />
        </div>
    );
};



const mapStateToProps = state => ({
    stateReducer: state.animals,
});

const mapDispatch = dispatch => bindActionCreators({
    creatAnimal
}, dispatch);

export default connect(mapStateToProps, mapDispatch)(AdicionarAnimals);
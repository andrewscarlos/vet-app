import React from 'react';
import clsx from 'clsx';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Menu from '../../components/menu';
import InputMask from "react-input-mask";
import Button from '@material-ui/core/Button';
import Pets from '@material-ui/icons/Pets'

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
    pets:{
        marginLeft: '10px'
    }
}));

export default function Dashboard() {
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    const history  = useHistory();

    const showPetCadastro = () =>{
        history.push('/pets/adicionar')
    };
    
    return (
        <div className={classes.root}>
            <CssBaseline />
            <Menu msg="Pets" />
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    <h1>
                        Responsável
                    </h1>
                    <Grid item sm={10}>
                        <Paper className={fixedHeightPaper}>

                            <Grid container spacing={4}>

                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="nome"
                                        name="nome"
                                        label="Nome"
                                        fullWidth
                                        autoComplete="shipping address-line1"
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <InputMask
                                        mask="999.999.999-99"
                                        maskChar=" "
                                        //onChange={onChange}
                                        id="cpf"
                                        name="cpf"
                                    >
                                        {() => <TextField fullWidth className={classes.inputText} label="CPF" required name="cpf" />}
                                    </InputMask>
                                </Grid>

                            </Grid>

                            <Grid container spacing={3}>

                                <Grid item xs={12} sm={6}>
                                    <TextField

                                        type="email"
                                        id="email"
                                        name="email"
                                        label="Email"
                                        fullWidth
                                        autoComplete="shipping address-line1"
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <InputMask
                                        mask="(99) - 9 9999-9999"
                                        maskChar=" "
                                        //onChange={onChange}
                                        id="celular"
                                        name="telefone"
                                    >
                                        {() => <TextField fullWidth className={classes.inputText} label="Celular" name="telefone" />}
                                    </InputMask>
                                </Grid>

                            </Grid>
                            <Grid container spacing={3}>

                                <Grid item xs={12} sm={6}>
                                    <TextField

                                        id="sus"
                                        name="sus"
                                        label="Carteirinha do SUS"
                                        fullWidth
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <InputMask
                                        mask="99999-999"
                                        maskChar=" "
                                        //onChange={onChange}
                                        id="cep"
                                        name="cep"
                                    >
                                        {() => <TextField fullWidth className={classes.inputText} label="CEP" required name="cep" />}
                                    </InputMask>
                                </Grid>
                            </Grid>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        id="endereco"
                                        name="endereco"
                                        label="Endereço"
                                        fullWidth
                                        autoComplete="shipping address-line1"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        id="bairro"
                                        name="bairro"
                                        label="Bairro"
                                        fullWidth
                                        autoComplete="shipping address-line1"
                                    />
                                </Grid>
                            </Grid>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        id="numero"
                                        name="numero"
                                        label="Número"
                                        fullWidth
                                        autoComplete="shipping address-line1"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        id="uf"
                                        name="uf"
                                        label="UF"
                                        fullWidth
                                        autoComplete="shipping address-line1"
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <Button variant="contained" color="primary">
                                        Salvar
                                    </Button>

                                    <Button className={classes.pets} onClick={showPetCadastro} variant="contained" color="primary">
                                        <Pets />
                                    </Button>

                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </Container>
            </main>
        </div>
    );
}
import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Menu from '../../../components/menu';
import Button from '@material-ui/core/Button';
import { useHistory, useParams } from 'react-router-dom';
import TableProtuario from './ProtuarioTable'
import NoteAdd from '@material-ui/icons/NoteAdd';
import Divider from '@material-ui/core/Divider';
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
    salvar:{
        margin:'10px'
    }
}));

const Prontuario = () => {
    const history = useHistory();
    const { id } = useParams();

    const onClick = (ev) => {
        const types = ev.target.innerText
        switch (types) {

            case 'PRONTUARIO': {
                return history.push(`/pets/prontuario/${id}`)
            }

            case 'TRATAMENTOS': {
                return history.push(`/pets/tratamentos/${id}`)
            }

            case 'ALERGIAS': {
                return history.push(`/pets/alergias/${id}`)
            }

            case 'MEDICAMENTO': {
                return history.push(`/pets/medicamentos/${id}`)
            }

            case 'VACINAS': {
                return history.push(`/pets/vacinas/${id}`)
            }

            case 'VERMIFUGO': {
                return history.push(`/pets/vermifugos/${id}`)
            }

            case 'DADOS': {
                return history.push(`/pets/dados/${id}`)
            }

            default:
                return history.push('/dashboard')
        }
    }

    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    return (

        <Paper className={classes.table} >

            <h1>Análise Geral</h1>
            <Divider className={classes.divider} />
            <form>
                <Grid item sm={12}>
                    <Grid container spacing={6}>

                        <Grid item xs={12} sm={6} >
                            <TextField
                                required
                                id="peso"
                                name="peso"
                                label="Peso"
                                type="number"
                                variant="outlined"
                                fullWidth
                                //onChange={onChange}
                                autoComplete="shipping address-line1"
                            />
                        </Grid>

                        <Grid item xs={12} sm={6} >
                            <TextField
                                required
                                id="idade"
                                name="idade"
                                label="Idade"
                                type="number"
                                variant="outlined"
                                fullWidth
                                //onChange={onChange}
                                autoComplete="shipping address-line1"
                            />
                        </Grid>

                        <Grid item xs={12} sm={6} >
                            <TextField

                                id="descricao"
                                name="descricao"
                                label="Descrição"
                                type="textarea"
                                multiline
                                rows={3}
                                variant="outlined"
                                fullWidth
                                //onChange={onChange}
                                autoComplete="shipping address-line1"
                            />
                        </Grid>

                        <Grid item xs={12} sm={6} >
                            <TextField

                                id="pregresso"
                                name="pregresso"
                                label="Pregresso"
                                type="textarea"
                                multiline
                                rows={3}
                                variant="outlined"
                                fullWidth
                                //onChange={onChange}
                                autoComplete="shipping address-line1"
                            />
                        </Grid>

                        <Grid item xs={12} sm={6} >
                            <TextField

                                id="resultado"
                                name="resultado"
                                label="Resultado"
                                type="textarea"
                                multiline
                                rows={3}
                                variant="outlined"
                                fullWidth
                                //onChange={onChange}
                                autoComplete="shipping address-line1"
                            />
                        </Grid>
                    </Grid>

                    <h1>Exame Físico</h1>
                    <Divider className={classes.divider} />
                    <Grid container spacing={6}>

                        <Grid item xs={12} sm={6} >
                            <TextField
                                required
                                id="temperatura"
                                name="temperatura"
                                label="Temperatura Cº"
                                type="number"
                                variant="outlined"
                                fullWidth
                                //onChange={onChange}
                                autoComplete="shipping address-line1"
                            />
                        </Grid>

                        <Grid item xs={12} sm={6} >
                            <TextField
                                required
                                id="frequencia-respiratoria"
                                name="frequencia-respiratoria"
                                label="Frequencia respiratoria (MPM)"
                                type="number"
                                variant="outlined"
                                fullWidth
                                //onChange={onChange}
                                autoComplete="shipping address-line1"
                            />
                        </Grid>

                        <Grid item xs={12} sm={6} >
                            <TextField
                                required
                                id="frequencia-cardiaca"
                                name="frequencia-cardiaca"
                                label="Frequencia Cardiaca (BPM)"
                                type="number"
                                variant="outlined"
                                fullWidth
                                //onChange={onChange}
                                autoComplete="shipping address-line1"
                            />
                        </Grid>

                        <Grid item xs={12} sm={6} >
                            <TextField
                                required
                                id="tempo-de-preenchimento-capilar"
                                name="tempo-de-preenchimento-capilar"
                                label="Tempo de preenchimento capilar (S)"
                                type="number"
                                variant="outlined"
                                fullWidth
                                //onChange={onChange}
                                autoComplete="shipping address-line1"
                            />
                        </Grid>

                        <Grid item xs={12} sm={6} >
                            <TextField
                                required
                                id="mucosas"
                                name="mucosas"
                                label="Mucosas"
                                type="text"
                                variant="outlined"
                                fullWidth
                                //onChange={onChange}
                                autoComplete="shipping address-line1"
                            />
                        </Grid>

                        <Grid item xs={12} sm={6} >
                            <TextField
                                required
                                id="hidratacao"
                                name="hidratacao"
                                label="Hidratação"
                                type="text"
                                variant="outlined"
                                fullWidth
                                //onChange={onChange}
                                autoComplete="shipping address-line1"
                            />
                        </Grid>

                        <Grid item xs={12} sm={6} >
                            <TextField
                                required
                                id="ectoparasitos"
                                name="ectoparasitos"
                                label="Ectoparasitos)"
                                type="text"
                                variant="outlined"
                                fullWidth
                                //onChange={onChange}
                                autoComplete="shipping address-line1"
                            />
                        </Grid>
                    </Grid>
                    <h1>Exame Físico Específico</h1>
                    <Divider className={classes.divider} />
                    <Grid container spacing={6}>
                        <Grid item xs={12} sm={6} >
                            <TextField

                                id="exame-ficico"
                                name="exame-ficico"
                                label="Exame Fífico Específico"
                                type="textarea"
                                multiline
                                rows={3}
                                variant="outlined"
                                fullWidth
                                //onChange={onChange}
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
        </Paper>

    );
};

export default Prontuario
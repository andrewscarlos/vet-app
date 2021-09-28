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
import { createProntuario } from '../../../redux/actions'
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
    grids: {
        paddingTop: '10px'
    }
}));

const EditProntuario = ({ createProntuario, userReducer, data }) => {


    const { id } = useParams();
    const veterinario = userReducer.user.nome

    const [peso, setPeso] = useState(data.peso || '')
    const [idade, setIdade] = useState(data.idade || '')
    const [descricao, setDescricao] = useState(data.descricao || '')
    const [progresso, setProgresso] = useState(data.progresso || '')
    const [resultado, setResultado] = useState(data.resultado || '')
    const [temperatura, setTemperatura] = useState(data.temperatura || '')
    const [frequenciaCardiaca, setFrequenciaCardiaca] = useState(data.frequenciaCardiaca || '')
    const [frequenciaRespiratoria, setFrequenciaRespiratoria] = useState(data.frequenciaRespiratoria || '')
    const [tempoPreenchimentoCapilar, setTempoPreenchimentoCapilar] = useState(data.tempoPreenchimentoCapilar || '')
    const [mucosas, setMucosas] = useState(data.mucosas || '')
    const [hidratacao, setHidratacao] = useState(data.hidratacao || '')
    const [ectoparasitos, setEctoparasitos] = useState(data.ectoparasitos || '')
    const [exameFisico, setExameFisico] = useState(data.exameFisico || '')

    const history = useHistory();

    


    const onSubmit = async (ev) => {
        ev.preventDefault();
        createProntuario({
            peso,
            idade,
            descricao,
            progresso,
            resultado,
            temperatura,
            frequenciaCardiaca,
            frequenciaRespiratoria,
            tempoPreenchimentoCapilar,
            mucosas,
            hidratacao,
            ectoparasitos,
            exameFisico,
            idAnimal: id,
            veterinario,
            data: Date.now(),
            idDoProntuario: data._id
        })

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
                <h1>Análise Geral</h1>
                <Divider className={classes.divider} />
                <Grid item sm={12} className={classes.grids}>
                    <Grid container spacing={6}>

                        <Grid item xs={12} sm={6} >
                            <TextField
                                required
                                id="peso"
                                name="peso"
                                label="Peso"
                                type="number"
                                value={peso}
                                variant="outlined"
                                fullWidth
                                onChange={e => setPeso(e.target.value)}
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
                                value={idade}
                                variant="outlined"
                                fullWidth
                                onChange={e => setIdade(e.target.value)}
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
                                value={descricao}
                                rows={3}
                                variant="outlined"
                                fullWidth
                                onChange={e => setDescricao(e.target.value)}
                                autoComplete="shipping address-line1"
                            />
                        </Grid>

                        <Grid item xs={12} sm={6} >
                            <TextField

                                id="pregresso"
                                name="progresso"
                                label="Pregresso"
                                type="textarea"
                                value={progresso}
                                multiline
                                rows={3}
                                variant="outlined"
                                fullWidth
                                onChange={e => setProgresso(e.target.value)}
                                autoComplete="shipping address-line1"
                            />
                        </Grid>

                        <Grid item xs={12} sm={6} >
                            <TextField

                                id="resultado"
                                name="resultado"
                                label="Resultado"
                                type="textarea"
                                value={resultado}
                                multiline
                                rows={3}
                                variant="outlined"
                                fullWidth
                                onChange={e => setResultado(e.target.value)}
                                autoComplete="shipping address-line1"
                            />
                        </Grid>
                    </Grid>

                    <h1>Exame Físico</h1>
                    <Divider className={classes.divider} />
                    <Grid container spacing={6} className={classes.grids}>

                        <Grid item xs={12} sm={6} >
                            <TextField

                                id="temperatura"
                                name="temperatura"
                                label="Temperatura Cº"
                                type="number"
                                value={temperatura}
                                variant="outlined"
                                fullWidth
                                onChange={e => setTemperatura(e.target.value)}
                                autoComplete="shipping address-line1"
                            />
                        </Grid>

                        <Grid item xs={12} sm={6} >
                            <TextField

                                id="frequencia-respiratoria"
                                name="frequenciaRespiratoria"
                                label="Frequencia respiratoria (MPM)"
                                type="number"
                                value={frequenciaRespiratoria}
                                variant="outlined"
                                fullWidth
                                onChange={e => setFrequenciaRespiratoria(e.target.value)}
                                autoComplete="shipping address-line1"
                            />
                        </Grid>

                        <Grid item xs={12} sm={6} >
                            <TextField

                                id="frequencia-cardiaca"
                                name="frequenciaCardiaca"
                                label="Frequencia Cardiaca (BPM)"
                                type="number"
                                value={frequenciaCardiaca}
                                variant="outlined"
                                fullWidth
                                onChange={e => setFrequenciaCardiaca(e.target.value)}
                                autoComplete="shipping address-line1"
                            />
                        </Grid>

                        <Grid item xs={12} sm={6} >
                            <TextField

                                id="tempo-de-preenchimento-capilar"
                                name="tempoPreenchimentoCapilar"
                                label="Tempo de preenchimento capilar (S)"
                                type="number"
                                variant="outlined"
                                fullWidth
                                value={tempoPreenchimentoCapilar}
                                onChange={e => setTempoPreenchimentoCapilar(e.target.value)}
                                autoComplete="shipping address-line1"
                            />
                        </Grid>

                        <Grid item xs={12} sm={6} >
                            <TextField

                                id="mucosas"
                                name="mucosas"
                                label="Mucosas"
                                value={mucosas}
                                type="text"
                                variant="outlined"
                                fullWidth
                                onChange={e => setMucosas(e.target.value)}
                                autoComplete="shipping address-line1"
                            />
                        </Grid>

                        <Grid item xs={12} sm={6} >
                            <TextField

                                id="hidratacao"
                                name="hidratacao"
                                label="Hidratação"
                                type="text"
                                value={hidratacao}
                                variant="outlined"
                                fullWidth
                                onChange={e => setHidratacao(e.target.value)}
                                autoComplete="shipping address-line1"
                            />
                        </Grid>

                        <Grid item xs={12} sm={6} >
                            <TextField

                                id="ectoparasitos"
                                name="ectoparasitos"
                                label="Ectoparasitos"
                                type="text"
                                value={ectoparasitos}
                                variant="outlined"
                                fullWidth
                                onChange={e => setEctoparasitos(e.target.value)}
                                autoComplete="shipping address-line1"
                            />
                        </Grid>
                    </Grid>
                    <h1>Exame Físico Específico</h1>
                    <Divider className={classes.divider} />
                    <Grid container spacing={6} className={classes.grids}>
                        <Grid item xs={12} sm={6} >
                            <TextField

                                id="exame-ficico"
                                name="exameFisico"
                                label="Exame Fífico Específico"
                                type="textarea"
                                multiline
                                value={exameFisico}
                                rows={3}
                                variant="outlined"
                                fullWidth
                                onChange={e => setExameFisico(e.target.value)}
                                autoComplete="shipping address-line1"
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Button variant="contained" type="submit" color="primary" className={classes.salvar}>
                        Atualizar
                    </Button>
                </Grid>
            </form>
            <ToastContainer />
        </Paper>

    );
};

const mapStateToProps = state => ({
    animalReducer: state.animals,
    userReducer: state.user,
    stateAll: state
});

const mapDispatch = dispatch => bindActionCreators({
    createProntuario
}, dispatch);


export default connect(mapStateToProps, mapDispatch)(EditProntuario)
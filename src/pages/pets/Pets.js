import React, { useState, useCallback } from 'react'
import clsx from 'clsx'

import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'
import InputMask from "react-input-mask"
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { connect } from 'react-redux'
import { bindActionCreators } from "redux"
import { creatAnimal } from '../../redux/actions'

import { useStyles } from "./../../styles"

const caes = ['Pastor-Alemão', 'Labrador', 'Zwergspitz', 'Husky', 'Golden', 'Buldogue', 'Poodle', 'Pit-Bull', 'Chihuahua', 'Shiba Inu', 'Rottweiler', 'Bobermann', 'Pug', 'Dachshulund'];
const gatos = ['Persa', ' Maine Coon', 'Siamês', 'Gato Inglês', 'Ragdoll', 'Munchkin', 'Norueguês', 'Siberiano'];


const AdicionarAnimals = ({ creatAnimal }) => {
  const [values, setValues] = useState();
  const [especie, setEspecie] = useState(null);
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const selectEspecie = useCallback(ev => {
    const selected = ev.target.value
    setEspecie(selected)
  }, []);

  const onSubmit = useCallback(ev => {
    ev.preventDefault();
    creatAnimal(values)
  }, [creatAnimal, values])

  const onChange = useCallback(ev => {
    const { name, value } = ev.target;
    setValues({ ...values, [name]: value });
  }, [values])


  const callTowFunction = useCallback(ev => {
    onChange(ev)
    selectEspecie(ev)
  }, [onChange, selectEspecie])

  return (
    <>
      <Container maxWidth="lg" className={classes.container}>
        <h1> Cadastrar Pet </h1>
        <form onSubmit={onSubmit}>
          <Grid item sm={12}>
            <Paper className={fixedHeightPaper}>
              <Grid container spacing={4}>
                <Grid item xs={12} >
                  <TextField
                    required
                    id="nome"
                    name="nome"
                    label="Nome"
                    fullWidth
                    autoComplete="shipping address-line1"
                    onChange={onChange}
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
                      {especie && especie === 'Cachorro'
                        ? caes.map(i => <option value={i}>{i}</option>)
                        : ''}
                      {especie && especie === 'Gato' ? gatos.map(i => <option value={i}>{i}</option>) : ''}
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

      <ToastContainer />
    </>
  );
};



const mapStateToProps = state => ({
  stateReducer: state.user
});

const mapDispatch = dispatch => bindActionCreators({
  creatAnimal
}, dispatch);

export default connect(mapStateToProps, mapDispatch)(AdicionarAnimals);
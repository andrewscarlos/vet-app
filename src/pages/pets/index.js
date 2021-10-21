import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Menu from "../../components/menu";
import InputMask from "react-input-mask";
import Button from "@material-ui/core/Button";
import Pets from "@material-ui/icons/Pets";

import { toast ,ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchAnimals, creatPessoa } from "../../redux/actions";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    padding: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 350,
  },
  Button: {
    marginBottom: "auto",
  },
  pets: {
    marginLeft: "10px",
  },
}));

const Animais = ({
  fetchAnimals,
  creatPessoa,
  stateReducer,
  stateReducerUser,
  stateAll,
}) => {

  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const history = useHistory();
  const [values, setValues] = useState({});

  const [nome, setNome] = useState();
  const [cpf, setCPF] = useState();
  const [email, setEmail] = useState();
  const [telefone, setTelefone] = useState();
  const [sus, setSus] = useState();

  const [cep, setCep] = useState();

  const [endereco, setEndereco] = useState();
  const [bairro, setBairro] = useState();
  const [numero, setNumero] = useState();
  const [uf, setUf] = useState();

  const showPetCadastro = () => {
    history.push("/pets/adicionar");
  };


  const onChange = (ev) => {
    const { name, value } = ev.target;
    setValues({ ...values, [name]: value });
  };

const ValidarCPF = (cpf)=> {	
	cpf = cpf.replace(/[^\d]+/g,'');	
	if(cpf == '') return false;		
	if (cpf.length != 11 || 
		cpf == "00000000000" || 
		cpf == "11111111111" || 
		cpf == "22222222222" || 
		cpf == "33333333333" || 
		cpf == "44444444444" || 
		cpf == "55555555555" || 
		cpf == "66666666666" || 
		cpf == "77777777777" || 
		cpf == "88888888888" || 
		cpf == "99999999999")
			return false;		

	let add = 0;	
	for (let i=0; i < 9; i ++)		
		add += parseInt(cpf.charAt(i)) * (10 - i);	
		let rev = 11 - (add % 11);	
		if (rev == 10 || rev == 11)		
			rev = 0;	
		if (rev != parseInt(cpf.charAt(9)))		
			return false;		
	add = 0;	
	for (let i = 0; i < 10; i ++)		
		add += parseInt(cpf.charAt(i)) * (11 - i);	
	rev = 11 - (add % 11);	
	if (rev == 10 || rev == 11)	
		rev = 0;	
	if (rev != parseInt(cpf.charAt(10)))
		return false;		
	return true;   
};


  const fetchCep = async (data) => {
    const options = {
      method: "GET",
      mode: "cors",
      cache: "default",
    };
    const cep = await fetch(
      `https://viacep.com.br/ws/${data}/json/`,
      options
    ).then((resp) => {
      return resp.json();
    });
    return cep;
  };

  let cepConsumer = cep ? cep : null;
  let cpfConsumer = cpf ? cpf : null;

  useEffect(async () => {
    if (cepConsumer != null && cepConsumer.length >= 8) {
      cepConsumer = cepConsumer.replace("-", "");
      const cep = await fetchCep(cepConsumer);

      if (cep) {
        setUf(cep.uf);
        setBairro(cep.bairro);
        setNumero();
        setEndereco(cep.logradouro);
      }
    }
  }, [cepConsumer]);

  useEffect(async () => {
    
    if(cpfConsumer !== null){
      cpfConsumer = cpfConsumer.replace(/[^\d]+/g,'');
      if (cpfConsumer.length == 11 ) {
        const cpfValidado = ValidarCPF(cpfConsumer)
        if(!cpfValidado){
          toast.error("CPF invalido !")
        }
      }
    }
    
    
    
  }, [cpfConsumer]);

  const onSubmit = async (ev) => {
    ev.preventDefault();
    creatPessoa({
      nome,
      cpf,
      email,
      telefone,
      sus,
      cep,
      endereco,
      bairro,
      numero,
      uf
    });

    const timer = setTimeout(() => {
      history.push("/dashboard");
    }, 1000);
    return () => clearTimeout(timer);
  };

 

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Menu msg="Pets" />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <h1>Responsável</h1>
          <form onSubmit={onSubmit}>
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
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                      autoComplete="shipping address-line1"
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <InputMask
                      mask="999.999.999-99"
                      maskChar=" "
                      onChange={(e) => setCPF(e.target.value)}
                      id="cpf"
                      name="cpf"
                      value={cpf}
                    >
                      {() => (
                        <TextField
                          fullWidth
                          className={classes.inputText}
                          label="CPF"
                          required
                          name="cpf"
                        />
                      )}
                    </InputMask>
                  </Grid>
                </Grid>

                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      onChange={onChange}
                      type="email"
                      id="email"
                      name="email"
                      label="Email"
                      fullWidth
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete="shipping address-line1"
                      value={email}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <InputMask
                      mask="(99) - 9 9999-9999"
                      maskChar=" "
                      onChange={onChange}
                      id="celular"
                      name="telefone"
                      value={telefone}
                      onChange={(e) => setTelefone(e.target.value)}
                    >
                      {() => (
                        <TextField
                          fullWidth
                          className={classes.inputText}
                          label="Celular"
                          name="telefone"
                        />
                      )}
                    </InputMask>
                  </Grid>
                </Grid>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      onChange={(e) => setSus(e.target.value)}
                      id="sus"
                      name="sus"
                      label="Carteirinha do SUS"
                      fullWidth
                      value={sus}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <InputMask
                      mask="99999-999"
                      maskChar=" "
                      onChange={(e) => setCep(e.target.value)}
                      id="cep"
                      name="cep"
                      value={cep}
                    >
                      {() => (
                        <TextField
                          fullWidth
                          className={classes.inputText}
                          label="CEP"
                          required
                          name="cep"
                        />
                      )}
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
                      value={endereco}
                      onChange={(e) => setEndereco(e.target.value)}

                      
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      id="bairro"
                      name="bairro"
                      label="Bairro"
                      fullWidth
                      value={bairro}
                      onChange={(e) => setBairro(e.target.value)}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="numero"
                      name="numero"
                      label="numero"
                      value={numero}
                      
                      fullWidth
                      onChange={(e) => setNumero(e.target.value)}
                     
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      id="uf"
                      name="uf"
                      label="UF"
                      value={uf}
                      fullWidth
                      onChange={(e) => setUf(e.target.value)}
                      autoComplete="shipping address-line1"
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Button variant="contained" type="submit" color="primary">
                      Salvar
                    </Button>

                    <Button
                      className={classes.pets}
                      onClick={showPetCadastro}
                      variant="contained"
                      color="primary"
                    >
                      <Pets />
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

const mapStateToProps = (state) => ({
  stateReducer: state.animals,
  stateReducerUser: state.user,
  stateAll: state,
});

const mapDispatch = (dispatch) =>
  bindActionCreators(
    {
      creatPessoa,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatch)(Animais);

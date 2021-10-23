import axios from "axios";
import {
  LOAD_USER,
  SUCCESS_USER,
  ERROR_USER,
  AUTHETICATE_USER,
  FETCH_ANIMALS,
  CREATE_USER,
  LOAD_PESSOA,
  SUCESS_PESSOA,
  ERROR_PESSOA,
  CREATE_PESSOA,
  CREATE_ANIMAL,
  LOAD_ANIMALS,
  SUCESS_ANIMALS,
  ERROR_ANIMALS,
  EXIT_PESSOA

} from "../constants";

import { toast } from "react-toastify";

const host = 'http://localhost:5001/'

const API = axios.create({
  baseURL: "http://localhost:5001",
});

export const fetchAnimals = () => {
  return (dispatch) => {
    dispatch({
      type: LOAD_ANIMALS
    });

    API.get("/animais")
      .then(res => {
        const { data } = res
        dispatch({
          type: FETCH_ANIMALS,
          payload: data,
        });
        dispatch({
          type: SUCESS_ANIMALS
        })
      })
      .catch(() => (

        dispatch({
          type: ERROR_ANIMALS
        })
      ));
  };
};

export const exitPessoa = () => {
  
  return (dispatch) => {
    dispatch({
      type: EXIT_PESSOA
    });
  };
};

export const userAuthenticate = (data) => {
  
  return (dispatch) => {
    dispatch({
      type: LOAD_USER
    })
    API.post(`${host}register/authenticate`, { ...data }).then(({ data }) => {

      dispatch({
        type: AUTHETICATE_USER,
        payload: data
      })
      dispatch({
        type: SUCCESS_USER
      })
      toast.success("Voce Logou com sucesso")
      localStorage.setItem("user@authentication", JSON.stringify(data))
    }).catch((error) => {
      dispatch({
        type: ERROR_USER
      })
      toast.error("Não Foi Possivel Logar")
      return {
        error
      }
    })
  };
};

export const createUser = (data) => {

  return (dispatch) => {
    dispatch({
      type: LOAD_USER
    })
    API.post(`${host}register`, { ...data }).then(({ data }) => {
      toast.success("Usuario cadastrado com sucesso")
      dispatch({
        type: CREATE_USER,
        payload: data
      })


      dispatch({
        type: SUCCESS_USER
      })


    }).catch((error) => {
      dispatch({
        type: ERROR_USER
      })
      toast.error("Não foi possivel criar o usuario")
      return {
        error
      }
    })
  };
};

export const creatPessoa = (data) => {
  
  return (dispatch) => {
    dispatch({
      type: LOAD_PESSOA
    });

    API.post(`${host}pessoas`, { ...data }).then(({ data }) => {
      toast.success("Cadastrado com sucesso")
      dispatch({
        type: CREATE_PESSOA,
        payload: data
      })

      dispatch({
        type: SUCESS_PESSOA
      })

    }).catch((error) => {
      dispatch({
        type: ERROR_PESSOA
      })
      toast.error("Não foi possivel cadastrar")
      return { error }
    })
  };
};

export const creatAnimal = (data) => {

  return (dispatch) => {
    dispatch({
      type: LOAD_ANIMALS
    });

    API.post(`${host}animais`, { ...data }).then(({ data }) => {
      toast.success("Cadastrado com sucesso")
      dispatch({
        type: CREATE_ANIMAL,
        payload: data
      })

      dispatch({
        type: SUCESS_ANIMALS
      })

    }).catch((error) => {
      dispatch({
        type: ERROR_ANIMALS
      })
      toast.error("Não foi possivel cadastrar")
      return { error }
    })
  };
};

export const createProntuario = (data) => {

  return (dispatch) => {
    dispatch({
      type: LOAD_ANIMALS
    });

    API.post(`${host}animais/prontuarios`, { ...data }).then(({ data }) => {
      toast.success("Prontuario Cadastrado com sucesso")
      dispatch({
        type: CREATE_ANIMAL,
        payload: data
      })

      dispatch({
        type: SUCESS_ANIMALS
      })

    }).catch((error) => {
      dispatch({
        type: ERROR_ANIMALS
      })
      toast.error("Erro ao cadastrar o Prontuario")
      return { error }
    })
  };
};

export const updatedProntuario = (data) => {
  
  return (dispatch) => {
    dispatch({
      type: LOAD_ANIMALS
    });

    API.patch(`${host}animais/prontuarios`, { ...data }).then(({ data }) => {
      toast.success("Prontuario Atualizado com sucesso")
      dispatch({
        type: CREATE_ANIMAL,
        payload: data
      })

      dispatch({
        type: SUCESS_ANIMALS
      })

    }).catch((error) => {
      dispatch({
        type: ERROR_ANIMALS
      })
      toast.error("Erro ao Atualizar o Prontuario")
      return { error }
    })
  };
};

export const updatedTratamento = (data) => {
 
  return (dispatch) => {
    dispatch({
      type: LOAD_ANIMALS
    });

    API.patch(`${host}animais/tratamentos`, { ...data }).then(({ data }) => {
      toast.success("Tratamento Atualizado com sucesso")
      dispatch({
        type: CREATE_ANIMAL,
        payload: data
      })

      dispatch({
        type: SUCESS_ANIMALS
      })

    }).catch((error) => {
      dispatch({
        type: ERROR_ANIMALS
      })
      toast.error("Erro ao Atualizar o Tratamento")
      return { error }
    })
  };
};

export const createTratamento = (data) => {

  return (dispatch) => {
    dispatch({
      type: LOAD_ANIMALS
    });

    API.post(`${host}animais/tratamentos`, { ...data }).then(({ data }) => {
      toast.success("Tratamento Cadastrado com sucesso")
      dispatch({
        type: CREATE_ANIMAL,
        payload: data
      })

      dispatch({
        type: SUCESS_ANIMALS
      })

    }).catch((error) => {
      dispatch({
        type: ERROR_ANIMALS
      })
      toast.error("Erro ao cadastrar o Tratamento")
      return { error }
    })
  };
};

export const updatedAlergias = (data) => {
  
  return (dispatch) => {
    dispatch({
      type: LOAD_ANIMALS
    });

    API.patch(`${host}animais/alergias`, { ...data }).then(({ data }) => {
      toast.success("Alergias Atualizada com sucesso")
      dispatch({
        type: CREATE_ANIMAL,
        payload: data
      })

      dispatch({
        type: SUCESS_ANIMALS
      })

    }).catch((error) => {
      dispatch({
        type: ERROR_ANIMALS
      })
      toast.error("Erro ao Atualizar as Alergias")
      return { error }
    })
  };
};

export const createAlergias = (data) => {

  return (dispatch) => {
    dispatch({
      type: LOAD_ANIMALS
    });

    API.post(`${host}animais/alergias`, { ...data }).then(({ data }) => {
      toast.success("Alergias Cadastrado com sucesso")
      dispatch({
        type: CREATE_ANIMAL,
        payload: data
      })

      dispatch({
        type: SUCESS_ANIMALS
      })

    }).catch((error) => {
      dispatch({
        type: ERROR_ANIMALS
      })
      toast.error("Erro ao cadastrar o Alergias")
      return { error }
    })
  };
};

export const updatedMedicamentos = (data) => {
  
  return (dispatch) => {
    dispatch({
      type: LOAD_ANIMALS
    });

    API.patch(`${host}animais/medicamentos`, { ...data }).then(({ data }) => {
      toast.success("Medicamentos Atualizado com sucesso")
      dispatch({
        type: CREATE_ANIMAL,
        payload: data
      })

      dispatch({
        type: SUCESS_ANIMALS
      })

    }).catch((error) => {
      dispatch({
        type: ERROR_ANIMALS
      })
      toast.error("Erro ao Atualizar o Medicamentos")
      return { error }
    })
  };
};

export const createMedicamentos = (data) => {

  return (dispatch) => {
    dispatch({
      type: LOAD_ANIMALS
    });

    API.post(`${host}animais/medicamentos`, { ...data }).then(({ data }) => {
      toast.success("Medicamentos Cadastrado com sucesso")
      dispatch({
        type: CREATE_ANIMAL,
        payload: data
      })

      dispatch({
        type: SUCESS_ANIMALS
      })

    }).catch((error) => {
      dispatch({
        type: ERROR_ANIMALS
      })
      toast.error("Erro ao cadastrar o Medicamentos")
      return { error }
    })
  };
};

export const updatedVacinas = (data) => {
  
  return (dispatch) => {
    dispatch({
      type: LOAD_ANIMALS
    });

    API.patch(`${host}animais/vacinas`, { ...data }).then(({ data }) => {
      toast.success("Vacinas Atualizadas com sucesso")
      dispatch({
        type: CREATE_ANIMAL,
        payload: data
      })

      dispatch({
        type: SUCESS_ANIMALS
      })

    }).catch((error) => {
      dispatch({
        type: ERROR_ANIMALS
      })
      toast.error("Erro ao Atualizar as Vacinas")
      return { error }
    })
  };
};

export const createVacinas = (data) => {

  return (dispatch) => {
    dispatch({
      type: LOAD_ANIMALS
    });

    API.post(`${host}animais/vacinas`, { ...data }).then(({ data }) => {
      toast.success("Vacinas Cadastrado com sucesso")
      dispatch({
        type: CREATE_ANIMAL,
        payload: data
      })

      dispatch({
        type: SUCESS_ANIMALS
      })

    }).catch((error) => {
      dispatch({
        type: ERROR_ANIMALS
      })
      toast.error("Erro ao cadastrar o Vacinas")
      return { error }
    })
  };
};

export const updatedVermifugos = (data) => {
  
  return (dispatch) => {
    dispatch({
      type: LOAD_ANIMALS
    });

    API.patch(`${host}animais/vermifugos`, { ...data }).then(({ data }) => {
      toast.success("Vermifugos Atualizadas com sucesso")
      dispatch({
        type: CREATE_ANIMAL,
        payload: data
      })

      dispatch({
        type: SUCESS_ANIMALS
      })

    }).catch((error) => {
      dispatch({
        type: ERROR_ANIMALS
      })
      toast.error("Erro ao Atualizar as Vermifugos")
      return { error }
    })
  };
};

export const createVermifugos = (data) => {

  return (dispatch) => {
    dispatch({
      type: LOAD_ANIMALS
    });

    API.post(`${host}animais/vermifugos`, { ...data }).then(({ data }) => {
      toast.success("Vermifugos Cadastrado com sucesso")
      dispatch({
        type: CREATE_ANIMAL,
        payload: data
      })

      dispatch({
        type: SUCESS_ANIMALS
      })

    }).catch((error) => {
      dispatch({
        type: ERROR_ANIMALS
      })
      toast.error("Erro ao cadastrar o Vermifugos")
      return { error }
    })
  };
};



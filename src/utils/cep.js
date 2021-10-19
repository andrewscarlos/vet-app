export const fetchCep = async (data) => {
  const options = {
    method: "GET",
    mode: "cors",
    cache: "default",
  };
  const response = await fetch(`https://viacep.com.br/ws/${data}/json/`, options)
  const cep = await response.json()
  return cep;
};
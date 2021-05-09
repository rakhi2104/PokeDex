import axios from "axios";

const fetchData = async (filters) => {
  const { limit, offset } = filters;
  const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
  const data = await axios.get(url, {}).then((res) => res.data);

  return data;
};

const fetchSinglePokemonData = async (pokemonId) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;
  const data = await axios
    .get(url, {})
    .then((res) => res.data)
    .catch((e) => console.log(e));
  return data;
};

export { fetchData, fetchSinglePokemonData };

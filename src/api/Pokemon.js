import { Api } from "../lib/common";

export const allPokemonFn = async () => {
  const response = await Api.get(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=300`);  
  return response.data;
};

export const pokemonByIdFn = async (name) => {
  const response = await Api.get(`pokemon/${name}`);
  return response.data;
};

export const pokemonTypesFn = async () => {
  const response = await Api.get("type/");
  return response.data;
};
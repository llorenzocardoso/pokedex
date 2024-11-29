const API_BASE_URL = 'https://pokeapi.co/api/v2';

export const fetchPokemonList = async (limit = 151) => {
  const response = await fetch(`${API_BASE_URL}/pokemon?limit=${limit}`);
  const data = await response.json();
  return data.results;
};

export const fetchPokemonDetails = async (url) => {
  const response = await fetch(url);
  return await response.json();
};

// src/api/index.js
const API_URL = 'http://localhost:3000/pokemons';

export const getPokemons = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error('Erro ao buscar Pokémons');
  return response.json();
};

export const addPokemon = async (pokemon) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(pokemon),
  });
  if (!response.ok) throw new Error('Erro ao adicionar Pokémon');
};

export const editPokemon = async (id, pokemon) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(pokemon),
  });
  if (!response.ok) throw new Error('Erro ao editar Pokémon');
};

export const deletePokemon = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  if (!response.ok) throw new Error('Erro ao deletar Pokémon');
};

// src/hooks/usePokemon.js
import { useState, useEffect } from 'react';
import { getPokemons, addPokemon, editPokemon, deletePokemon } from '../data/api';

const usePokemon = () => {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPokemons();
  }, []);

  const fetchPokemons = async () => {
    setLoading(true);
    try {
      const data = await getPokemons();
      setPokemons(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddPokemon = async (pokemon) => {
    try {
      await addPokemon(pokemon);
      fetchPokemons();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditPokemon = async (id, updatedPokemon) => {
    try {
      await editPokemon(id, updatedPokemon);
      fetchPokemons();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeletePokemon = async (id) => {
    try {
      await deletePokemon(id);
      fetchPokemons();
    } catch (err) {
      console.error(err);
    }
  };

  return {
    pokemons,
    loading,
    error,
    handleAddPokemon,
    handleEditPokemon,
    handleDeletePokemon,
  };
};

export default usePokemon;

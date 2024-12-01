// src/hooks/usePokemons.js
import { useState, useEffect } from 'react';
import { fetchPokemonList, fetchPokemonDetails } from '../data/api';

const usePokemons = (limit = 151) => {
    const [pokemons, setPokemons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const basicPokemonList = await fetchPokemonList(limit);
                const detailedPokemonList = await Promise.all(
                    basicPokemonList.map((pokemon) => fetchPokemonDetails(pokemon.url))
                );
                setPokemons(detailedPokemonList);
            } catch (err) {
                setError('Erro ao carregar Pokémons.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [limit]);

    return { pokemons, loading, error };
};

export default usePokemons;

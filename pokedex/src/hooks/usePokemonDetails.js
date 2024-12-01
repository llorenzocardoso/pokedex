import { useState, useEffect } from 'react';
import axios from 'axios';
import { getWeaknessesFromType } from '../data/api'; 

const usePokemonDetails = (name) => {
    const [pokemon, setPokemon] = useState(null);
    const [evolutions, setEvolutions] = useState([]);
    const [weaknesses, setWeaknesses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPokemonDetails = async () => {
            try {
                setLoading(true);

                const pokemonResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
                setPokemon(pokemonResponse.data);

                const speciesResponse = await axios.get(pokemonResponse.data.species.url);
                const evolutionChainUrl = speciesResponse.data.evolution_chain.url;
                const evolutionResponse = await axios.get(evolutionChainUrl);
                
                const evolutionsData = [];
                let current = evolutionResponse.data.chain;

                while (current) {
                    evolutionsData.push({
                        name: current.species.name,
                        id: current.species.url.split('/').filter(Boolean).pop(),
                    });
                    current = current.evolves_to[0];
                }

                setEvolutions(evolutionsData);

                const fetchedWeaknesses = await getWeaknessesFromType(pokemonResponse.data.types);
                setWeaknesses(fetchedWeaknesses);

            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPokemonDetails();
    }, [name]);

    return { pokemon, evolutions, weaknesses, loading, error };
};

export default usePokemonDetails;

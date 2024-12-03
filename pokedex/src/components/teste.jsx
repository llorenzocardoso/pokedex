import { useState, useEffect } from 'react';
import usePokemons from '../hooks/usePokemon';

const PokemonList = () => {
    const { pokemons, loading, error } = usePokemons();
    const [pokemonList, setPokemonList] = useState([]);
    const [pokemonUrl, setPokemonUrl] = useState('');

    // Sincroniza a lista inicial de Pokémons
    useEffect(() => {
        setPokemonList(pokemons);
    }, [pokemons]);

    // Adicionar Pokémon via link da PokéAPI
    const handleAddPokemon = async () => {
        if (!pokemonUrl) {
            alert('Por favor, insira o link do Pokémon.');
            return;
        }

        try {
            const response = await fetch(pokemonUrl);
            if (!response.ok) {
                throw new Error('Erro ao buscar os dados do Pokémon. Verifique o link.');
            }
            const data = await response.json();

            const newPokemon = {
                id: data.id,
                name: data.name,
                sprites: { front_default: data.sprites.front_default },
            };

            setPokemonList([...pokemonList, newPokemon]);
            setPokemonUrl(''); // Limpa o campo de entrada
        } catch (error) {
            alert(error.message);
        }
    };

    // Atualizar Pokémon
    const handleUpdatePokemon = (id) => {
        const updatedName = prompt('Digite o novo nome do Pokémon:');
        if (updatedName) {
            setPokemonList(
                pokemonList.map((pokemon) =>
                    pokemon.id === id ? { ...pokemon, name: updatedName } : pokemon
                )
            );
        }
    };

    // Excluir Pokémon
    const handleDeletePokemon = (id) => {
        setPokemonList(pokemonList.filter((pokemon) => pokemon.id !== id));
    };

    if (loading) return <p className="text-center text-gray-500">Carregando...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;

    return (
        <div className="p-10">
            <h1 className="text-2xl font-bold text-center mb-6">Lista de Pokémons</h1>

            {/* Botão para adicionar Pokémon */}
            <div className="mb-6">
                <h2 className="text-lg font-bold mb-2">Adicionar Pokémon via URL da PokéAPI</h2>
                <div className="flex space-x-2">
                    <input
                        type="text"
                        placeholder="Insira o link do Pokémon"
                        value={pokemonUrl}
                        onChange={(e) => setPokemonUrl(e.target.value)}
                        className="border p-2 flex-1"
                    />
                    <button
                        onClick={handleAddPokemon}
                        className="bg-blue-500 text-white p-2 rounded"
                    >
                        Adicionar
                    </button>
                </div>
            </div>

            <ul className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {pokemonList.map((pokemon) => (
                    <li
                        key={pokemon.id}
                        className="p-4 bg-gray-100 rounded shadow hover:bg-gray-200 transition"
                    >
                        <img
                            src={pokemon.sprites.front_default}
                            alt={pokemon.name}
                            className="mx-auto"
                        />
                        <p className="font-medium text-lg capitalize text-center">{pokemon.name}</p>
                        <div className="mt-2 flex justify-center space-x-2">
                            <button
                                onClick={() => handleUpdatePokemon(pokemon.id)}
                                className="bg-yellow-400 text-white px-2 py-1 rounded"
                            >
                                Editar
                            </button>
                            <button
                                onClick={() => handleDeletePokemon(pokemon.id)}
                                className="bg-red-500 text-white px-2 py-1 rounded"
                            >
                                Deletar
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PokemonList;
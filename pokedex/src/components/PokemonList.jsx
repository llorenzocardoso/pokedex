// src/components/PokemonList.jsx
import { useState, useEffect } from 'react';
import usePokemons from '../hooks/usePokemon';
import { useNavigate } from 'react-router-dom';

const PokemonList = () => {
    const navigate = useNavigate();

    const { pokemons, loading, error } = usePokemons();
    const [pokemonList, setPokemonList] = useState([]);
    const [newPokemon, setNewPokemon] = useState({ name: '', id: '', sprites: { front_default: '' } });
    const [isModalOpen, setIsModalOpen] = useState(false);


    // Sincroniza a lista inicial de Pokémons
    useEffect(() => {
        setPokemonList(pokemons);
    }, [pokemons]);

    // Adicionar Pokémon
    const handleAddPokemon = () => {
        if (newPokemon.name && newPokemon.id && newPokemon.sprites.front_default) {
            setPokemonList([...pokemonList, newPokemon]);
            setNewPokemon({ name: '', id: '', sprites: { front_default: '' } });
        }
    };

    const handlePokemonClick = (pokemon) => {
        navigate(`/pokemon/${pokemon.name}`);
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

            <ul className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {pokemonList.map((pokemon) => (
                    <li
                        onClick={() => handlePokemonClick(pokemon)}
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
                                className="bg-gray-200 text-black px-1.5 py-0.5 rounded text-sm"
                            >
                                Editar
                            </button>
                            <button
                                onClick={() => handleDeletePokemon(pokemon.id)}
                                className="bg-red-500 text-white px-1.5 py-0.5 rounded text-sm"
                            >
                                Deletar
                            </button>
                        </div>
                    </li>
                ))}
            </ul>

            {/* Botão fixo para abrir o modal */}
            <button
                onClick={() => setIsModalOpen(true)}
                className="fixed bottom-4 right-4 bg-yellow-500 text-white w-14 h-14 rounded-full shadow-lg hover:bg-yellow-600 transition flex items-center justify-center text-xl"
            >
                +
            </button>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
                        <h2 className="text-lg font-bold mb-4">Adicionar Pokémon</h2>
                        <div className="space-y-4">
                            <input
                                type="text"
                                placeholder="Nome"
                                value={newPokemon.name}
                                onChange={(e) => setNewPokemon({ ...newPokemon, name: e.target.value })}
                                className="border p-2 w-full"
                            />
                            <input
                                type="text"
                                placeholder="ID"
                                value={newPokemon.id}
                                onChange={(e) => setNewPokemon({ ...newPokemon, id: e.target.value })}
                                className="border p-2 w-full"
                            />
                            <input
                                type="text"
                                placeholder="URL da Imagem"
                                value={newPokemon.sprites.front_default}
                                onChange={(e) =>
                                    setNewPokemon({
                                        ...newPokemon,
                                        sprites: { front_default: e.target.value },
                                    })
                                }
                                className="border p-2 w-full"
                            />
                        </div>
                        <div className="mt-4 flex justify-end space-x-2">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleAddPokemon}
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            >
                                Adicionar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PokemonList;

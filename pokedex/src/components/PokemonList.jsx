import { useState } from 'react';
import usePokemon from '../hooks/usePokemon';

const PokemonList = () => {
    const {
        pokemons,
        loading,
        error,
        handleAddPokemon,
        handleEditPokemon,
        handleDeletePokemon
    } = usePokemon();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false); // Controle de modo de edição
    const [currentPokemon, setCurrentPokemon] = useState({ id: '', name: '', sprite: '' });
    const [errors, setErrors] = useState({});

    const validatePokemon = () => {
        const validationErrors = {};
        if (!currentPokemon.id) validationErrors.id = 'ID é obrigatório.';
        if (!currentPokemon.name) validationErrors.name = 'Nome é obrigatório.';
        if (!currentPokemon.sprite) validationErrors.sprite = 'Sprite é obrigatório.';
        setErrors(validationErrors);
        return Object.keys(validationErrors).length === 0;
    };

    const handleAdd = () => {
        if (validatePokemon()) {
            handleAddPokemon(currentPokemon);
            setIsModalOpen(false);
            setCurrentPokemon({ id: '', name: '', sprite: '' });
        }
    };

    const handleEdit = () => {
        if (validatePokemon()) {
            handleEditPokemon(currentPokemon.id, currentPokemon);
            setIsModalOpen(false);
            setIsEditMode(false);
            setCurrentPokemon({ id: '', name: '', sprite: '' });
        }
    };

    const handleEditClick = (pokemon) => {
        setCurrentPokemon(pokemon);
        setIsEditMode(true);
        setIsModalOpen(true);
    };

    const handlePokemonClick = (pokemon) => {
        alert(`Detalhes do Pokémon:\n\nID: ${pokemon.id}\nNome: ${pokemon.name}`);
    };

    if (loading) return <p className="text-center pt-5 text-gray-500">Carregando...</p>;
    if (error) return <p className="text-center pt-5 text-red-500">{error}</p>;

    return (
        <div className="p-10">
            <h1 className="text-2xl font-bold text-center mb-6">Lista de Pokémons</h1>
            <ul className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {pokemons.map((pokemon) => (
                    <li
                        key={pokemon.id}
                        className="p-3.5 bg-blue-200 rounded-xl shadow-xl hover:bg-gray-200 transition relative"
                        onClick={() => handlePokemonClick(pokemon)}
                    >
                        <div className="flex justify-between items-center">
                            <p className="font-bold text-xl">{pokemon.id}</p>
                            <img
                                src={pokemon.sprite}
                                alt={pokemon.name}
                                className="mx-auto w-16 h-16"
                            />
                            <p className="font-semibold text-md capitalize text-center">{pokemon.name}</p>
                            <div className="absolute top-2 right-2">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleEditClick(pokemon); // Chamando para editar
                                    }}
                                    className="text-gray-500 hover:text-gray-800"
                                >
                                    &#x22EE;
                                </button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>

            <button
                onClick={() => {
                    setIsEditMode(false);
                    setCurrentPokemon({ id: '', name: '', sprite: '' });
                    setIsModalOpen(true);
                }}
                className="fixed bottom-4 right-4 bg-yellow-500 text-white w-14 h-14 rounded-full shadow-lg hover:bg-yellow-600 transition flex items-center justify-center text-xl"
                aria-label="Adicionar Pokémon"
            >
                +
            </button>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
                        <h2 className="text-lg font-bold mb-4">{isEditMode ? 'Editar Pokémon' : 'Adicionar Pokémon'}</h2>
                        <div className="space-y-4">
                            <div>
                                <input
                                    type="text"
                                    placeholder="ID do Pokémon"
                                    value={currentPokemon.id}
                                    onChange={(e) => setCurrentPokemon({ ...currentPokemon, id: e.target.value })}
                                    className={`border p-2 w-full ${errors.id ? 'border-red-500' : ''}`}
                                />
                                {errors.id && <p className="text-red-500 text-sm">{errors.id}</p>}
                            </div>
                            <div>
                                <input
                                    type="text"
                                    placeholder="Nome do Pokémon"
                                    value={currentPokemon.name}
                                    onChange={(e) => setCurrentPokemon({ ...currentPokemon, name: e.target.value })}
                                    className={`border p-2 w-full ${errors.name ? 'border-red-500' : ''}`}
                                />
                                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                            </div>
                            <div>
                                <input
                                    type="text"
                                    placeholder="Sprite do Pokémon (URL)"
                                    value={currentPokemon.sprite}
                                    onChange={(e) => setCurrentPokemon({ ...currentPokemon, sprite: e.target.value })}
                                    className={`border p-2 w-full ${errors.sprite ? 'border-red-500' : ''}`}
                                />
                                {errors.sprite && <p className="text-red-500 text-sm">{errors.sprite}</p>}
                            </div>
                        </div>
                        <div className="mt-4 flex justify-end space-x-2">
                            {isEditMode && (
                                <button
                                    onClick={() => {
                                        handleDeletePokemon(currentPokemon.id); // Deleta o Pokémon
                                        setIsModalOpen(false);
                                        setIsEditMode(false);
                                    }}
                                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                >
                                    Deletar
                                </button>
                            )}
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={isEditMode ? handleEdit : handleAdd}
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            >
                                {isEditMode ? 'Salvar' : 'Adicionar'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PokemonList;

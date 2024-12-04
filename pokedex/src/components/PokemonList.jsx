import { useState } from 'react';
import usePokemon from '../hooks/usePokemon';
import { useNavigate } from 'react-router-dom';

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
    const [isEditMode, setIsEditMode] = useState(false);
    const [currentPokemon, setCurrentPokemon] = useState({ id: '', name: '', sprite: '' });
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    const validatePokemon = () => {
        const validationErrors = {};
        if (!currentPokemon.id) validationErrors.id = 'ID is required.';
        if (!currentPokemon.name) validationErrors.name = 'Name is required.';
        if (!currentPokemon.sprite) validationErrors.sprite = 'Sprite is required.';
        setErrors(validationErrors);
        return Object.keys(validationErrors).length === 0;
    };

    const handleAdd = () => {
        if (validatePokemon()) {
            try {
                const formattedPokemon = {
                    ...currentPokemon,
                    types: Array.isArray(currentPokemon.types)
                        ? currentPokemon.types
                        : currentPokemon.types.split(',').map((a) => a.trim()),
                    abilities: Array.isArray(currentPokemon.abilities)
                        ? currentPokemon.abilities
                        : currentPokemon.abilities.split(',').map((a) => a.trim()),
                    evolutions: Array.isArray(currentPokemon.evolutions)
                        ? currentPokemon.evolutions
                        : currentPokemon.evolutions.split(',').map((e) => e.trim()),
                };
                handleAddPokemon(formattedPokemon);
                setIsModalOpen(false);
                setCurrentPokemon({ id: '', name: '', sprite: '', largeImage: '', types: [], height: '', weight: '', abilities: [], evolutions: [] });
            } catch (error) {
                console.error('Error adding Pokémon:', error.message);
                alert('Error adding Pokémon: ' + error.message);
            }
        } else {
            alert('Please fill out all required fields!');
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
        navigate(`/pokemon/${pokemon.id}`);
    };

    if (loading) return <p className="text-center pt-5 text-gray-500">Loading...</p>;
    if (error) return <p className="text-center pt-5 text-red-500">{error}</p>;

    return (
        <div className="p-10">
            <h1 className="text-2xl font-bold text-center mb-6">Pokémon List</h1>
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
                                className="mx-auto w-24 h-24"
                            />
                            <p className="font-semibold text-md capitalize text-center">{pokemon.name}</p>
                            <div className="absolute top-2 right-2">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleEditClick(pokemon);
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
                    setCurrentPokemon({ id: '', name: '', types: [], sprite: '', largeImage: '', height: '', weight: '', abilities: [], evolutions: [] });
                    setIsModalOpen(true);
                }}
                className="fixed bottom-4 right-4 bg-yellow-500 text-white w-14 h-14 rounded-full shadow-lg hover:bg-yellow-600 transition flex items-center justify-center text-xl"
                aria-label="Add Pokémon"
            >
                +
            </button>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
                        <h2 className="text-lg font-bold mb-4">{isEditMode ? 'Edit Pokémon' : 'Add Pokémon'}</h2>
                        <div className="space-y-4">
                            {['id', 'name', 'types', 'sprite', 'largeImage', 'height', 'weight', 'abilities', 'evolutions'].map((field) => (
                                <div key={field}>
                                    <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                                        {field === 'abilities' || field === 'evolutions'
                                            ? `${field} (separate with commas)`
                                            : field}
                                    </label>
                                    <input
                                        type="text"
                                        placeholder={`Enter Pokémon ${field}`}
                                        value={Array.isArray(currentPokemon[field])
                                            ? currentPokemon[field].join(', ')
                                            : currentPokemon[field] || ''}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            setCurrentPokemon((prevState) => ({
                                                ...prevState,
                                                [field]: field === 'types' || field === 'abilities' || field === 'evolutions'
                                                    ? value.split(',').map((item) => item.trim())
                                                    : value,
                                            }));
                                        }}
                                        className={`border p-2 w-full ${errors[field] ? 'border-red-500' : ''}`}
                                    />
                                    {errors[field] && (
                                        <p className="text-red-500 text-sm">{errors[field]}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                        <div className="mt-4 flex justify-end space-x-2">
                            {isEditMode && (
                                <button
                                    onClick={() => {
                                        handleDeletePokemon(currentPokemon.id);
                                        setIsModalOpen(false);
                                        setIsEditMode(false);
                                    }}
                                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                >
                                    Delete
                                </button>
                            )}
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={isEditMode ? handleEdit : handleAdd}
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            >
                                {isEditMode ? 'Save' : 'Add'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PokemonList;

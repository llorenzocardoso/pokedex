import { useState, useEffect } from "react";
import usePokemons from "../hooks/usePokemon";
import { useNavigate } from "react-router-dom";

const PokemonList = () => {
    const navigate = useNavigate();
    const { pokemons, loading, error } = usePokemons();

    const [pokemonList, setPokemonList] = useState([]);
    const [newPokemon, setNewPokemon] = useState({ name: "", id: "", sprites: { front_default: "" } });
    const [errors, setErrors] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPokemonId, setSelectedPokemonId] = useState(null);

    useEffect(() => {
        setPokemonList(pokemons);
    }, [pokemons]);

    const validateForm = () => {
        const validationErrors = {};
        if (!newPokemon.name.trim()) validationErrors.name = "O nome é obrigatório.";
        if (!newPokemon.id.trim() || isNaN(newPokemon.id)) validationErrors.id = "ID deve ser um número.";
        if (!newPokemon.sprites.front_default.trim() || !/^https?:\/\//.test(newPokemon.sprites.front_default)) {
            validationErrors.sprites = "URL da imagem inválida.";
        }
        setErrors(validationErrors);
        return Object.keys(validationErrors).length === 0;
    };

    const handleAddPokemon = () => {
        if (validateForm()) {
            const newLocalPokemon = { ...newPokemon, isLocal: true };
            setPokemonList([...pokemonList, newLocalPokemon]);
            setNewPokemon({ name: "", id: "", sprites: { front_default: "" } });
            setErrors({});
            setIsModalOpen(false);
        }
    };

    const handleUpdatePokemon = (id) => {
        const updatedName = prompt("Digite o novo nome do Pokémon:");
        if (updatedName) {
            setPokemonList(
                pokemonList.map((pokemon) =>
                    pokemon.id === id ? { ...pokemon, name: updatedName } : pokemon
                )
            );
        }
    };

    const handleDeletePokemon = (id) => {
        setPokemonList(pokemonList.filter((pokemon) => pokemon.id !== id));
    };

    const handlePokemonClick = (pokemon) => {
        navigate(`/pokemon/${pokemon.name}`);
    };

    const closeMenu = () => setSelectedPokemonId(null);

    useEffect(() => {
        if (selectedPokemonId !== null) {
            const handleClickOutside = () => {
                closeMenu();
            };

            document.addEventListener("click", handleClickOutside);
            return () => {
                document.removeEventListener("click", handleClickOutside);
            };
        }
    }, [selectedPokemonId]);

    if (loading) return <p className="text-center pt-5 text-gray-500">Carregando...</p>;
    if (error) return <p className="text-center pt-5 text-red-500">{error}</p>;

    return (
        <div className="p-10">
            <h1 className="text-2xl font-bold text-center mb-6">Lista de Pokémons</h1>

            <ul className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {pokemonList.map((pokemon) => (
                    <li
                        key={pokemon.id}
                        className="p-3.5 bg-blue-200 rounded-xl shadow-xl hover:bg-gray-200 transition relative"
                        onClick={(e) => e.stopPropagation()} // Evita fechar ao clicar no menu
                    >
                        <div className="flex justify-between items-center">
                            <p className="font-bold text-xl">{pokemon.id}</p>
                            <img
                                onClick={() => handlePokemonClick(pokemon)}
                                src={pokemon.sprites.front_default}
                                alt={pokemon.name}
                                className="mx-auto"
                            />
                            <p className="font-semibold text-md capitalize text-center">{pokemon.name}</p>
                            <div className="absolute top-2 right-2">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation(); // Evita fechar ao clicar no botão
                                        setSelectedPokemonId(selectedPokemonId === pokemon.id ? null : pokemon.id);
                                    }}
                                    className="text-gray-500 hover:text-gray-800"
                                >
                                    &#x22EE;
                                </button>
                                {selectedPokemonId === pokemon.id && (
                                    <div className="absolute right-0 mt-2 bg-white shadow-lg rounded w-40 z-10">
                                        <button
                                            onClick={() => handleUpdatePokemon(pokemon.id)}
                                            className="block px-4 py-2 text-left w-full hover:bg-gray-100"
                                        >
                                            Editar
                                        </button>
                                        <button
                                            onClick={() => handleDeletePokemon(pokemon.id)}
                                            className="block px-4 py-2 text-left w-full hover:bg-gray-100 text-red-500"
                                        >
                                            Deletar
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </li>
                ))}
            </ul>

            <button
                onClick={() => setIsModalOpen(true)}
                className="fixed bottom-4 right-4 bg-yellow-500 text-white w-14 h-14 rounded-full shadow-lg hover:bg-yellow-600 transition flex items-center justify-center text-xl"
                aria-label="Adicionar Pokémon"
            >
                +
            </button>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
                        <h2 className="text-lg font-bold mb-4">Adicionar Pokémon</h2>
                        <div className="space-y-4">
                            <div>
                                <input
                                    type="text"
                                    placeholder="Nome"
                                    value={newPokemon.name}
                                    onChange={(e) => setNewPokemon({ ...newPokemon, name: e.target.value })}
                                    className={`border p-2 w-full ${errors.name ? "border-red-500" : ""}`}
                                />
                                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                            </div>
                            <div>
                                <input
                                    type="text"
                                    placeholder="ID"
                                    value={newPokemon.id}
                                    onChange={(e) => setNewPokemon({ ...newPokemon, id: e.target.value })}
                                    className={`border p-2 w-full ${errors.id ? "border-red-500" : ""}`}
                                />
                                {errors.id && <p className="text-red-500 text-sm">{errors.id}</p>}
                            </div>
                            <div>
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
                                    className={`border p-2 w-full ${errors.sprites ? "border-red-500" : ""}`}
                                />
                                {errors.sprites && <p className="text-red-500 text-sm">{errors.sprites}</p>}
                            </div>
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

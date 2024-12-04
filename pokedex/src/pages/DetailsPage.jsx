import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import usePokemon from "../hooks/usePokemon";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";

const DetailsPage = () => {
    const { id } = useParams();
    const { pokemons } = usePokemon();
    const [pokemon, setPokemon] = useState(null);
    const navigate = useNavigate();

    const getTypeColor = (type) => {
        const colors = {
            fire: 'bg-red-500 text-white',
            water: 'bg-blue-500 text-white',
            grass: 'bg-green-500 text-black',
            electric: 'bg-yellow-500 text-black',
            psychic: 'bg-pink-500 text-white',
            ice: 'bg-blue-200 text-black',
            dragon: 'bg-indigo-600 text-white',
            dark: 'bg-gray-700 text-white',
            fairy: 'bg-pink-400 text-black',
            normal: 'bg-gray-400 text-black',
            flying: 'bg-blue-300 text-black',
            bug: 'bg-green-600 text-white',
            rock: 'bg-gray-600 text-white',
            ground: 'bg-yellow-600 text-black',
            poison: 'bg-pink-400 text-white',
            fighting: 'bg-red-700 text-white',
            ghost: 'bg-indigo-900 text-white',
            steel: 'bg-gray-500 text-black',
        };
        return colors[type] || 'bg-gray-300';
    };

    const handleGoBack = () => {
        navigate(-1);
    };

    useEffect(() => {
        const foundPokemon = pokemons.find((p) => p.id === id);
        setPokemon(foundPokemon || null);
    }, [id, pokemons]);

    if (!pokemon) {
        return <p className="text-center pt-5 text-gray-500">Pokémon not found.</p>;
    }

    return (
        <div>
            <Header />

            <div className="min-h-screen bg-gray-100 p-4">
                {/* Botão de Voltar */}
                <button
                    onClick={handleGoBack}
                    className="absolute bg-yellow-500 text-white w-10 h-10 rounded-full shadow-lg hover:bg-yellow-600 transition"
                >
                    <span className="text-2xl">&lt;</span>
                </button>


                <div className="max-w-5xl mx-auto bg-white shadow-md rounded-md p-6">
                    {/* Header */}
                    <div className="text-center border-b border-gray-200 pb-6">
                        <h1 className="text-3xl font-bold capitalize">{pokemon.name}</h1>
                        <span className="text-gray-500">N°{pokemon.id}</span>
                        <div className="flex justify-center mb-6">
                            <img
                                src={pokemon.largeImage}
                                alt={pokemon.name}
                                className="w-96"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6 mt-6">
                        <div className="bg-gray-200 p-4 rounded-md">
                            <h2 className="text-xl font-semibold mb-4">General Information</h2>
                            <ul className="space-y-2">
                                <li className="flex justify-between items-center">
                                    <span className="font-semibold text-gray-700">Height:</span>
                                    <span className="text-gray-900">{(pokemon.height / 10).toFixed(1)} m</span>
                                </li>
                                <li className="flex justify-between items-center">
                                    <span className="font-semibold text-gray-700">Weight:</span>
                                    <span className="text-gray-900">{(pokemon.weight / 10).toFixed(1)} kg</span>
                                </li>
                                <li className="flex justify-between items-center">
                                    <span className="font-semibold text-gray-700">Base Experience:</span>
                                    <span className="text-gray-900">{pokemon.base_experience}</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-gray-200 p-4 rounded-md">
                            <h2 className="text-xl font-semibold mb-4">Abilities</h2>
                            <ul className="space-y-2">
                                {Array.isArray(pokemon.abilities) && pokemon.abilities.length > 0 ? (
                                    pokemon.abilities.map((ability, index) => (
                                        <li key={index} className="font-semibold text-gray-700 capitalize">
                                            {ability}
                                        </li>
                                    ))
                                ) : (
                                    <li className="text-gray-500">No abilities found.</li>
                                )}
                            </ul>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div className="bg-gray-200 p-4 rounded-md mt-6">
                            <h2 className="text-xl font-semibold mb-4">Evolutions</h2>
                            {pokemon.evolutions && pokemon.evolutions.length > 0 ? (
                                <div className="flex space-x-6">
                                    {pokemon.evolutions.map((evolution, index) => (
                                        <div key={index} className="text-center">
                                            <img
                                                src={evolution.sprite}
                                                alt={evolution.name}
                                                className="w-24 h-24 mb-2"
                                            />
                                            <p className="text-gray-900 capitalize">{evolution.name}</p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500">This Pokémon does not evolve.</p>
                            )}
                        </div>

                        <div className="p-4 rounded-md mt-6">
                            <h2 className="text-xl font-semibold mb-4">Types</h2>
                            <ul className="space-y-2">
                                {Array.isArray(pokemon.types) && pokemon.types.length > 0 ? (
                                    pokemon.types.map((type, index) => (
                                        <li
                                            key={index}
                                            className={`font-semibold w-fit px-3 py-1 rounded-lg capitalize ${getTypeColor(type)}`}
                                        >
                                            {type}
                                        </li>
                                    ))
                                ) : (
                                    <li className="text-gray-500">No types found.</li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailsPage;

import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import usePokemonDetails from '../hooks/usePokemonDetails';

const DetailsPage = () => {
    const { name } = useParams();
    const { pokemon, evolutions, weaknesses, loading, error } = usePokemonDetails(name);

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

    if (loading) return <p className="text-center text-gray-500 pt-5">Carregando...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;

    return (
        <div>
            <Header />
            <div className="bg-gray-100 p-4">
                <div className="max-w-5xl mx-auto bg-white shadow-md rounded-md">
                    {pokemon && (
                        <div className="p-6">
                            <div className="text-center mb-6">
                                <h1 className="text-3xl font-bold capitalize">{pokemon.name} <span className="text-gray-500">N°{pokemon.id}</span> </h1>
                            </div>
                            <div className="flex justify-center mb-6">
                                <img
                                    src={pokemon.sprites.other['official-artwork'].front_default}
                                    alt={pokemon.name}
                                    className="w-96"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div className="bg-gray-200 p-4 rounded-md">
                                    <h2 className="text-xl font-semibold mb-4">General Info</h2>
                                    <ul className="space-y-2">
                                        <li className="flex justify-between items-center">
                                            <span className="font-semibold text-gray-700">Height:</span>
                                            <span className="text-gray-900">{pokemon.height / 10} m</span>
                                        </li>
                                        <li className="flex justify-between items-center">
                                            <span className="font-semibold text-gray-700">Weight:</span>
                                            <span className="text-gray-900">{pokemon.weight / 10} kg</span>
                                        </li>
                                        <li className="flex justify-between items-center">
                                            <span className="font-semibold text-gray-700">Base Experience:</span>
                                            <span className="text-gray-900">{pokemon.base_experience}</span>
                                        </li>
                                    </ul>
                                </div>

                                <div className="bg-gray-200 p-4 rounded-md">
                                    <h2 className="text-2xl font-semibold">Abilities</h2>
                                    <ul className="list-disc list-inside">
                                        {pokemon.abilities.map((ability) => (
                                            <li key={ability.ability.name} className="capitalize">
                                                {ability.ability.name}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div className="mb-6 grid grid-cols-2 gap-4">
                                <div className='bg-gray-200 p-4 rounded-md'>
                                    <h2 className="text-2xl font-semibold">Stats</h2>
                                    <div className="grid gap-4">
                                        {pokemon.stats.map((stat) => (
                                            <div key={stat.stat.name} className="text-center">
                                                <p className="text-sm font-semibold capitalize">{stat.stat.name}</p>
                                                <div className="w-full h-2 bg-gray-300 rounded-md mt-1 relative">
                                                    <div
                                                        className="bg-green-500 h-full rounded-md"
                                                        style={{ width: `${stat.base_stat}%` }}
                                                    ></div>
                                                </div>
                                                <p className="text-xs">{stat.base_stat}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="pb-10 rounded-md">
                                    <h2 className="text-xl font-semibold mb-2">Type</h2>
                                    <div className="flex flex-wrap gap-2">
                                        {pokemon.types.map((type) => (
                                            <span
                                                key={type.type.name}
                                                className={`px-3 py-1 rounded-lg  font-medium capitalize ${getTypeColor(
                                                    type.type.name
                                                )}`}
                                            >
                                                {type.type.name}
                                            </span>
                                        ))}
                                    </div>

                                    <h2 className="text-xl font-semibold mb-2 pt-4">Weaknesses</h2>
                                    <div className="flex flex-wrap gap-2">
                                        {weaknesses.map((weakness) => (
                                            <span
                                                key={weakness}
                                                className={`px-3 py-1 rounded-lg font-medium capitalize ${getTypeColor(
                                                    weakness
                                                )}`}
                                            >
                                                {weakness}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="mb-6">
                                <h2 className="text-2xl font-semibold">Evolutions</h2>
                                <div className="flex items-center gap-4">
                                    {evolutions.map((evolution) => (
                                        <div key={evolution.id} className="text-center">
                                            <img
                                                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${evolution.id}.png`}
                                                alt={evolution.name}
                                                className="w-24 h-24 mx-auto"
                                            />
                                            <p className="capitalize">{evolution.name}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DetailsPage;

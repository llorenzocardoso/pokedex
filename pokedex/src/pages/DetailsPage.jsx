import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import usePokemonDetails from '../hooks/usePokemonDetails';
import PokemonImage from '../components/PokemonImage';
import GeneralInfo from '../components/GeneralInfo';
import Abilities from '../components/Abilities';
import Stats from '../components/Stats';
import TypeWeakness from '../components/TypeWeakness';
import Evolution from '../components/Evolution';

const DetailsPage = () => {
    const { name } = useParams();
    const { pokemon, evolutions, weaknesses, loading, error } = usePokemonDetails(name);

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
                                <h1 className="text-3xl font-bold capitalize">
                                    {pokemon.name} <span className="text-gray-500">N°{pokemon.id}</span>
                                </h1>
                            </div>
                            <PokemonImage imageUrl={pokemon.sprites.other['official-artwork'].front_default} name={pokemon.name} />
                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <GeneralInfo height={pokemon.height} weight={pokemon.weight} experience={pokemon.base_experience} />
                                <Abilities abilities={pokemon.abilities} />
                            </div>
                            <div className="mb-6 grid grid-cols-2 gap-4">
                                <Stats stats={pokemon.stats} />
                                <TypeWeakness types={pokemon.types} weaknesses={weaknesses} />
                            </div>
                            <Evolution evolutions={evolutions} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DetailsPage;

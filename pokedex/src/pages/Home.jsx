import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-yellow-300 flex items-start justify-center px-8 pt-52">
            <div className="flex items-start justify-center gap-16">
                <div className="flex flex-col items-start justify-center max-w-md">
                    <h1 className="text-5xl font-bold text-black">
                        <span className="block">Find</span> all your favorite{' '}
                        <span className="text-red-600">Pokemon</span>
                    </h1>
                    <p className="text-lg text-gray-800 mt-4">
                        You can know the type of Pokemon, its strengths, disadvantages, and
                        abilities
                    </p>
                    <button
                        onClick={() => navigate('/pokedex')}
                        className="mt-6 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-green-600"
                    >
                        See pokemons
                    </button>
                </div>

                <div className="flex items-center justify-center">
                    <img
                        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png"
                        alt="Pikachu"
                        className="w-80 h-80 object-contain"
                    />
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Home;

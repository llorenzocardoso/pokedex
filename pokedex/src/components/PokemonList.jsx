// src/components/PokemonList.jsx
import usePokemons from '../hooks/usePokemon';

const PokemonList = () => {
  const { pokemons, loading, error } = usePokemons();

  if (loading) return <p className="text-center text-gray-500">Carregando...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold text-center mb-6">Lista de Pokémons</h1>
      <ul className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {pokemons.map((pokemon) => (
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
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PokemonList;

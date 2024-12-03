import { useParams } from "react-router-dom";
import { useState } from "react";
import Header from "../components/Header";
import usePokemonDetails from "../hooks/usePokemonDetails";
import PokemonImage from "../components/PokemonImage";
import GeneralInfo from "../components/GeneralInfo";
import Abilities from "../components/Abilities";
import Stats from "../components/Stats";
import TypeWeakness from "../components/TypeWeakness";
import Evolution from "../components/Evolution";
import { FaEdit, FaCheck } from "react-icons/fa";

const DetailsPage = () => {
  const { name } = useParams();
  const { pokemon, evolutions, weaknesses, loading, error } = usePokemonDetails(name);
  const [isEditing, setIsEditing] = useState(false);
  const [editableName, setEditableName] = useState("");

  const handleEditClick = () => {
    setIsEditing(true);
    setEditableName(pokemon.name);
  };

  const handleSave = () => {
    console.log("Novo nome do Pokémon:", editableName);
    pokemon.name = editableName; // Atualiza o nome localmente
    setIsEditing(false);
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
              <div className="relative text-center mb-6">
                <div className="flex items-center justify-center gap-2">
                  {isEditing ? (
                    <input
                      type="text"
                      value={editableName}
                      onChange={(e) => setEditableName(e.target.value)}
                      className="border-b-2 border-gray-300 text-3xl font-bold capitalize text-center focus:outline-none focus:border-blue-500"
                    />
                  ) : (
                    <h1 className="text-3xl font-bold capitalize">
                      {pokemon.name}
                    </h1>
                  )}
                  {/* Mostrar o ícone de editar ou salvar dependendo do estado de edição */}
                  <button
                    onClick={isEditing ? handleSave : handleEditClick}
                    className="text-gray-500 hover:text-gray-800 transition"
                    aria-label={isEditing ? "Salvar" : "Editar nome"}
                  >
                    {isEditing ? <FaCheck /> : <FaEdit />}
                  </button>
                </div>
                <span className="text-gray-500">N°{pokemon.id}</span>
              </div>
              <PokemonImage
                imageUrl={pokemon.sprites.other["official-artwork"].front_default}
                name={pokemon.name}
              />
              <div className="grid grid-cols-2 gap-4 mb-6">
                <GeneralInfo
                  height={pokemon.height}
                  weight={pokemon.weight}
                  experience={pokemon.base_experience}
                />
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

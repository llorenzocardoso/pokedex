import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url'; // Necessário para resolver caminhos em ES Modules
import { fetchPokemonList, fetchPokemonDetails } from './src/data/api.js';

const populateDatabase = async () => {
  try {
    const limit = 151; // Número de Pokémons que você deseja popular
    console.log('Buscando lista de Pokémons...');
    const pokemonList = await fetchPokemonList(limit);

    console.log('Buscando detalhes de cada Pokémon...');
    const detailedPokemonList = await Promise.all(
      pokemonList.map(async (pokemon) => {
        const details = await fetchPokemonDetails(pokemon.url);
        return {
          id: details.id,
          name: details.name,
          types: details.types.map((type) => type.type.name),
          sprite: details.sprites.front_default,
          height: details.height,
          weight: details.weight,
        };
      })
    );

    const dbData = {
      pokemons: detailedPokemonList,
    };

    // Resolve o caminho para salvar o db.json no diretório atual
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const filePath = path.resolve(__dirname, 'db.json');

    console.log('Salvando dados no db.json...');
    fs.writeFileSync(filePath, JSON.stringify(dbData, null, 2));

    console.log('db.json criado com sucesso!');
  } catch (error) {
    console.error('Erro ao popular o banco:', error.message);
  }
};

populateDatabase();

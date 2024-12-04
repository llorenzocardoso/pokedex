import axios from 'axios';
import fs from 'fs';

const POKE_API_URL = 'https://pokeapi.co/api/v2/pokemon/';
const OUTPUT_FILE = './db.json';

async function fetchPokemonData(pokemonId) {
    try {
        const { data } = await axios.get(`${POKE_API_URL}${pokemonId}`);

        const types = data.types.map((typeInfo) => typeInfo.type.name);

        const abilities = data.abilities.map((abilityInfo) => abilityInfo.ability.name);

        const speciesData = await axios.get(data.species.url);
        const evolutionChainData = await axios.get(speciesData.data.evolution_chain.url);
        const evolutions = await extractEvolutionsWithImages(evolutionChainData.data.chain);

        return {
            id: data.id,
            name: data.name,
            types,
            sprite: data.sprites.front_default,
            largeImage: data.sprites.other['official-artwork'].front_default,
            height: data.height,
            weight: data.weight,
            abilities,
            evolutions,
        };
    } catch (error) {
        console.error(`Erro ao buscar dados do Pokémon com ID ${pokemonId}:`, error.message);
        return null;
    }
}

async function extractEvolutionsWithImages(chain) {
    const evolutions = [];
    let current = chain;

    while (current) {
        const speciesName = current.species.name;

        try {
            const speciesData = await axios.get(`${POKE_API_URL}${speciesName}`);
            const sprite = speciesData.data.sprites.front_default;

            evolutions.push({
                name: speciesName,
                sprite,
            });
        } catch (error) {
            console.error(`Erro ao buscar imagem da evolução ${speciesName}:`, error.message);
            evolutions.push({ name: speciesName, sprite: null });
        }

        current = current.evolves_to[0];
    }

    return evolutions;
}

async function populateDb(pokemonIds) {
    const allPokemonData = [];

    for (const id of pokemonIds) {
        console.log(`Buscando dados para o Pokémon ID ${id}...`);
        const pokemonData = await fetchPokemonData(id);

        if (pokemonData) {
            allPokemonData.push(pokemonData);
        }
    }

    let existingData = [];
    if (fs.existsSync(OUTPUT_FILE)) {
        const rawData = fs.readFileSync(OUTPUT_FILE, 'utf-8');
        existingData = rawData.trim() ? JSON.parse(rawData) : [];
    } else {
        console.log(`Arquivo ${OUTPUT_FILE} não encontrado. Criando um novo.`);
        fs.writeFileSync(OUTPUT_FILE, '[]');
    }

    fs.writeFileSync(OUTPUT_FILE, JSON.stringify([...existingData, ...allPokemonData], null, 2));
    console.log(`Dados salvos em ${OUTPUT_FILE}`);
}

const pokemonIds = Array.from({ length: 151 }, (_, index) => index + 1);

populateDb(pokemonIds);

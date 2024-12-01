const API_BASE_URL = 'https://pokeapi.co/api/v2';

export const fetchPokemonList = async (limit = 151) => {
    const response = await fetch(`${API_BASE_URL}/pokemon?limit=${limit}`);
    const data = await response.json();
    return data.results;
};

export const fetchPokemonDetails = async (url) => {
    const response = await fetch(url);
    return await response.json();
};

export const getWeaknessesFromType = async (types) => {
    const weaknessesSet = new Set();

    for (const type of types) {
        const typeName = type.type.name;
        const typeData = await fetch(`https://pokeapi.co/api/v2/type/${typeName}`).then(res => res.json());
        const weakTypes = typeData.damage_relations.double_damage_from;
        weakTypes.forEach(weakness => weaknessesSet.add(weakness.name));
    }

    return [...weaknessesSet];
};

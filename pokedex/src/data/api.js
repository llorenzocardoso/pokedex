const API_URL = 'http://localhost:3000/pokemons';

export const getPokemons = async () => {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error(`Erro ao buscar Pokémons: ${response.statusText}`);

        const pokemons = await response.json();
        return pokemons.sort((a, b) => a.id - b.id);
    } catch (error) {
        throw new Error(error.message || 'Erro desconhecido ao buscar Pokémons');
    }
};

export const addPokemon = async (pokemon) => {
    const { id, name, types, sprite, height, weight, abilities, evolutions, largeImage } = pokemon;

    if (!id || !name || !types || !sprite || !height || !weight || !abilities || !evolutions || !largeImage) {
        throw new Error('Dados incompletos para adicionar um Pokémon');
    }

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(pokemon),
        });

        if (!response.ok) throw new Error(`Erro ao adicionar Pokémon: ${response.statusText}`);
    } catch (error) {
        throw new Error(error.message || 'Erro desconhecido ao adicionar Pokémon');
    }
};

export const editPokemon = async (id, pokemon) => {
    const { name, types, sprite, height, weight, abilities, evolutions, largeImage } = pokemon;

    if (!name || !types || !sprite || !height || !weight || !abilities || !evolutions || !largeImage) {
        throw new Error('Dados incompletos para editar o Pokémon');
    }

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(pokemon),
        });

        if (!response.ok) throw new Error(`Erro ao editar Pokémon: ${response.statusText}`);
    } catch (error) {
        throw new Error(error.message || 'Erro desconhecido ao editar Pokémon');
    }
};


export const deletePokemon = async (id) => {
    try {
        const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });

        if (!response.ok) throw new Error(`Erro ao deletar Pokémon: ${response.statusText}`);
    } catch (error) {
        throw new Error(error.message || 'Erro desconhecido ao deletar Pokémon');
    }
};

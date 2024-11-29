import PropTypes from "prop-types";

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

const TypeWeakness = ({ types, weaknesses }) => (
    <div className="pb-10 rounded-md">
        <h2 className="text-xl font-semibold mb-2">Type</h2>
        <div className="flex flex-wrap gap-2">
            {types.map((type) => (
                <span
                    key={type.type.name}
                    className={`px-3 py-1 rounded-lg  font-medium capitalize ${getTypeColor(type.type.name)}`}
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
                    className={`px-3 py-1 rounded-lg font-medium capitalize ${getTypeColor(weakness)}`}
                >
                    {weakness}
                </span>
            ))}
        </div>
    </div>
);

TypeWeakness.propTypes = {
    types: PropTypes.array.isRequired,
    weaknesses: PropTypes.array.isRequired,
};

export default TypeWeakness;

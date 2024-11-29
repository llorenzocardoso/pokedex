import PropTypes from 'prop-types';

const Abilities = ({ abilities }) => (
    <div className="bg-gray-200 p-4 rounded-md">
        <h2 className="text-2xl font-semibold">Abilities</h2>
        <ul className="list-disc list-inside">
            {abilities.map((ability) => (
                <li key={ability.ability.name} className="capitalize">
                    {ability.ability.name}
                </li>
            ))}
        </ul>
    </div>
);

Abilities.propTypes = {
    abilities: PropTypes.array.isRequired,
};

export default Abilities;

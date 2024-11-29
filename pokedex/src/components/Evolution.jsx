import PropTypes from "prop-types";

const Evolution = ({ evolutions }) => (
    <div className="mb-6">
        <h2 className="text-2xl font-semibold">Evolutions</h2>
        <div className="flex items-center gap-4">
            {evolutions.map((evolution) => (
                <div key={evolution.id} className="text-center">
                    <img
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${evolution.id}.png`}
                        alt={evolution.name}
                        className="w-24 h-24 mx-auto"
                    />
                    <p className="capitalize">{evolution.name}</p>
                </div>
            ))}
        </div>
    </div>
);

Evolution.propTypes = {
    evolutions: PropTypes.array.isRequired,
};

export default Evolution;

import PropTypes from 'prop-types';

const PokemonImage = ({ imageUrl, name }) => (
    <div className="flex justify-center mb-6">
        <img src={imageUrl} alt={name} className="w-96" />
    </div>
);

PokemonImage.propTypes = {
    imageUrl: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
};


export default PokemonImage;

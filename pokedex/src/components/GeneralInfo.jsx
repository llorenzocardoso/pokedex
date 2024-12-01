import PropTypes from 'prop-types';


const GeneralInfo = ({ height, weight, experience }) => (
    <div className="bg-gray-200 p-4 rounded-md">
        <h2 className="text-xl font-semibold mb-4">General Info</h2>
        <ul className="space-y-2">
            <li className="flex justify-between items-center">
                <span className="font-semibold text-gray-700">Height:</span>
                <span className="text-gray-900">{height / 10} m</span>
            </li>
            <li className="flex justify-between items-center">
                <span className="font-semibold text-gray-700">Weight:</span>
                <span className="text-gray-900">{weight / 10} kg</span>
            </li>
            <li className="flex justify-between items-center">
                <span className="font-semibold text-gray-700">Base Experience:</span>
                <span className="text-gray-900">{experience}</span>
            </li>
        </ul>
    </div>
);

GeneralInfo.propTypes = {
    height: PropTypes.number.isRequired,
    weight: PropTypes.number.isRequired,
    experience: PropTypes.number.isRequired,
};

export default GeneralInfo;

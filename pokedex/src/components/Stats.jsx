import PropTypes from 'prop-types';

const Stats = ({ stats }) => (
    <div className="bg-gray-200 p-4 rounded-md">
        <h2 className="text-2xl font-semibold">Stats</h2>
        <div className="grid gap-4">
            {stats.map((stat) => (
                <div key={stat.stat.name} className="text-center">
                    <p className="text-sm font-semibold capitalize">{stat.stat.name}</p>
                    <div className="w-full h-2 bg-gray-300 rounded-md mt-1 relative">
                        <div
                            className="bg-green-500 h-full rounded-md"
                            style={{ width: `${stat.base_stat}%` }}
                        ></div>
                    </div>
                    <p className="text-xs">{stat.base_stat}</p>
                </div>
            ))}
        </div>
    </div>
);

Stats.propTypes = {
    stats: PropTypes.array.isRequired,
};

export default Stats;

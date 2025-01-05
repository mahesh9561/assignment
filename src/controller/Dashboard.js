import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, addRecentSearch, setWeather } from '../store/dataSlice';

function Dashboard() {
    const [city, setCity] = useState('');
    const [error, setError] = useState('');
    const [weather, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const favorite = useSelector(state => state.data.favorites);
    const recentSearches = useSelector(state => state.data.recentSearches);
    console.log(recentSearches)
    useEffect(() => {
        if (city.trim()) {
            dispatch(addRecentSearch(city));
        }
    }, [city, dispatch]);

    const fetchWeatherData = async () => {
        try {
            setLoading(true);
            setError('');
            const apiKey = 'f8e2678a637f76bb77220e00374ef826';
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
            const response = await axios.get(url);
            const data = response.data;

            setWeatherData(data);
            dispatch(setWeather(data));
        } catch (error) {
            setError('City not found or an error occurred while fetching data.');
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = () => {
        if (city.trim()) {
            fetchWeatherData();
        } else {
            setError('Please enter a city name.');
        }
    };

    const handleFavorite = (weather) => {
        dispatch(addFavorite(weather));
    };

    return (
        <div className='flex justify-center items-center h-screen'>
            <div className='border p-5 shadow-lg w-1/2'>
                <div>
                    <h1>Weather Dashboard</h1>
                    <input
                        className='px-2 py-2 border w-1/2 mx-2'
                        type="text"
                        placeholder="Search"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                    <button
                        type="button"
                        onClick={handleSearch}
                        className='px-4 py-2 bg-blue-500 text-white'
                    >
                        Search
                    </button>
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <div>
                    {loading ? (
                        <p>Loading weather data...</p> 
                    ) : (
                        weather && (
                            <table className="table-auto border-collapse border border-gray-400 w-full my-5">
                                <thead>
                                    <tr>
                                        <th className="border border-gray-300 px-4 py-2">Property</th>
                                        <th className="border border-gray-300 px-4 py-2">Value</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="border border-gray-300 px-4 py-2">City Name</td>
                                        <td className="border border-gray-300 px-4 py-2">{weather.name}</td>
                                    </tr>
                                    <tr>
                                        <td className="border border-gray-300 px-4 py-2">Temperature</td>
                                        <td className="border border-gray-300 px-4 py-2">{(weather.main.temp - 273.15).toFixed(2)} °C</td>
                                    </tr>
                                    <tr>
                                        <td className="border border-gray-300 px-4 py-2">Weather</td>
                                        <td className="border border-gray-300 px-4 py-2">{weather.weather[0].description}</td>
                                    </tr>
                                    <tr>
                                        <td className="border border-gray-300 px-4 py-2">Humidity</td>
                                        <td className="border border-gray-300 px-4 py-2">{weather.main.humidity}%</td>
                                    </tr>
                                    <tr>
                                        <td className="border border-gray-300 px-4 py-2">Wind Speed</td>
                                        <td className="border border-gray-300 px-4 py-2">{weather.wind.speed} m/s</td>
                                    </tr>
                                    <tr>
                                        <td className="border border-gray-300 px-4 py-2">Sunrise</td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            {new Date(weather.sys.sunrise * 1000).toLocaleTimeString()}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="border border-gray-300 px-4 py-2">Sunset</td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            {new Date(weather.sys.sunset * 1000).toLocaleTimeString()}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan="2" className="border border-gray-300 px-4 py-2 text-center">
                                            <button
                                                type="button"
                                                onClick={() => handleFavorite(weather)}
                                                className="px-4 py-2 bg-green-500 text-white"
                                            >
                                                Add Favorite
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        )
                    )}
                </div>
                <div>
                    <h1>Favorites</h1>
                    {favorite.length > 0 ? (
                        favorite.map((item, index) => (
                            <div key={index}>
                                <h1>{item.name}</h1>
                            </div>
                        ))
                    ) : (
                        <p>No favorites added yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;

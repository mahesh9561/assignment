import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, addRecentSearch, setWeather } from '../store/dataSlice';

function Dashboard() {
    const [city, setCity] = useState('');
    const [error, setError] = useState('');
    const [weather, setWeatherData] = useState(null);

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
            setError('');
            const apiKey = 'f8e2678a637f76bb77220e00374ef826';
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
            const response = await axios.get(url);
            const data = response.data;

            setWeatherData(data);
            dispatch(setWeather(data));
        } catch (error) {
            setError('City not found or an error occurred while fetching data.');
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
                    {weather && (
                        <div>
                            <h2>City Name: {weather.name}</h2>
                            <p>Temperature: {(weather.main.temp - 273.15).toFixed(2)} °C</p>
                            <p>Weather: {weather.weather[0].description}</p>
                            <p>Humidity: {weather.main.humidity}%</p>
                            <p>Wind Speed: {weather.wind.speed} m/s</p>
                            <p>
                                Sunrise: {new Date(weather.sys.sunrise * 1000).toLocaleTimeString()}
                            </p>
                            <p>
                                Sunset: {new Date(weather.sys.sunset * 1000).toLocaleTimeString()}
                            </p>
                            <button
                                type="button"
                                onClick={() => handleFavorite(weather)}
                                className='px-4 py-2 bg-green-500 text-white'
                            >
                                Add Favorite
                            </button>
                        </div>
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

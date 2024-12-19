import { useState, useEffect } from 'react';
import axios from 'axios';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const Sidebar = ({ setLocation, Location }) => {
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState(null);


    const fetchWeather = async () => {
        const apikey = "5fffd1a89d9ac00b3f571ea63f552d99";
        try {
            // Fire weather API It is used for forecast data 5 days 
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
                params: {
                    lon: Location.longitude,
                    lat: Location.latitude,
                    appid: apikey,
                    units: "metric",
                },
            });
            console.log("weather", response.data.main)
            setWeather(response.data);
            // console.log(" sunrise", response.data);
        } catch (err) {
            console.error('Error fetching weather:', err);
            setError('Unable to fetch weather data.');
        }
    };

    useEffect(() => {
        if (Location.latitude && Location.longitude) {
            fetchWeather();
        }
    }, [Location]);

    return (
        <>
            {error && <p className="text-red-500">{error}</p>}
            {weather ? (
                <div className=' px-4 w-full'>
                    <div className="bg-[#330000] p-4 rounded-xl  ">
                        <div className='flex justify-between'>
                            <h2 className='text-lg  text-white'>Now</h2>
                            <p className='text-sm  text-white'>{weather.weather[0]?.description}</p>
                        </div>

                        <div className='flex justify-between mt-4'>
                            <p className='text-2xl  text-white'>{weather.main.temp}°C</p>
                            <img
                                src={`http://openweathermap.org/img/wn/${weather?.weather[0]?.icon}@2x.png`}
                                alt="Weather Icon" className='w-12 h-12'
                            />
                        </div>

                        <div className='flex justify-between'>
                            <p className='text-lg  text-white text-[10px]'>Wind Speed: {weather.wind.speed} m/s</p>
                            <p className='text-lg  text-white text-[10px]'>Humidity: {weather.main.humidity}%</p>

                        </div>
                        <hr className='mt-4'></hr>
                        <p className='text-white text-[10px] mt-4'><CalendarMonthIcon/> {new Date().toDateString()}</p>
                        <p className='text-white text-sm'>{weather.name}</p>
                    </div>
                    <h4 className='text-sm text-white justify-center text-center mt-2'>5 Day Forecast</h4>
                    <div className='bg-[#330000] p-4 rounded-xl mt-2'>
                        <table className="w-full">
                            <thead>
                                <tr>
                                    <td><img
                                src={`http://openweathermap.org/img/wn/${weather?.weather[0]?.icon}@2x.png`}
                                alt="Weather Icon" className='w-8 h-8'
                            /></td>
                                    <td className='text-sm text-white'>{weather.main.temp}°</td>
                                    <td className='text-sm text-white'>W:{weather.wind.speed} M/S</td>
                                    <td className='text-sm text-white'>H:{weather.main.humidity}%</td>
                                </tr>
                                <tr>
                                    <td><img
                                src={`http://openweathermap.org/img/wn/${weather?.weather[0]?.icon}@2x.png`}
                                alt="Weather Icon" className='w-8 h-8'
                            /></td>
                                    <td className='text-sm text-white'>{weather.main.temp}°</td>
                                    <td className='text-sm text-white'>W:{weather.wind.speed} M/S</td>
                                    <td className='text-sm text-white'>H:{weather.main.humidity}%</td>
                                </tr>
                                <tr>
                                    <td><img
                                src={`http://openweathermap.org/img/wn/${weather?.weather[0]?.icon}@2x.png`}
                                alt="Weather Icon" className='w-8 h-8'
                            /></td>
                                    <td className='text-sm text-white'>{weather.main.temp}°</td>
                                    <td className='text-sm text-white'>W:{weather.wind.speed} M/S</td>
                                    <td className='text-sm text-white'>H:{weather.main.humidity}%</td>
                                </tr>
                              
                                <tr>
                                    <td><img
                                src={`http://openweathermap.org/img/wn/${weather?.weather[0]?.icon}@2x.png`}
                                alt="Weather Icon" className='w-8 h-8'
                            /></td>
                                    <td className='text-sm text-white'>{weather.main.temp}°</td>
                                    <td className='text-sm text-white'>W:{weather.wind.speed} M/S</td>
                                    <td className='text-sm text-white'>H:{weather.main.humidity}%</td>
                                </tr>
                                <tr>
                                    <td><img
                                src={`http://openweathermap.org/img/wn/${weather?.weather[0]?.icon}@2x.png`}
                                alt="Weather Icon" className='w-8 h-8'
                            /></td>
                                    <td className='text-sm text-white'>{weather.main.temp}°</td>
                                    <td className='text-sm text-white'>W:{weather.wind.speed} M/S</td>
                                    <td className='text-sm text-white'>H:{weather.main.humidity}%</td>
                                </tr>
                            </thead>
                        </table>

                    </div>
                </div>

            ) : (
                <p>Loading weather data...</p>
            )}


        </>
    );
};

export default Sidebar;
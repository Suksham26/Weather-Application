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
                <div className=' px-1 w-[100%] lg:w-full'>
                    <div className="bg-[#330000] p-4 rounded-xl  ">
                        <div className='flex justify-between'>
                            <h2 className='text-[10px] lg:text-base  text-white'>Now</h2>
                            <p className='text-sm  text-white'>{weather.weather[0]?.description}</p>
                        </div>

                        <div className='flex justify-between mt-4 '>
                            <p className='text-[10px] lg:text-2xl  text-white'>{weather.main.temp}°C</p>
                            <img
                                src={`http://openweathermap.org/img/wn/${weather?.weather[0]?.icon}@2x.png`}
                                alt="Weather Icon" className='w-8 h-18 lg:w-12 lg:h-12'
                            />
                        </div>

                        <div className='flex justify-between'>
                            <p className=' text-[8px] text-white lg:text-[12px]'>Wind Speed: {weather.wind.speed} m/s</p>
                            <p className=' text-[8px] text-white lg:text-[12px]'>Humidity: {weather.main.humidity}%</p>

                        </div>
                        <hr className='mt-4'></hr>
                        <p className='text-white text-[8px] lg:text-[12px] mt-4'><CalendarMonthIcon style={{ fontSize: 14 }}/> {new Date().toDateString()}</p>
                        <p className='text-white text-sm'>{weather.name}</p>
                    </div>
                    <h4 className='text-[8px] lg:text-sm text-white justify-center text-center mt-2'>5 Day Forecast</h4>
                    <div className='bg-[#330000] p-1 lg:p-4 rounded-xl mt-2'>
                        <table className="w-full">
                            <thead>
                                <tr>
                                    <td><img
                                src={`http://openweathermap.org/img/wn/${weather?.weather[0]?.icon}@2x.png`}
                                alt="Weather Icon" className='lg:w-8 lg:h-8 md:w-5 md:h-5 w-3 h-3'
                            /></td>
                                    <td className='lg:text-sm md:text-xs text-white text-[8px]'>{weather.main.temp}°</td>
                                    <td className='lg:text-sm md:text-xs text-white text-[8px]'>W:{weather.wind.speed}m/s</td>
                                    <td className='lg:text-sm md:text-xs text-white   text-[8px]'>H:{weather.main.humidity}%</td>
                                </tr>
                                <tr>
                                    <td><img
                                src={`http://openweathermap.org/img/wn/${weather?.weather[0]?.icon}@2x.png`}
                                alt="Weather Icon" className='lg:w-8 lg:h-8 md:w-5 md:h-5 w-3 h-3'
                            /></td>
                                    <td className='lg:text-sm md:text-xs text-white text-[8px]'>{weather.main.temp}°</td>
                                    <td className='lg:text-sm md:text-xs text-white text-[8px]'>W:{weather.wind.speed}m/s</td>
                                    <td className='lg:text-sm md:text-xs text-white   text-[8px]'>H:{weather.main.humidity}%</td>
                                </tr>
                                <tr>
                                    <td><img
                                src={`http://openweathermap.org/img/wn/${weather?.weather[0]?.icon}@2x.png`}
                                alt="Weather Icon" className='lg:w-8 lg:h-8 md:w-5 md:h-5 w-3 h-3'
                            /></td>
                                    <td className='lg:text-sm md:text-xs text-white text-[8px]'>{weather.main.temp}°</td>
                                    <td className='lg:text-sm md:text-xs text-white text-[8px]'>W:{weather.wind.speed}m/s</td>
                                    <td className='lg:text-sm md:text-xs text-white   text-[8px]'>H:{weather.main.humidity}%</td>
                                </tr><tr>
                                    <td><img
                                src={`http://openweathermap.org/img/wn/${weather?.weather[0]?.icon}@2x.png`}
                                alt="Weather Icon" className='lg:w-8 lg:h-8 md:w-5 md:h-5 w-3 h-3'
                            /></td>
                                    <td className='lg:text-sm md:text-xs text-white text-[8px]'>{weather.main.temp}°</td>
                                    <td className='lg:text-sm md:text-xs text-white text-[8px]'>W:{weather.wind.speed}m/s</td>
                                    <td className='lg:text-sm md:text-xs text-white   text-[8px]'>H:{weather.main.humidity}%</td>
                                </tr>
                              
                                <tr>
                                    <td><img
                                src={`http://openweathermap.org/img/wn/${weather?.weather[0]?.icon}@2x.png`}
                                alt="Weather Icon" className='lg:w-8 lg:h-8 md:w-5 md:h-5 w-3 h-3'
                            /></td>
                                    <td className='lg:text-sm md:text-xs text-white text-[8px]'>{weather.main.temp}°</td>
                                    <td className='lg:text-sm md:text-xs text-white text-[8px]'>W:{weather.wind.speed}m/s</td>
                                    <td className='lg:text-sm md:text-xs text-white   text-[8px]'>H:{weather.main.humidity}%</td>
                                </tr>
                                <tr>
                                    <td><img
                                src={`http://openweathermap.org/img/wn/${weather?.weather[0]?.icon}@2x.png`}
                                alt="Weather Icon" className='lg:w-8 lg:h-8 md:w-5 md:h-5 w-3 h-3'
                            /></td>
                                    <td className='lg:text-sm md:text-xs text-white text-[8px]'>{weather.main.temp}°</td>
                                    <td className='lg:text-sm md:text-xs text-white text-[8px]'>W:{weather.wind.speed}m/s</td>
                                    <td className='lg:text-sm md:text-xs text-white   text-[8px]'>H:{weather.main.humidity}%</td>
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
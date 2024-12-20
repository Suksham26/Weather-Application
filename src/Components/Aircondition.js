import { useState, useEffect } from "react";
import AirIcon from "@mui/icons-material/Air";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import NightlightRoundIcon from "@mui/icons-material/NightlightRound";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";
import TireRepairIcon from "@mui/icons-material/TireRepair";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import axios from "axios";

const Aircondition = ({ setLocation, Location }) => {
    const [Airvalue, setAirvalue] = useState(null);
    const [error, setError] = useState(null);
    const [Sunrise, setSunrise] = useState(null);
    const [Sunset, setSunset] = useState(null);

    // Fetch Air Quality Data
    const FetchAir = async () => {
        const apikey = "5fffd1a89d9ac00b3f571ea63f552d99";
        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/air_pollution`,
                {
                    params: {
                        lon: Location.longitude,
                        lat: Location.latitude,
                        appid: apikey,
                    },
                }
            );
            setAirvalue(response.data);
        } catch (err) {
            console.error("Error fetching air data:", err);
            setError("Unable to fetch Air data.");
        }
    };

    // Fetch Sunrise and Sunset Data
    const fetchSunset = async () => {
        const apikey = "5fffd1a89d9ac00b3f571ea63f552d99";
        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather`,
                {
                    params: {
                        lon: Location.longitude,
                        lat: Location.latitude,
                        appid: apikey,
                        units: "metric",
                    },
                }
            );
            console.log("new api", response.data);
            setSunrise(response.data);
            setSunset(response.data);
        } catch (err) {
            console.error("Error fetching weather:", err);
            setError("Unable to fetch weather data.");
        }
    };

    // Convert timestamp to readable time
    const timestamp = (time) => {
        const date = new Date(time * 1000);
        return date.toLocaleTimeString();
    };

    useEffect(() => {
        if (Location.latitude && Location.longitude) {
            FetchAir();
            fetchSunset();
        }
    }, [Location]);

    return (
        <>
            {error && <p className="text-red-500">{error}</p>}
            {Airvalue ? (
                <div className="bg-[#330000] lg:px-8 pt-4 px-2 lg:py-4 py-1 lg:pb-14  w-full rounded-xl">
                    <h1 className="text-white lg:text-sm md:text-xs text-[10px]">Today Highlights</h1>
                    <div className="bg-black lg:px-4 lg:py-2 px-2 py-1 rounded-xl lg:mt-3 mt-1">
                        <div className="flex justify-between">
                            <p className="text-white text-[12px] sm:text-sm lg:text-lg ">AQI</p>
                            {Airvalue?.list[0]?.main.aqi === 5 && (
                                <p className="text-white text-[10px] bg-violet-600 rounded-2xl px-2 py-1 lg:px-3 ">
                                    Very Poor
                                </p>
                            )}
                            {Airvalue?.list[0]?.main.aqi === 4 && (
                                <p className="text-white text-[10px] bg-violet-600 rounded-2xl px-2 py-1 lg:px-3">
                                    Poor
                                </p>
                            )}
                            {Airvalue?.list[0]?.main.aqi === 3 && (
                                <p className="text-white text-[10px] bg-violet-600 rounded-2xl px-2 py-1 lg:px-3">
                                    Moderate
                                </p>
                            )}
                            {Airvalue?.list[0]?.main.aqi === 2 && (
                                <p className="text-white text-[10px] bg-violet-600 rounded-2xl px-2 py-1 lg:px-3">
                                    Fair
                                </p>
                            )}
                            {Airvalue?.list[0]?.main.aqi === 1 && (
                                <p className="text-white text-[10px] bg-violet-600 rounded-2xl px-2 py-1 lg:px-3">
                                    Good
                                </p>
                            )}
                        </div>
                        <div className="flex  justify-between py-3 bg-black rounded-lg">
                            
                        <AirIcon className="text-white text-[12px] sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl" />


                           
                            <table className="table-fixed w-full border-collapse overflow-x-auto ">
                               
                                <thead>
                                    <tr className="text-white text-end  text-[8px] lg:text-[10px] lg:table-row">
                                        <th className="px-4 ">PM2.5</th>
                                        <th className="px-4 ">SO₂</th>
                                        <th className="px-4 ">NO₂</th>
                                        <th className="px-4">O₃</th>
                                    </tr>
                                </thead>

                                {/* Table Body */}
                                <tbody>
                                    <tr className="text-white text-[10px] lg:text-[14px] text-end ">
                                        <td className="px-4 ">{Airvalue?.list[0]?.components.pm2_5 || "N/A"}</td>
                                        <td className="px-4 ">{Airvalue?.list[0]?.components.so2 || "N/A"}</td>
                                        <td className="px-4 ">{Airvalue?.list[0]?.components.no2 || "N/A"}</td>
                                        <td className="px-4 ">{Airvalue?.list[0]?.components.o3 || "N/A"}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                    </div>
                    <div className="bg-black lg:px-4 lg:py-2 px-2 py-1 rounded-xl mt-3">
                        <h1 className="text-white text-[12px] sm:text-sm lg:text-lg ">Sunrise & Sunset</h1>
                        <div className="flex lg:space-x-64 md:space-x-14 space-x-8 mt-3">
                            <div className="flex gap-3">
                                <WbSunnyIcon  className="text-white text-[8px] sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl" />
                                <div>
                                    <p className="text-white text-[8px] lg:text-[10px]">Sunrise</p>
                                    <p className="text-white text-[10px] lg:text-[14px]">{timestamp(Sunrise?.sys.sunrise)}</p>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <NightlightRoundIcon  className="text-white text-[8px] sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl" />
                                <div>
                                    <p className="text-white text-[8px] lg:text-[10px]">Sunset</p>
                                    <p className="text-white text-[10px] lg:text-[14px]">{timestamp(Sunset?.sys.sunset)}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-black lg:px-4 lg:py-2 px-2 py-1 rounded-xl mt-3">
                        <h1 className="text-white text-[12px] sm:text-sm lg:text-lg ">Weather Data</h1>
                        <div className="flex lg:space-x-64 md:space-x-14 space-x-8 mt-3">
                            <div className="flex gap-3">
                                <WaterDropIcon className="text-white text-[8px] sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl" />
                                <div>
                                    <p className="text-white text-[8px] lg:text-[10px]">Humidity</p>
                                    <p className="text-white text-[10px] lg:text-[14px]">{Sunrise?.main.humidity}%</p>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <TireRepairIcon className="text-white text-[8px] sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl" />
                                <div>
                                    <p className="text-white text-[8px] lg:text-[10px]">Pressure</p>
                                    <p className="text-white text-[10px] lg:text-[14px]">{Sunset?.main.pressure}hPa</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex lg:space-x-64 md:space-x-14 space-x-8 mt-3">
                            <div className="flex gap-3">
                                <DeviceThermostatIcon className="text-white text-[8px] sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl" />
                                <div>
                                    <p className="text-white text-[8px] lg:text-[10px]">Feels Like</p>
                                    <p className="text-white text-[10px] lg:text-[14px]">{Sunrise?.main.feels_like}°C</p>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <VisibilityOffIcon className="text-white text-[8px] sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl" />
                                <div>
                                    <p className="text-white text-[8px] lg:text-[10px]">Visibility</p>
                                    <p className="text-white text-[10px] lg:text-[14px]">{Sunset?.visibility}m/s</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <p>Loading weather data...</p>
            )}
        </>
    );
};

export default Aircondition;

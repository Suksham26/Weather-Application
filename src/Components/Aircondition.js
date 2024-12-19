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
        <div className="bg-[#330000] px-8 py-3  w-full rounded-xl">
          <h1 className="text-white text-sm">Today Highlights</h1>
          <div className="bg-black p-4 rounded-xl mt-3">
            <div className="flex justify-between">
              <p className="text-white text-lg ">AQI</p>
              {Airvalue?.list[0]?.main.aqi === 5 && (
                <p className="text-white bg-violet-600 rounded-2xl px-3 py-1">
                  Very Poor
                </p>
              )}
              {Airvalue?.list[0]?.main.aqi === 4 && (
                <p className="text-white bg-violet-600 rounded-2xl px-3 py-1">
                  Poor
                </p>
              )}
              {Airvalue?.list[0]?.main.aqi === 3 && (
                <p className="text-white bg-violet-600 rounded-2xl px-3 py-1">
                  Moderate
                </p>
              )}
              {Airvalue?.list[0]?.main.aqi === 2 && (
                <p className="text-white bg-violet-600 rounded-2xl px-3 py-1">
                  Fair
                </p>
              )}
              {Airvalue?.list[0]?.main.aqi === 1 && (
                <p className="text-white bg-violet-600 rounded-2xl px-3 py-1">
                  Good
                </p>
              )}
            </div>
          </div>
          <div className="bg-black p-5 mt-4 rounded-xl">
            <h1 className="text-white text-2xl">Sunrise & Sunset</h1>
            <div className="flex space-x-64 mt-3">
              <div className="flex">
                <WbSunnyIcon className="text-white" />
                <div>
                  <p className="text-white">Sunrise</p>
                  <p className="text-white">{timestamp(Sunrise?.sys.sunrise)}</p>
                </div>
              </div>
              <div className="flex">
                <NightlightRoundIcon className="text-white" />
                <div>
                  <p className="text-white">Sunset</p>
                  <p className="text-white">{timestamp(Sunset?.sys.sunset)}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-black p-5 mt-4 rounded-xl">
                        <h1 className="text-white text-2xl">Weather Data</h1>
                        <div className="flex space-x-64 mt-3">
                            <div className="flex">
                                <WaterDropIcon className="text-white" />
                                <div>
                                    <p className="text-white">Humidity</p>
                                    <p className="text-white">{Sunrise?.main.humidity}%</p>
                                </div>
                            </div>
                            <div className="flex">
                                <TireRepairIcon className="text-white" />
                                <div>
                                    <p className="text-white">Pressure</p>
                                    <p className="text-white">{Sunset?.main.pressure}hPa</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex space-x-64 mt-3">
                            <div className="flex">
                                <DeviceThermostatIcon className="text-white" />
                                <div>
                                    <p className="text-white">Feels Like</p>
                                    <p className="text-white">{Sunrise?.main.feels_like}°C</p>
                                </div>
                            </div>
                            <div className="flex">
                                <VisibilityOffIcon className="text-white" />
                                <div>
                                    <p className="text-white">Visibility</p>
                                    <p className="text-white">{Sunset?.visibility}m/s</p>
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

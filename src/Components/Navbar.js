import MyLocationIcon from '@mui/icons-material/MyLocation';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import { useState, useEffect } from 'react';

const Navbar = ({Location,setLocation}) => {
    const [Address, setAddress] = useState('');
   
    const [City, setCity] = useState(''); 
    const [CityDetails, setCityDetails] = useState(null); 

    useEffect(() => {
        if (Location.latitude && Location.longitude) {
            fetchAddress(Location.latitude, Location.longitude); 
        }
    }, [Location]);

//     fetching address from Geocoding Api
    const fetchAddress = async (latitude, longitude) => {
        const apikeys = "5fffd1a89d9ac00b3f571ea63f552d99";
        try {
            const response = await axios.get('http://api.openweathermap.org/geo/1.0/reverse', {
                params: {
                    lat: latitude,
                    lon: longitude,
                    limit: 1,
                    appid: apikeys,
                },
            });
            setAddress(response.data[0]?.name || 'Address not found');
            console.log(response.data[0]?.name);
        } catch (error) {
            console.error('Error fetching address:', error);
        }
    };

    
    const searchCity = async () => {
        const apikeys = "5fffd1a89d9ac00b3f571ea63f552d99";
        try {
            const result = await axios.get('http://api.openweathermap.org/geo/1.0/direct', {
                params: {
                    q: City, 
                    limit: 1,
                    appid: apikeys,
                },
            });
            if (result.data.length > 0) {
                const { lat, lon } = result.data[0];
                setCityDetails({ name: City, latitude: lat, longitude: lon });
                console.log(lat, lon);
                setLocation({ latitude: lat, longitude: lon, error: null }); 
            } else {
                console.log("City not found");
                setCityDetails(null);
            }
        } catch (error) {
            console.log(error);
            setCityDetails(null);
        }
    };

//     getting current location give latitude and longitude
    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLocation({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        error: null,
                    });
                },
                (error) => {
                    setLocation({
                        latitude: null,
                        longitude: null,
                        error: error.message,
                    });
                }
            );
        }
    };

    return (
        <>
           <div className="flex flex-wrap items-center justify-between m-1 px-5 md:px-2 lg:py-2 space-x-6 md:space-x-3 h-auto">
  {/* Logo */}
  <img
    src="./images/download-removebg-preview.png"
    alt="logo"
    className="w-12 h-12 sm:w-10 sm:h-10"
  />

  {/* Search Input */}
  <div className="relative max-w-lg w-full lg:w-1/2  md:w-1/2   ">
    <input
      type="search"
      placeholder="Search for city"
      className="bg-[#1a0000] rounded-full py-2 pl-10 w-full text-white text-sm "
      value={City}
      onChange={(e) => setCity(e.target.value)}
    />
    <SearchIcon
      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white cursor-pointer"
      onClick={searchCity}
    />
  </div>

  {/* Current Location Button */}
  <div className="mt-3 sm:mt-0">
    <button
      className="bg-[#1a0000] flex items-center gap-2 rounded-full px-4 py-2 md:px-3 md:py-1  "
      onClick={getLocation}
    >
      <MyLocationIcon className="text-white text-sm md:text-[8px] " />
      <span className="text-white text-xs hidden md:inline">
        Current Location
      </span>
    </button>
  </div>
</div>



        </>
    );
};

export default Navbar;

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
           <div className="flex flex-wrap items-center justify-between m-1 md:px-5 px-2 lg:py-2 md:space-x-6 space-x-3 h-auto">
  {/* Logo */}
  <img
    src="./images/download-removebg-preview.png"
    alt="logo"
    className="sm:w-12 sm:h-12 w-10 h-10"
  />

  {/* Search Input */}
  <div className="relative lg:max-w-lg   md:w-1/2 w-36   ">
    <input
      type="search"
      placeholder="Search for city"
      className="bg-[#1a0000] rounded-full py-2 lg:pl-10 pl-3 w-full text-white text-sm "
      value={City}
      onChange={(e) => setCity(e.target.value)}
    />
    <SearchIcon
      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white cursor-pointer"
      onClick={searchCity}
    />
  </div>

  {/* Current Location Button */}
  <div className="sm:mt-3 mt-0">
    <button
      className="bg-[#1a0000] flex items-center gap-2 rounded-full md:px-4 md:py-2 px-3 py-1  "
      onClick={getLocation}
    >
      <MyLocationIcon className="text-white md:text-sm text-[8px] " />
      <span className="text-white text-xs hidden md:inline">
        Current Location
      </span>
    </button>
  </div>
</div>



        </>
    );
};

export default Navbar;
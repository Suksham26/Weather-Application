import {useState} from "react";
import './App.css';
import Navbar from './Components/Navbar';
import Sidebar from "./Components/sidebar";

import Aircondition from "./Components/Aircondition";

function App() {
      const [Location, setLocation] = useState({
          latitude: null,
          longitude: null,
          error: null,
      });
  return (
    <>
    <div className="h-screen w-screen ">
      <div className="h-[10%] px-1 lg:py-2 py-2">
      <Navbar Location={Location} setLocation={setLocation} />
      </div>
      <div className="h-[90%] w-screen flex mt-4 px-2 lg:px-8 lg:pb-10 ">
        <div className="w-[40%] lg:w-[30%] ">
        <Sidebar Location={Location} setLocation={setLocation} />
        </div>
        <div className="w-[60%] lg:w-[70%] pl-7 lg:h-full h-auto lg:pb-10">
        <Aircondition Location={Location} setLocation={setLocation}/>
        </div>
      </div>
    </div>
    
    
    

    </>
  );
}

export default App;

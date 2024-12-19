import Navbar from "../Components/Navbar"
import Sidebar from "../Components/sidebar"
const Home = () => {
    return (
        <>
            <div className="h-screen w-screen">
                <div className="h-[5%] p-6">
                   <Navbar />
                </div>
                <div className="h-[95%]">
                    <div className="w-[30%]">
                        <Sidebar/>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Home
import { useNavigate } from "react-router-dom"
import logo from "/images/logo.jpg"
import '@fortawesome/fontawesome-free/css/all.min.css'

const LandingPage = () => {
    const navigate = useNavigate()

    const handleSignUpClick = () => {
        navigate("/sign-up")
    }

    const handleSignInClick = () => {
        navigate("/sign-in")
    }

  return (
    <div >

        <nav className="flex justify-between pl-[5%] pr-[6%] "> 
            <div className="flex items-center ">
                <img src= {logo} alt="logo" className="w-12 h-12 " />
                <div className="text-black text-2xl font-bold">
                    <span>Swap</span><span className="text-gray-400">Ex</span>
                </div>
            </div>
            <ul className="flex justify-center">
                <li className="inline-block list-none text-white bg-blue-900 mx-6 px-6 py-2 rounded-md my-3"><button onClick={handleSignUpClick}>Sign Up</button></li>
                <li className="inline-block list-none text-white bg-orange-500 mx-6 px-6 py-2 rounded-md my-3"><button  onClick={handleSignInClick}>Log in</button></li>
            </ul>
        </nav>

        <div className="min-h-screen bg-cover bg-center relative bg-[url('/images/image1.jpg')]" >
                <main className="relative z-10 text-center text-white flex flex-col justify-center items-center min-h-screen">
                <h1 className="text-4xl md:text-6xl font-bold mb-6">
                The Next Generation Of Trading System
                </h1>
                <h3 className="text-2xl md:text-3xl font-bold mb-3">
                The Next Generation Of Trading System
                </h3>
                <p className="text-lg md:text-xl max-w-2xl mx-auto mb-12">
                Buy, Sell and Barter Seamlessly With A Single Tap
                </p>
                <div className="flex justify-around items-center max-w-2xl mx-auto mt-6 space-x-6">
                <div>
                    <div className="bg-orange-600 p-4 rounded-full mb-2">
                    {/* Replace with your icon */}
                    <i className="fas fa-key text-white text-3xl"></i>
                    </div>
                    <p>Login/Register</p>
                </div>
                <div>
                    <div className="bg-orange-600 p-4 rounded-full mb-2">
                    {/* Replace with your icon */}
                    <i className="fas fa-shopping-cart text-white text-3xl"></i>
                    </div>
                    <p>Add Items</p>
                </div>
                <div>
                    <div className="bg-orange-600 p-4 rounded-full mb-2">
                    {/* Replace with your icon */}
                    <i className="fas fa-bullhorn text-white text-3xl"></i>
                    </div>
                    <p>Make Offers</p>
                </div>
                <div>
                    <div className="bg-orange-600 p-4 rounded-full mb-2">
                    {/* Replace with your icon */}
                    <i className="fas fa-exchange-alt text-white text-3xl"></i>
                    </div>
                    <p>Go Barter</p>
                </div>
                </div>
            </main>
                
        </div>

    </div>
  )
}

export default LandingPage
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import './globals.css'
import LandingPage from './auth/LandingPage'


import { CreatePost, EditPost, Home, Message, PostDetails, Profile, Saved, UpdateProfile } from './root/pages'
import SignUp from './auth/SignUp'
import { Toaster } from './components/ui/toaster'
import SigninForm from './auth/SignInForm'
import RootLayout from './root/RootLayout'
import Explore from './root/pages/Explore'
import ChatSet from './root/pages/ChatSet'
import ChatLayout from './root/ChatLayout'
import { useUserContext } from './context/AuthContext'
import { useEffect } from 'react'


//import { Toaster } from './components/ui/toaster'




const App = () => {
  const { isAuthenticated } = useUserContext(); // Access authentication status from context
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check if the current path is '/' and the user is not authenticated
    if (location.pathname === '/' && !isAuthenticated) {
      navigate('/welcome'); // Redirect to /welcome if the user is not authenticated
    }
  }, [isAuthenticated, location, navigate]);
  return (
    <div>

        <Routes>
          {/* public routes */}
          <Route>
            <Route path="/welcome" element={<LandingPage />} />
            <Route path="/sign-in" element={<SigninForm />} />
            <Route path="/sign-up" element={<SignUp />} />
          </Route>

          {/* private routes */}
          <Route element={<RootLayout />}>
            <Route index element={<Home />} />
            <Route path="/saved" element={<Saved />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="/update-post/:id" element={<EditPost />} />
            <Route path="/posts/:id" element={<PostDetails />} />
            <Route path="/profile/:id/*" element={<Profile />} />
            <Route path="/update-profile/:id" element={<UpdateProfile />} />
            <Route path='/message' element={<ChatLayout />} >
              <Route path="/message/chat/:id" element={<ChatSet />} />
            </Route>
          </Route>
        </Routes>
        <Toaster />
    </div>


  )
}

export default App

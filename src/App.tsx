import { Route, Routes } from 'react-router-dom'
import './globals.css'
import LandingPage from './auth/LandingPage'


import { CreatePost, EditPost, Home, Message, PostDetails, Profile, Saved, UpdateProfile } from './root/pages'
import SignUp from './auth/SignUp'
import { Toaster } from './components/ui/toaster'
import SigninForm from './auth/SignInForm'
import RootLayout from './root/RootLayout'
import Explore from './root/pages/Explore'

//import { Toaster } from './components/ui/toaster'




const App = () => {


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
          <Route path="/message" element={<Message />} />
        </Route>
      </Routes>
      <Toaster />
    </div>


  )
}

export default App

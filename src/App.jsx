import { useState } from 'react'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import HomePage from './pages/HomePage';
import NewLinkForm from './pages/NewLinkForm';
import UpdateLinkForm from './pages/UpdateLinkForm';

function App() {
  const [count, setCount] = useState(0)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    
    
      <Router>
            <Routes>
                <Route path="/" element={<LandingPage isLoggedIn={isLoggedIn} />} />
                <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />
                <Route path="/signup" element={<SignupPage setIsLoggedIn={setIsLoggedIn} />} />
                <Route path="/:uniqueKey" element={<HomePage isLoggedIn={isLoggedIn} />} />
                <Route path='/:uniqueKey/newlink' element={<NewLinkForm />} />
                <Route path='/:uniqueKey/newlink/:linkId' element={<UpdateLinkForm />} />
            </Routes>
        </Router>
    
  )
}

export default App

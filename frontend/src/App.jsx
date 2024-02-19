import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { LandingPage } from './components/LandingPage'
import { TodoPage } from './components/TodoPage'
import LoginPage  from './components/LoginPage'
import SignupPage from './components/SignupPage'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route key="landing" path="/" element={<LandingPage></LandingPage>} />
        <Route key="todos" path="/login" element={<LoginPage></LoginPage>} />
        <Route key="todos" path="/signup" element={<SignupPage></SignupPage>} />
        <Route key="todos" path="/todos" element={<TodoPage></TodoPage>} />
      </Routes>
    </Router>

    </>
  )
}

export default App

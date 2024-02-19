import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { LandingPage } from './components/LandingPage'
import { TodoPage } from './components/TodoPage'

function App() {

  return (
    <>
      {/* <LandingPage></LandingPage> */}
      <TodoPage></TodoPage>
    </>
  )
}

export default App

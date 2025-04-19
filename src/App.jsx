import { useState } from 'react'
import {useRoutes} from 'react-router-dom'
import './App.css'
import TitleBar from './components/TitleBar'
import HomePage from './pages/HomePage'
import PuzzlePage from './pages/PuzzlePage'

function App() {
  const routes = useRoutes([
    {
      path: "/",
      element: <HomePage/>
    },
    {
      path: "/puzzlePage",
      element: <PuzzlePage/>
    }
  ]);    

  return (
    <>            
        <TitleBar/>      
        {routes}      
    </>
  )
}

export default App

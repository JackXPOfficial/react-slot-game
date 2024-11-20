import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SlotBody from './SlotBody.jsx'


function App() {
  const [count, setCount] = useState(0)
  const [time, setTime] = useState(0)
  

  return (
    <>
      <div className="App">
        <div class="game">
          <div class="slotHead">
            <h1>SLOT MACHINE</h1>
            
          </div>
          <SlotBody />
        </div>
      </div>
      
    </>
  )
}

export default App

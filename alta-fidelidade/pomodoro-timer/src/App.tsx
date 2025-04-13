import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [time, setTime] = useState(25 * 60)
  const [isRunning, setIsRunning] = useState(false)
  let interval: number | undefined // Declarado fora do useEffect

  useEffect(() => {
    if (isRunning) {
      interval = window.setInterval(() => {
        setTime((prev) => (prev > 0 ? prev - 1 : 0))
      }, 1000)
    } else {
      window.clearInterval(interval)
    }
    return () => window.clearInterval(interval)
  }, [isRunning])

  const formatTime = (seconds: number) => {
    const min = String(Math.floor(seconds / 60)).padStart(2, '0')
    const sec = String(seconds % 60).padStart(2, '0')
    return `${min}:${sec}`
  }

  return (
    <div className="App">
      <h1>Pomodoro Timer</h1>
      <div className="timer">
        <span>{formatTime(time)}</span>
      </div>
      <button onClick={() => setIsRunning(!isRunning)}>
        {isRunning ? 'Pause' : 'Start'}
      </button>
      <button onClick={() => setTime(25 * 60)}>Reset</button>
    </div>
  )
}

export default App
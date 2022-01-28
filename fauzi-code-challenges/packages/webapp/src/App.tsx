import React, { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import { Challenge1 } from './pages/Challenge1'
import { Challenge2 } from './pages/Challenge2'
import { Challenge3 } from './pages/Challenge3'

function App() {
  const [challenge, setChallenge] = useState<number>(1)

  const previousChallenge = () => {
    setChallenge(challenge - 1)
  }

  const nextChallenge = () => {
    setChallenge(challenge + 1)
  }

  return (
    <div className="App">
      <h3>Challenge {challenge}</h3>
      {challenge === 1 && <Challenge1 />}
      {challenge === 2 && <Challenge2 />}
      {challenge === 3 && <Challenge3 />}
      <p>
        <button className="LgButton" onClick={previousChallenge}>
          Prev challenge
        </button>{' '}
        {challenge < 3 && <button className="LgButton" onClick={nextChallenge}>
          Next challenge
        </button>}
      </p>
    </div>
  )
}

export default App

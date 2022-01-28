import React, { useEffect, useRef, useState } from 'react'
import '../styles/Challenge1.css'

export const Challenge1: React.FunctionComponent<{}> = () => {
  const [love, setLove] = useState(2)
  const timer: any = useRef(null)

  const decreaseTime: number = 30000 // ms, 30 sec

  useEffect(() => {
    timer.current = setInterval(() => setLove(prev => prev - 1), decreaseTime)
  }, [])

  useEffect(() => {
    if (love === 0) {
      clearInterval(timer.current)
      timer.current = null
    }
    if (love > 5) setLove(1)
  }, [love])

  const handlePenguinClick = (e: any) => {
    if (e.detail === 3) {
      alert('Penguin annoying banget')
    } else {
      setLove(prev => prev + 1)
      if (timer.current === null) timer.current = setInterval(() => setLove(prev => prev - 1), decreaseTime)
    }
  }

  return (
    <div>
      <div className="logoContainer" onClick={handlePenguinClick}>
        <img src={'/penguin.png'} className="logo" alt="logo" />
      </div>

      <div>
        <p>Give the penguin some love by tapping on it</p>
        Penguin loves meter: <br />
        {Array.from(Array(love).keys()).map((_, key) => (
          <img {...{ key }} src="/love.png" />
        ))}
      </div> 
    </div>
  )
}

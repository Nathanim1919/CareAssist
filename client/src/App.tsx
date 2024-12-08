import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1 className='text-4xl text-red-700'>
        Hello, Vite + React!
      </h1>
    </>
  )
}

export default App

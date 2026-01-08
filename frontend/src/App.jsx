import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-blue-400 text-3xl font-bold">
        Vite + React + Tailwind
      </h1>

      <button
        onClick={() => setCount(count + 1)}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        count is {count}
      </button>
    </div>
  )
}

export default App

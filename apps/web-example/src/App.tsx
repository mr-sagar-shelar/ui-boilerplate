import { useState } from 'react'
import './App.css'
import ApiExample from './components/ApiExample'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Web Example</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
      <ApiExample />
    </>
  )
}

export default App

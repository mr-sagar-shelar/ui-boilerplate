import { useState } from 'react'
import './index.css';
import { Button } from '@repo/ui/button/Button';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1 className="text-3xl font-bold underline">
        GQ
      </h1>
      <div>
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={() => setCount((count) => count + 1)}>
          GQ count is {count}
        </button>
        <Button label='GQ Button'></Button>
      </div>
    </>
  )
}

export default App

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'

declare global {
  interface Window {
    initializeBQ: (mountId: string) => void;
  }
}

function initializeBQ(mountId: string) {
  if (mountId) {
    createRoot(document.getElementById(mountId)!).render(
      <StrictMode>
        <App />
      </StrictMode>,
    )
  }
}

window.initializeBQ = initializeBQ;
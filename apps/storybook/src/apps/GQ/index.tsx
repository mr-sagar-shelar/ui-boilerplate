import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'

declare global {
  interface Window {
    initializeGQ: (mountId: string) => void;
  }
}

function initializeGQ(mountId: string) {
  if (mountId) {
    createRoot(document.getElementById(mountId)!).render(
      <StrictMode>
        <App />
      </StrictMode>,
    )
  }
}

window.initializeGQ = initializeGQ;
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'

declare global {
  interface Window {
    initializeDQ: (mountId: string) => void;
  }
}

function initializeDQ(mountId: string) {
  if (mountId) {
    createRoot(document.getElementById(mountId)!).render(
      <StrictMode>
        <App />
      </StrictMode>,
    )
  }
}

window.initializeDQ = initializeDQ;
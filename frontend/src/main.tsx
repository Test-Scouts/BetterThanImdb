import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import WelcomePage from './components/WelcomePage.tsx'
import {BrowserRouter, Routes, Route} from 'react-router-dom';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      {/* Routes */}
      <Routes>
        <Route path="/Welcome" element={<WelcomePage />} />
        <Route path="/" element={<WelcomePage />} />
        <Route path="/BetterThanIMDB" element={<App />} />
      </Routes>
      </BrowserRouter>
  </StrictMode>,
)

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AppProvider } from './pages/Dashboard/dashboard_pages/useContext.jsx'
import { StoreProvider } from './pages/Dashboard/dashboard_pages/ProductProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <StoreProvider>
      <App />
    </StoreProvider>
  </StrictMode>
)

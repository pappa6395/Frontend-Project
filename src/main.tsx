import { StrictMode } from 'react'
import AuthProvider from './context/AuthProvider.tsx'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
     <AuthProvider>
       <App />
    </AuthProvider>
  </StrictMode>
 
)

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './routes/router.jsx'
import AuthProvider from './providers/AuthProvider.jsx'
import TagManager from 'react-gtm-module'//gtm module

//Initializing GTM before app renders --
TagManager.initialize({
  gtmId: 'GTM-MLJGV8LN' // GTM ID
});


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router}/>
    </AuthProvider>
  </StrictMode>,
)

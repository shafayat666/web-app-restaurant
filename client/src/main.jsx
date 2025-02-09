import { StrictMode } from 'react'
import { RouterProvider } from "react-router-dom";
import { createRoot } from 'react-dom/client'
import './index.css'
import router from './routes/AppRoutes.jsx';
import AuthProvider from './providers/AuthProvider.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)

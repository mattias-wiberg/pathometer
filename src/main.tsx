import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ThemeProvider } from './components/theme-provider.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/home/home.tsx'
import { AuthProvider } from './context/AuthContext.tsx'
import Auth from './pages/auth.tsx'
import { APIProvider } from '@vis.gl/react-google-maps'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <h1>Not Found</h1>,
    children: [
      {
        path: '/', index: true, element: <Home />
      },
      {
        path: '/auth',
        element: <Auth />,
      },
    ]
  },
])


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme='system' storageKey='vite-ui-theme'>
      <AuthProvider>
        <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
          <RouterProvider router={router} />
        </APIProvider>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>,
)

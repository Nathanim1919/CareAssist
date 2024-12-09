import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import routes from './routes/routes.ts'
import { RouterProvider } from '@tanstack/react-router'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
     <RouterProvider router={routes}/>
  </StrictMode>,
)

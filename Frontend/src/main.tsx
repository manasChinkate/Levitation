import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux'
import { store } from '../app/store.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
    <Toaster
     position="top-center"
     toastOptions={{
      className: '',
      style: {
        
        color: 'white',
        background: 'black'
      },
    }} />
    <App />
    </Provider>
  </StrictMode>,
)

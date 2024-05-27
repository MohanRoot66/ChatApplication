import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import { useUserStore } from './lib/userStore.js'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={useUserStore}>
      <App />
    </Provider>
  </React.StrictMode>,
)

import React from 'react'
import ReactDOM from 'react-dom/client'
import { QrCode } from './components/QrCode.jsx'
import './styles/QrCode.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QrCode/>
  </React.StrictMode>,
)

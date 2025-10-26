import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// 1) Importo tu ícono (src/img/book.svg)
import bookIcon from './img/book.svg'

// 2) Seteo/actualizo el <link rel="icon"> del <head>
function setFavicon(href, type = 'image/svg+xml') {
  let link = document.querySelector('link[rel="icon"]')
  if (!link) {
    link = document.createElement('link')
    link.rel = 'icon'
    document.head.appendChild(link)
  }
  link.type = type
  link.href = href
}
setFavicon(bookIcon)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

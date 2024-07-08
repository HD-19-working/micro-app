import React from 'react'
import { createRoot } from 'react-dom/client';
import App from './App'
import "./index.css"

if (window.__POWERED_BY_WUJIE__) {
  let root;
  window.__WUJIE_MOUNT = () => {
    root = createRoot(document.getElementById('root'));
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    )
  };
  window.__WUJIE_UNMOUNT = () => {
    root && root.unmount();
  };
} else {
  createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
}
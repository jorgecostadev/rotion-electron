import React from 'react';
import ReactDom from 'react-dom/client';

import App from './app';

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDom.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
}

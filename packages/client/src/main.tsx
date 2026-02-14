import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App.tsx';
import './styles/theme.css';

import { ErrorBoundary } from './components/Errors/ErrorBoundary.tsx';
import { HashRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <HashRouter>
        <App />
      </HashRouter>
    </ErrorBoundary>
  </React.StrictMode>,
);
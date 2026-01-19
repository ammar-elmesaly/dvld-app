import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App.tsx';
import './styles/theme.css';

import { ErrorBoundary } from './components/Errors/ErrorBoundary.tsx';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import { history } from './helpers/history';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <HistoryRouter history={history}>
        <App />
      </HistoryRouter>
    </ErrorBoundary>
  </React.StrictMode>,
);
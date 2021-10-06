import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './App';
import AuthProvider from './contexts/AuthContext';
import ErrorBoundary from './components/ErrorBoundary';

ReactDOM.render(
  <ErrorBoundary>
    <React.StrictMode>
      <AuthProvider>
        <App />
      </AuthProvider>
    </React.StrictMode>
  </ErrorBoundary>,
  document.getElementById('root')
);
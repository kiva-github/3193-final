import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// contexts
import { AuthContextProvider } from './contexts/auth-context/AuthContext';
import { CardsContextProvider } from './contexts/cards-context/CardsContext';
import { GradientContextProvider } from './contexts/gradient-context/GradientContext';
import { UserContextProvider } from './contexts/user-context/UserContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <UserContextProvider>
        <CardsContextProvider>
          <GradientContextProvider>
            <App />
          </GradientContextProvider>
        </CardsContextProvider>
      </UserContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

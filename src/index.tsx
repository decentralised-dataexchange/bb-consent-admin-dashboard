import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { configStore } from './store/configStore';


declare global {
  interface Window {
    Init: any;
  }
}

window.Init = (config: any) => {
  configStore.baseUrl = config.baseUrl;
  configStore.clientId = config.clientId;
  configStore.appVersion = config.appVersion;
  console.log(configStore);
  ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
  ).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
};

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

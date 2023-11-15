// src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// 如果你想在应用中开始测量性能，你可以传递一个函数
// 到 reportWebVitals 中。例如：reportWebVitals(console.log)
// 或者发送到分析端点。了解更多：https://bit.ly/CRA-vitals
reportWebVitals();

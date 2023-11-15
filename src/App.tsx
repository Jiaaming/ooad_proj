// src/App.tsx
import React from 'react';
import './App.css'; // 引入一些基本的样式
import GameComponent from './components/GameComponent';

function App() {
  return (
    <div className="App">

      <main>
        <GameComponent />
      </main>
    </div>
  );
}

export default App;

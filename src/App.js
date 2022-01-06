import logo from './logo.svg';
import './App.css';
import React, { useEffect } from 'react';
import useSound from 'use-sound';
import keys from "./keys/merged.mp3";

const useKeyboardBindings = play => {
  useEffect(() => {
    const keyHandler = e => play({ id: e.key })
    window.addEventListener('keydown', keyHandler);

    return () => {
      window.removeEventListener('keydown', keyHandler);
    };
  }, [play]);
};

function App() {
  const ordered = ['$', 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'B', 'c', 'C', 'd', 'D', 'e', 'E', 
                   'f', 'g', 'G', 'h', 'H', 'i', 'I', 'j', 'J', 'k', 'l', 'L', 'm', '!', '%', '(', 
                   '*', '@', '^', 'n', 'o', 'O', 'p', 'P', 'q', 'Q', 'r', 's', 'S', 't', 'T', 'u', 
                   'v', 'V', 'w', 'W', 'x', 'y', 'Y', 'z', 'Z'];

  const map = { sprite: {} };

  ordered.forEach((item, index) => {
    map.sprite[item] = [(index * 7650), 7650];
  });

  const [play] = useSound(keys, map);
  useKeyboardBindings(play);

  return (
    <div className="App">
      <button onClick={play}>Boop!</button>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>

        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

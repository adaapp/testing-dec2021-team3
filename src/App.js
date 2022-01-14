import './App.css';
import React, { useEffect, useState } from 'react';
import useSound from 'use-sound';
import keys from "./keys/newmerge.mp3";

const useKeyboardBindings = (play, setKey) => {
  useEffect(() => {
    const keyHandler = e => {
       play({ id: e.key });
       setKey(e.key);
    } 
    window.addEventListener('keydown', keyHandler);

    return () => {
      window.removeEventListener('keydown', keyHandler);
    };
  }, [play, setKey]);
};

function App() {
  let [currentKey, setKey] = useState('🎹');

  const ordered = ['$', 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'B', 'c', 'C', 'd', 'D', 'e', 'E', 
                   'f', 'g', 'G', 'h', 'H', 'i', 'I', 'j', 'J', 'k', 'l', 'L', 'm', '!', '%', '(', 
                   '*', '@', '^', 'n', 'o', 'O', 'p', 'P', 'q', 'Q', 'r', 's', 'S', 't', 'T', 'u', 
                   'v', 'V', 'w', 'W', 'x', 'y', 'Y', 'z', 'Z'];

  const keyboard = [1, '!', 2, '@', 3, 4, '$', 5, '%', 6, '^', 7, 8, '*', 9, '(', 0, 'q', 'Q', 'w', 'W', 'e', 
                   'E', 'r', 't', 'T', 'y', 'Y', 'u', 'i', 'I', 'o', 'O', 'p', 'P', 'a', 's', 'S', 
                   'd', 'D', 'f', 'g', 'G', 'h', 'H', 'j', 'J', 'k', 'l', 'L', 'z', 'Z', 'x', 'c', 
                   'C', 'v', 'V', 'b', 'B', 'n', 'm'];

  const map = { sprite: {} };

  ordered.forEach((item, index) => {
    map.sprite[item] = [(index * 7652), 7648];
  });

  const [play] = useSound(keys, map);
  useKeyboardBindings(play, setKey);

  return (
    <div className="App">
      <div id="top">
        <div id="container">
          <img id="logo" className="noselect" src="/logo.svg" alt="Logo"/>
          <span>mélodie</span>
        </div>
        
        <img id="triangle" className="effects noselect" src="/triangle.svg" alt="Visual Effect"/>
      </div>

      <div id="middle">
        {keyboard.map((d, i) => 
            d !== d.toString().toUpperCase() ?
                <div id={keyboard[i].toString()} className='section'>
                  <div onMouseDown={() => play({ id: d.toString() })} id={i} className='key'>
                        <span className='noselect'>{d}</span>
                  </div>
                  {(() => {
                     if(i + 1 < keyboard.length && keyboard[i + 1] === keyboard[i + 1].toString().toUpperCase()) {
                        return <div onMouseDown={() => play({ id: keyboard[i+1].toString() })} id={i+1} className='black_key'/>
                     }
                  })()}
                </div>
            : null
        )};
      </div>

      <div id="bottom">
        <img id="note" className="effects noselect" src="/notecircle.svg" alt="Note Circle"/>
        <span id="current">{currentKey}</span>
      </div>
      <img id="tricircle" className="effects noselect" src="/tricircle.svg" alt="Visual Effect"/>
      <img id="polygon" className="effects noselect" src="/polygon.svg" alt="Visual Effect"/>
    </div>
  );
}

export default App;

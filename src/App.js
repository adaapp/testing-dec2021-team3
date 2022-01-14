import './App.css';
import React, { useEffect } from 'react';
import useSound from 'use-sound';
import keys from "./keys/newmerge.mp3";

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

  const keyboard = [1, '!', 2, '@', 3, 4, '$', 5, '%', 6, '^', 7, 8, '*', 9, '(', 0, 'q', 'Q', 'w', 'W', 'e', 
                   'E', 'r', 't', 'T', 'y', 'Y', 'u', 'i', 'I', 'o', 'O', 'p', 'P', 'a', 's', 'S', 
                   'd', 'D', 'f', 'g', 'G', 'h', 'H', 'j', 'J', 'k', 'l', 'L', 'z', 'Z', 'x', 'c', 
                   'C', 'v', 'V', 'b', 'B', 'n', 'm'];

  const map = { sprite: {} };

  ordered.forEach((item, index) => {
    map.sprite[item] = [(index * 7652), 7648];
  });

  const [play] = useSound(keys, map);
  useKeyboardBindings(play);

  return (
    <div className="App">
      <div id="top">
        <img id="logo" src="/logo.svg" alt="Logo"/>
        <img id="triangle" className="effects" src="/triangle.svg" alt="Visual Effect"/>
      </div>

      {/* style={{marginLeft: ((i-34)*(30)).toString() + 'px'}} */}

      <div id="middle">
       {keyboard.map((d,i) => {
         if(d !== d.toString().toUpperCase()) return <div onMouseDown={() => play({ id: d.toString() })} id='key'><span>{d}</span></div>
         else return <div onMouseDown={() => play({ id: d.toString() })} style={{marginLeft: ((((i-(18 * 4))*2)*30)).toString() + 'px'}} id='black_key'/>
       })} 
      </div>

      <div id="bottom">
        <img id="note" className="effects" src="/notecircle.svg" alt="Note Circle"/>
       
      </div>
      <img id="tricircle" className="effects" src="/tricircle.svg" alt="Visual Effect"/>
      <img id="polygon" className="effects" src="/polygon.svg" alt="Visual Effect"/>
    </div>
  );
}

export default App;

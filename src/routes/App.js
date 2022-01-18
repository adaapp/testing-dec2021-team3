// Import dependencies
import { useState } from 'react';
import useSound from 'use-sound';

// Import components
import Splash from '../components/splash/splash';
import Metronome from '../components/metronome/metronome';
import Volume from '../components/volume/volume';
import Keyboard from '../components/keyboard/keyboard';

// Extra files
import './App.css';
import keys from "../sounds/keys.mp3";
import { createSprite } from '../helpers';

function App() {
  let [splash, setSplash] = useState(true);
  let [currentKey, setKey] = useState('🎹');
  let [volume, setVolume] = useState('50');

  const ordered = ['$', 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'B', 'c', 'C', 'd', 'D', 'e', 'E',
    'f', 'g', 'G', 'h', 'H', 'i', 'I', 'j', 'J', 'k', 'l', 'L', 'm', '!', '%', '(',
    '*', '@', '^', 'n', 'o', 'O', 'p', 'P', 'q', 'Q', 'r', 's', 'S', 't', 'T', 'u',
    'v', 'V', 'w', 'W', 'x', 'y', 'Y', 'z', 'Z'];
  
  const map = createSprite(ordered, 50);
  const [play, data] = useSound(keys, map);

  return (
    <div className='App'>

      {splash ?
        <div data-testid="splashWrap"> 
          <Splash setSplash={setSplash}/>
        </div>
      : null}

      <div id='top'>
        <div id='container'>
          <img id='logo' className='noselect' src='/svg/logo.svg' alt='Header Logo' />
          <span data-testid="app-text">mélodie</span>
        </div>

        <img id='triangle' className='effects noselect' src='/svg/triangle.svg' alt='Visual Effect 1' />
      </div>

      <div id='middle'>

        <div id='controls'>
          <Metronome volume={volume}/>
          <Volume data={data} setVolume={setVolume} volume={volume}/>
        </div>
        
        <Keyboard play={play} setKey={setKey} volume={volume} splash={splash}/>

      </div>

      <div id='bottom'>
        <div id='noteWrap'>
          <img id='note' className='effects noselect' src='/svg/notecircle.svg' alt='Note Circle' />
          <span id='current'>{currentKey}</span>
        </div>
      </div>
      <img id='tricircle' className='effects noselect' src='/svg/tricircle.svg' alt='Visual Effect 2' />
      <img id='polygon' className='effects noselect' src='/svg/polygon.svg' alt='Visual Effect 3' />
    </div>
  );
}

export default App;

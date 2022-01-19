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
import { createSprite, convertToNote } from '../helpers';

function App() {
  /* The state of a React app stores information about the current states
  of components. The following three lines make use of a React 'Hook.'
  Previously, you needed to write components as classes in order to
  access React features like the state. Hooks get rid of the need 
  for those classes! */

  // Used to control whether the splash screen should be shown
  let [splash, setSplash] = useState(true);

  // Stores the value of the note bubble underneath the keyboard
  let [currentKey, setKey] = useState('🎹');

  // Stores the current volume for both the keyboard and metronome
  let [volume, setVolume] = useState('50');

  /* A list containing all keyboard keys for the Piano. Howler.js, a
     popular audio player package, is able to use a sprite, to store
     divided parts of a single audio file. In order to create a
     Sprite, we need to give each Piano key sample a value for 
     reference. The values in the following list will be used
     as references. */

  const ordered = ['$', 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'B', 'c', 'C', 'd', 'D', 'e', 'E',
    'f', 'g', 'G', 'h', 'H', 'i', 'I', 'j', 'J', 'k', 'l', 'L', 'm', '!', '%', '(',
    '*', '@', '^', 'n', 'o', 'O', 'p', 'P', 'q', 'Q', 'r', 's', 'S', 't', 'T', 'u',
    'v', 'V', 'w', 'W', 'x', 'y', 'Y', 'z', 'Z'];
  
  /* Uses the createSprite() helper function to create the object with a 
  sprite and volume, in a format that Howler.js accepts. */

  const map = createSprite(ordered, 50);

  /* use-sound is an example of a React 'Hook.' This particular hook
  wraps the Howler.js library so that we can easily access it in React,
  whilst interacting with components and the state. */

  const [play, data] = useSound(keys, map);

  // The following return includes all of the HTML code for this page
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
          <span data-testid="appText">mélodie</span>
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
          <span data-testid='noteBubble' id='current'>{currentKey === '🎹' ? '🎹' : convertToNote(currentKey)}</span>
        </div>
      </div>
      <img id='tricircle' className='effects noselect' src='/svg/tricircle.svg' alt='Visual Effect 2' />
      <img id='polygon' className='effects noselect' src='/svg/polygon.svg' alt='Visual Effect 3' />
    </div>
  );
}

export default App;

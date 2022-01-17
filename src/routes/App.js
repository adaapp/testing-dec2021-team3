// Import dependencies
import { useState } from 'react';

// Import components
import Splash from '../components/splash/splash';
import Metronome from '../components/metronome/metronome';
import Volume from '../components/volume/volume';
import Keyboard from '../components/keyboard/keyboard';

// Extra files
import './App.css';

function App() {
  let [splash, setSplash] = useState(true);
  let [currentKey, setKey] = useState('🎹');
  let [volume, setVolume] = useState(50);

  // const handleInput = (e) => {
  //   if(e.target.value < 1000) setBpm(e.target.value);

  //   if(isBeating) {
  //     clearTimeout(timeout);
  //     setBeat(false)
  //   }
  // }

  return (
    <div className='App'>

      {splash ?
        <Splash setSplash={setSplash}/>
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
          <Volume setVolume={setVolume} volume={volume}/>
        </div>
        
        <Keyboard setKey={setKey} volume={volume} splash={splash}/>

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

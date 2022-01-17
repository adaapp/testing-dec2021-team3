import './App.css';
import React, { useEffect, useState } from 'react';
import useSound from 'use-sound';
import keys from "./keys.mp3";
import metronome from "./metronome.mp3";

const useKeyboardBindings = (play, setKey, splash, keys) => {
  useEffect(() => {
    if(!splash) {
      const keyHandler = e => {
        if(document.activeElement.id !== 'bpmInput' && keys.includes(e.key)) {
          play({ id: e.key });
          setKey(e.key);
  
          const element = document.getElementById('key-' + e.key);
  
          if(element.classList.contains('keyPressed')) {
              element.style.animation = 'none';
              setTimeout(function(){ 
                  element.style.animation = '';
              }, 1); 
          } else {
            element.classList.add('keyPressed');
          }
        }
      }

      window.addEventListener('keydown', keyHandler);
  
      return () => {
        window.removeEventListener('keydown', keyHandler);
      };
    }
  }, [play, setKey, splash, keys]);
};

function App() {
  let [fade, setFade] = useState(false);
  let [splash, setSplash] = useState(true);

  let [isBeating, setBeat] = useState(false);
  let [timeout, setTime] = useState('50');

  let [currentKey, setKey] = useState('🎹');
  let [volume, setVolume] = useState(50);
  let [bpm, setBpm] = useState('50');

  const ordered = ['$', 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'B', 'c', 'C', 'd', 'D', 'e', 'E',
    'f', 'g', 'G', 'h', 'H', 'i', 'I', 'j', 'J', 'k', 'l', 'L', 'm', '!', '%', '(',
    '*', '@', '^', 'n', 'o', 'O', 'p', 'P', 'q', 'Q', 'r', 's', 'S', 't', 'T', 'u',
    'v', 'V', 'w', 'W', 'x', 'y', 'Y', 'z', 'Z'];

  const keyboard = [1, '!', 2, '@', 3, 4, '$', 5, '%', 6, '^', 7, 8, '*', 9, '(', 0, 'q', 'Q', 'w', 'W', 'e',
    'E', 'r', 't', 'T', 'y', 'Y', 'u', 'i', 'I', 'o', 'O', 'p', 'P', 'a', 's', 'S',
    'd', 'D', 'f', 'g', 'G', 'h', 'H', 'j', 'J', 'k', 'l', 'L', 'z', 'Z', 'x', 'c',
    'C', 'v', 'V', 'b', 'B', 'n', 'm'];

  const map = { sprite: {}, volume: volume / 100 };

  ordered.forEach((item, index) => {
    map.sprite[item] = [(index * 7652), 7648];
  });

  const [play] = useSound(keys, map);
  const [beat] = useSound(metronome, { volume: volume / 100 });
  useKeyboardBindings(play, setKey, splash, keyboard);

  const controlBeat = () => {
    if (isBeating === false) setBeat(true);
    beat();
    const bpmTime = setTimeout(controlBeat, 60000 / bpm);
    setTime(bpmTime);
  };

  const clickPlay = (key) => {
    play({ id: key });
    setKey(key);
  }

  const clearSplash = () => {
    setFade(true);
    setTimeout(() => setSplash(false), 900);
  };

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
        <div id='splash' onClick={clearSplash} className={fade ? 'removed' : ''}>
          <div id='logoHolder'>
            <img id='splashLogo' className='noselect' src='/svg/logo.svg' alt='Logo' />
            <span id='splashText'>mélodie</span>
          </div>

          <div id='splashBottom'>
            <span id='left'>Welcome to the next generation of music creation</span>

            <div id='right'>
              <div className='material'>touch_app</div>
              <span>click to continue...</span>
            </div>
          </div>
        </div>
      : null}

      <div id='top'>
        <div id='container'>
          <img id='logo' className='noselect' src='/svg/logo.svg' alt='Logo' />
          <span>mélodie</span>
        </div>

        <img id='triangle' className='effects noselect' src='/svg/triangle.svg' alt='Visual Effect' />
      </div>

      <div id='middle'>

        <div id='controls'>
          <div id='metronome'>
            <img id='metroIcon' className='noselect' src='/svg/metronome.svg' alt='Metronome Icon' />
            <input type="text" id='bpmInput' onChange={(e) => e.target.value < 1000 ? setBpm(e.target.value) : {}} style={{width: ((bpm.length) * 13.5).toString() + 'px'}} value={bpm}></input>
            <span id='beats'>beats</span>
            <div id='play' onClick={() => isBeating ? (clearTimeout(timeout), setBeat(false)) : controlBeat()}>
              <span className='material'>{isBeating ? 'pause' : 'play_arrow'}</span>
            </div>
          </div>
          <div id='volumeWrap'>
            <span className='material' id='volumeIcon'>volume_up</span>
            <input onChange={(e) => { setVolume(e.target.value) }} type='range' min='1' max='100' value={volume} className='slider' id='volume' />
          </div>
        </div>

        <div id='keyboard'>
          {keyboard.map((d, i) =>
            d !== d.toString().toUpperCase() ?
              <div id={'section-' + d.toString()} className='section'>
                <div onMouseDown={() => clickPlay(d.toString())} id={'key-' + d.toString()} className='key'>
                  <span className='noselect'>{d}</span>
                </div>
                {(() => {
                  if (i + 1 < keyboard.length && keyboard[i + 1] === keyboard[i + 1].toString().toUpperCase()) {
                    return <div onMouseDown={() => clickPlay(keyboard[i + 1].toString())} id={i + 1} className='black_key'>
                      <span className='noselect'>{keyboard[i + 1]}</span>
                    </div>
                  }
                })()}
              </div>
              : null
          )}
        </div>
      </div>

      <div id='bottom'>
        <div id='noteWrap'>
          <img id='note' className='effects noselect' src='/svg/notecircle.svg' alt='Note Circle' />
          <span id='current'>{currentKey}</span>
        </div>
      </div>
      <img id='tricircle' className='effects noselect' src='/svg/tricircle.svg' alt='Visual Effect' />
      <img id='polygon' className='effects noselect' src='/svg/polygon.svg' alt='Visual Effect' />
    </div>
  );
}

export default App;

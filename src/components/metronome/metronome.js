import { useState } from 'react';
import useSound from 'use-sound';
import './metronome.css';
import { sanitiseBeat } from '../../helpers';

import metronome from "../../sounds/metronome.mp3";

function Metronome(props) {
  let [isBeating, setBeat] = useState(false);
  let [timeout, setTime] = useState('50');
  let [bpm, setBpm] = useState('50');

  const [beat] = useSound(metronome, { volume: props.volume / 100 });

  const controlBeat = () => {
    if (isBeating === false) setBeat(true);
    beat();
    const bpmTime = setTimeout(controlBeat, 60000 / bpm);
    setTime(bpmTime);
  };

  return (
    <div id='metronome'>
      <img id='metroIcon' className='noselect' src='/svg/metronome.svg' alt='Metronome Icon' />
      <input type="text" id='bpmInput' data-testid="bpmText" onBlur={() => { if(bpm === '') setBpm('1') }} 
        onChange={(e) => setBpm(sanitiseBeat(bpm, e.target.value))}
        style={{ width: ((bpm.length) * 13.5).toString() + 'px' }}
        value={bpm}></input>

      <span data-testid="beatText" id='beats'>beats</span>
      <div data-testid="playButton" id='play' onClick={() => isBeating ? (clearTimeout(timeout), setBeat(false)) : controlBeat()}>
        <span data-testid="playIcon" className='material'>{isBeating ? 'pause' : 'play_arrow'}</span>
      </div>
    </div>
  );
}

export default Metronome;
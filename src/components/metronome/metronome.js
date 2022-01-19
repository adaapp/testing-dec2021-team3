import { useState } from 'react';
import useSound from 'use-sound';

// Helper function
import { sanitiseBeat } from '../../helpers';

// Import styling for this page
import './metronome.css';

// Import sound for the Metronome's beat
import metronome from "../../sounds/metronome.mp3";

function Metronome(props) {
  let [isBeating, setBeat] = useState(false);
  let [timeout, setTime] = useState('50');
  let [bpm, setBpm] = useState('50');

  // use-sound react hook and Howler.js to play beats
  const [beat] = useSound(metronome, { volume: props.volume / 100 });

  const controlBeat = () => {
    setBeat(true);
    beat(); // 1 single beat plays
    // Interval between each beat
    const bpmTime = setTimeout(controlBeat, 60000 / bpm);
    setTime(bpmTime); // Used to check the current interval state
  };

  const handleSet = (e) => {
    if(isBeating) {
      clearTimeout(timeout)
      setBeat(false);
    }

    setBpm(sanitiseBeat(bpm, e.target.value))
  }

  return (
    <div id='metronome'>
      <img id='metroIcon' className='noselect' src='/svg/metronome.svg' alt='Metronome Icon' />
      <input type="text" id='bpmInput' data-testid="bpmText" onBlur={() => { if(bpm === '') setBpm('1') }} 
        onChange={handleSet} style={{ width: ((bpm.length) * 13.5).toString() + 'px' }}
        value={bpm}></input>

      <span data-testid="beatText" id='beats'>beats</span>
      <div data-testid="playButton" id='play' onClick={() => isBeating ? (clearTimeout(timeout), setBeat(false)) : controlBeat()}>
        <span data-testid="playIcon" className='noselect material'>{isBeating ? 'pause' : 'play_arrow'}</span>
      </div>
    </div>
  );
}

export default Metronome;
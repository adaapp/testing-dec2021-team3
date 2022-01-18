import useSound from 'use-sound';
import { useEffect } from 'react';
import keys from "../../sounds/keys.mp3";
import './keyboard.css';

const useKeyboardBindings = (play, setKey, splash, keys) => {
    useEffect(() => {
      if(!splash) {
        const keyHandler = e => {
          if(document.activeElement.id !== 'bpmInput' && keys.includes(e.key)) {
            play({ id: e.key });
            setKey(e.key);

            let element;

            document.getElementById('key-' + e.key) ?
                element = [document.getElementById('key-' + e.key), 0]
                : element = [document.getElementById('black-' + e.key), 1];
    
            if(element[0].classList.contains('keyPressed') 
                || element[0].classList.contains('blackPressed')) {

                element[0].style.animation = 'none';
                setTimeout(function(){ 
                    element[0].style.animation = '';
                }, 1); 
            } else {
                element[1] ? element[0].classList.add('blackPressed')
                : element[0].classList.add('keyPressed');
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

function Keyboard(props) {
    const ordered = ['$', 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'B', 'c', 'C', 'd', 'D', 'e', 'E',
                     'f', 'g', 'G', 'h', 'H', 'i', 'I', 'j', 'J', 'k', 'l', 'L', 'm', '!', '%', '(',
                     '*', '@', '^', 'n', 'o', 'O', 'p', 'P', 'q', 'Q', 'r', 's', 'S', 't', 'T', 'u',
                     'v', 'V', 'w', 'W', 'x', 'y', 'Y', 'z', 'Z'];

    const keyboard = ['1', '!', '2', '@', '3', '4', '$', '5', '%', '6', '^', '7', '8', 
                      '*', '9', '(', '0', 'q', 'Q', 'w', 'W', 'e', 'E', 'r', 't', 'T', 'y', 'Y', 'u',
                      'i', 'I', 'o', 'O', 'p', 'P', 'a', 's', 'S', 'd', 'D', 'f', 'g', 'G', 'h', 'H',
                      'j', 'J', 'k', 'l', 'L', 'z', 'Z', 'x', 'c', 'C', 'v', 'V', 'b', 'B', 'n', 'm'];

    const map = { sprite: {}, volume: props.volume / 100 };

    const [play] = useSound(keys, map);
    useKeyboardBindings(play, props.setKey, props.splash, keyboard);

    ordered.forEach((item, index) => {
      map.sprite[item] = [(index * 7652), 7648];
    });
  
    const clickPlay = (key) => {
        play({ id: key });
        props.setKey(key);
    };

    return (
        <div id='keyboard'>
          {keyboard.map((d, i) =>
            !isNaN(d) || d !== d.toUpperCase() ?
              <div id={'section-' + d.toString()} key={'list-' + d.toString()} className='section'>
                <div onMouseDown={() => clickPlay(d.toString())} id={'key-' + d.toString()} className='key'>
                  <span data-testid={'white-' + d} className='noselect'>{d}</span>
                </div>
                {(() => {
                  if (i + 1 < keyboard.length && keyboard[i + 1] === keyboard[i + 1].toString().toUpperCase()) {
                    return <div onMouseDown={() => clickPlay(keyboard[i + 1].toString())} id={'black-' + keyboard[i+1].toString()} className='black_key'>
                      <span data-testid={'black-' + keyboard[i + 1]} className='noselect'>{keyboard[i + 1]}</span>
                    </div>
                  }
                })()}
              </div>
              : null
          )}
        </div>
    );
};

export default Keyboard;
import { useState } from 'react';
import './splash.css';

function Splash(props) {
    let [fade, setFade] = useState(false);
    
    const clearSplash = () => {
        setFade(true);
        setTimeout(() => props.setSplash(false), 900);
    };

    return (
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
    );
}

export default Splash;
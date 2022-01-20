import { useState } from 'react';
import './splash.css';

function Splash(props) {
    let [fade, setFade] = useState(false);

    const clearSplash = () => {
        setFade(true);
        setTimeout(() => props.setSplash(false), 900);
    };

    return (
        <div id='splash' data-testid="screen" onClick={clearSplash} className={fade ? 'removed' : ''}>
            <div id='logoHolder'>
                <img id='splashLogo' className='noselect' src='/svg/logo.svg' alt='Logo' />
                <span data-testid="appName" id='splashText'>mélodie</span>
            </div>

            <div id='piano'>
                <div id='pianoHolder'>
                    <div id='keyHeader'>
                        <span data-testid="helper" id='playHelp'>Play the virtual keys using your keyboard, or by clicking on them!</span>

                        <div id='splashBottom'>
                            <div data-testid="material-click" className='material' id='touchIcon'>touch_app</div>
                            <span id='continueClick' data-testid="click">click to continue...</span>
                        </div>
                    </div>

                    <img id='pianoImage' className='noselect' src='/piano.png' alt='Piano Illustration' />
                </div>
            </div>
        </div>
    );
}

export default Splash;
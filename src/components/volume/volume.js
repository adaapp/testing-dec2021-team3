// Imports the CSS for this page
import './volume.css';

function Volume(props) {

    /* The following function sets the volume for the keyboard 
    and metronome. Howler.js currently has some issues revolving
    sprites and setting the volume before the package and other
    components are loaded. To fix this issue, the function sets
    the volume to a separate stateful variable 'volume' and 
    directly changes the volume of the Howler instance at the
    same time. */

    function handleVolume(e){
        props.setVolume(e.target.value);
        if(props.data.sound) props.data.sound.volume(e.target.value/100);
    };

    return (
        <div id='volumeWrap'>
            <span data-testid="volumeMaterial" className='material noselect' id='volumeIcon'>volume_up</span>
            
            <input data-testid="sliderItem" onChange={handleVolume} 
                   type='range' min='1' max='100' value={props.volume} 
                   className='slider' id='volume' />
        </div>
    );
}

export default Volume;
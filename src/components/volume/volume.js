import './volume.css';

function Volume(props) {

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
import './volume.css';

function Volume(props) {
    return (
        <div id='volumeWrap'>
            <span data-testid="volumeMaterial" className='material' id='volumeIcon'>volume_up</span>
            
            <input data-testid="sliderItem" onChange={(e) => { props.setVolume(e.target.value) }} 
                   type='range' min='1' max='100' value={props.volume} 
                   className='slider' id='volume' />
        </div>
    );
}

export default Volume;
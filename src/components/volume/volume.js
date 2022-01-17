import './volume.css';

function Volume(props) {
    return (
        <div id='volumeWrap'>
            <span className='material' id='volumeIcon'>volume_up</span>
            
            <input onChange={(e) => { props.setVolume(e.target.value) }} 
                   type='range' min='1' max='100' value={props.volume} 
                   className='slider' id='volume' />
        </div>
    );
}

export default Volume;
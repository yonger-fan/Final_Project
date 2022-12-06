import React, { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'

function SongScreen(props) {
    const { store } = useContext(GlobalStoreContext);
    const { song, index } = props;


    let cardClass = "list-card unselected-list-card";
    return (
        <div className='card-size'>
        <div
            key={index}
            id={'song-' + index + '-card'}
            className={"cardClass2"}
        >
            {index + 1}.
            <a
                id={'song-' + index + '-link'}
                className="song-link"
                href={"https://www.youtube.com/watch?v=" + song.youTubeId}>
                {song.title} by {song.artist}
            </a>
        </div>
        </div>
    );
}

export default SongScreen;
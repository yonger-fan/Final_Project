import { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import SongCard from './SongCard.js'
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import { GlobalStoreContext } from '../store/index.js'
import SongScreen from './SongScreen.js';
/*
    This React component lets us edit a loaded list, which only
    happens when we are on the proper route.
    
    @author McKilla Gorilla
*/
function SongspaceScreen() {
    const { store } = useContext(GlobalStoreContext);
    store.history = useHistory();
    
    return (
        <Box>
            {
                store.currentList.songs.map((song, index) => (
                    <SongScreen
                        id={'playlist-song-' + (index)}
                        key={'playlist-song-' + (index)}
                        index={index}
                        song={song}
                    />
                ))  
            }           
         </Box>
    )
}

export default SongspaceScreen;
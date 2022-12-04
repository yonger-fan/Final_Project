import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import { Typography } from '@mui/material'
import AuthContext from '../auth'


/*
    Our Status bar React component goes at the bottom of our UI.
    
    @author McKilla Gorilla
*/
function Statusbar() {
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);
    console.log("logged in: " +  auth.loggedIn);
    let text ="";
    if (auth.loggedIn && store.currentList){
        text = store.currentList.name;
    return (
        <div id="playlister-statusbar">
            {text}
        </div>
    );
    }
    return null;
}
export default Statusbar;
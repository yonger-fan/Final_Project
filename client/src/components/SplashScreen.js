import Typography from '@mui/material/Typography';
import PauseIcon from '@mui/icons-material/Pause';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SlowMotionVideoSharpIcon from '@mui/icons-material/SlowMotionVideoSharp';
import Button from '@mui/material/Button';
import { useContext } from 'react';
import { useState } from 'react';
import { GlobalStoreContext } from '../store'
import AuthContext from '../auth'
import { useHistory } from 'react-router-dom';



export default function SplashScreen() {
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);

    const history = useHistory();

    const handleLogin = (event) => {
        history.push("/login/");

    };

    const handleGuest = (event) => {
        history.push("/screen/");
    }


    const handleCreate = (event) => {
        history.push("/register/");

    };

    return (
        <div id="splash-screen">
            <span class = "logo">
            <SlowMotionVideoSharpIcon/>
            </span>
            <span>
            Welcome to Playlister
            </span> 
            <div class="star-ratings">
            <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
            </div>
            <br></br>
            <Typography component="h1" variant="h5">
            Get ready? Create and share your favorite 
            <br></br> 
            playlists and enjoy the playlists from other 
            <br></br>
            players. Can't wait for it!
            </Typography>
            <Typography  component="h1" variant="h3" >
            <SkipPreviousIcon/><PauseIcon/><SkipNextIcon/>
            </Typography>
            <Button 
                class = "splashScreen-buttom"
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleCreate}
                >
                    Create Account
            </Button>
            <br></br>
            <Button 
                class = "splashScreen-buttom"
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleLogin}
                >
                    Login
            </Button>
            <br></br>
            <Button 
                class = "splashScreen-buttom"
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleGuest}
                >
                    Continue as Guest
            </Button>
            <div class = "auther">
                by Yonger Fan
            </div>
        </div>
    )
}
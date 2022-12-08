import React, { useContext, useEffect, useState } from 'react'
import { GlobalStoreContext } from '../store'
import AuthContext from '../auth';
import ListCard from './ListCard.js'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import List from '@mui/material/List';
import Box from '@mui/material/Box'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'
import SortOutlinedIcon from '@mui/icons-material/SortOutlined'
import Button from '@mui/material/Button';
import YouTubePlayerExample from './player';
import CommentPlace from './comment';
import { IconButton } from '@mui/material';
import { useHistory } from 'react-router-dom';
import UserCard from './UserCard';



export default function UsersScreen() {
    const { store } = useContext(GlobalStoreContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const [isplayer, setIsPlayer] = useState(false);
    const [isUsers, setIsUsers] = useState(false);
    const isMenuOpen = Boolean(anchorEl);
    const history = useHistory();
    const { auth } = useContext(AuthContext);

    useEffect(() => {
        store.loadIdNamePairs();
    }, []);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    function handleComment() {
        setIsPlayer(true);
    }

    function handleHomeScreen() {
        history.push("/homescreen/");
    }

    function handleAllLists() {
        history.push("/screen/");
    }

    function handlePlayer() {
        setIsPlayer(false);
    }

    const menuId = 'primary-search-account-menu';

    let listCard = " ";
    if (store) {
        listCard = 
            <List sx={{width: '100%', bgcolor: 'background.paper', mb:"20px" }}>
            {
              store.idNamePairs.filter(pair => pair.publish).map((pair) => (
                    <UserCard
                        key={pair._id}
                        idNamePair={pair}
                        selected={false}
                        publish = {pair.publish}
                        publishDate = {pair.publishDate}
                        likes = {pair.likes}
                        disLikes = {pair.disLikes}
                        listens={pair.listens}
                        commentObject = {pair.commentObject}
                    />
                ))
                
            }
            
            </List>;
    }

    const sortByMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>Name(A-Z)</MenuItem>
            <MenuItem onClick={handleMenuClose}>Publish Date(Newest)</MenuItem>
            <MenuItem onClick={handleMenuClose}>Listens(High - Low)</MenuItem>
            <MenuItem onClick={handleMenuClose}>Likes(High - Low)</MenuItem>
            <MenuItem onClick={handleMenuClose}>Dislikes(High - Low)</MenuItem>
        </Menu>
    )
    let menu = sortByMenu;

    
    

    return (
        <div>
        <div id = "leftHome-layout">
        <Button sx={{transform:"translate(10%, 30%)"}}
                color="primary" 
                disabled={!auth.loggedIn}
                onClick = {handleHomeScreen}
                
            >
                <HomeOutlinedIcon />
        </Button>
        <Button sx={{transform:"translate(10%, 30%)"}}
                color="primary" 
                onClick={handleAllLists}
            >
                <GroupsOutlinedIcon />
        </Button>
        <Button sx={{transform:"translate(10%, 30%)"}}
                color="primary" 
                
            >
                <PersonOutlineOutlinedIcon />
        </Button>
        <Box sx={{transform:"translate(50%, -60%)"}} >
        <input type="text" placeholder="Search.." ></input>
        </Box>
        <Box sx={{bgcolor:"background.paper"}} id="list-selector-list" overflow={"scroll"}>
                {
                    listCard
                }
                
            </Box>
        </div>

        <div id = "rightHome-layout">
        <div class = "splashScreen-buttom">


        <Box sx={{transform:"translate(0%, 30%)"}} >
            Sort By
            <Button 
                color="primary"
                onClick={handleProfileMenuOpen}
            >
                <SortOutlinedIcon />
                </Button>
                {sortByMenu}
            </Box>
        </div>


        <IconButton onClick = {(event) => {handlePlayer()}}>player</IconButton>
        <IconButton onClick = {(event) => {handleComment()}}>comment</IconButton>
        {isplayer? <CommentPlace/>: <YouTubePlayerExample/>}

        
        </div>
        <div id = "add-list-position">
            User Screen
        </div>
    </div>
    )
}
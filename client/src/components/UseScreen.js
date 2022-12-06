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



export default function UsersScreen() {
    const { store } = useContext(GlobalStoreContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const [isplayer, setIsPlayer] = useState(false);
    const [isUsers, setIsUsers] = useState(false);
    const isMenuOpen = Boolean(anchorEl);
    const history = useHistory();
    const { auth } = useContext(AuthContext);

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
            Users Screen
        </div>
    </div>
        )
}

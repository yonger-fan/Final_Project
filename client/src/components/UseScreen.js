import React, { useContext, useEffect, useState } from 'react'
import { GlobalStoreContext } from '../store'
import ListCard from './ListCard.js'
import MUIDeleteModal from './MUIDeleteModal'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab'
import List from '@mui/material/List';
import Box from '@mui/material/Box'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'
import SortOutlinedIcon from '@mui/icons-material/SortOutlined'
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import YouTubePlayerExample from './player';
import CommentPlace from './comment';
import AllListsScreen from './AllListsScreen';
import HomeScreen from './HomeScreen';
import { IconButton } from '@mui/material';

export default function UserScreen() {
    const { store } = useContext(GlobalStoreContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const [isplayer, setIsPlayer] = useState(false);
    const [isAllList, setIsAllList] = useState(false);
    const isMenuOpen = Boolean(anchorEl);

    useEffect(() => {
        store.loadIdNamePairs();
    }, []);

    function handleComment() {
        setIsPlayer(true);
    }

    function handleCreateNewList() {
        store.createNewList();
    }

    function handleAllLists() {
        setIsAllList(true);
    }

    function handleHomeScreen() {
        setIsAllList(false);
    }


    function handlePlayer() {
        setIsPlayer(false);
    }

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };
    const menuId = 'primary-search-account-menu';

    let listCard = "";
    if (store) {
        listCard = 
            <List sx={{width: '100%', bgcolor: 'background.paper', mb:"20px" }}>
            {
                store.idNamePairs.map((pair) => (
                    <ListCard
                        key={pair._id}
                        idNamePair={pair}
                        selected={false}
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
        {isAllList? <AllListsScreen/>:<HomeScreen/>}
        <div id = "leftHome-layout">
        <Button sx={{transform:"translate(10%, 30%)"}}
                color="primary" 
                onClick={handleHomeScreen}
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
            <input
                type = "button"
                id = "add-list"
                onClick = {handleCreateNewList}
                value="+" />
            Your Lists
        </div>
    </div>
        )
}
import React, { useContext, useEffect, useState } from 'react'
import { GlobalStoreContext } from '../store'
import ListCard from './ListCard.js'
import MUIDeleteModal from './MUIDeleteModal'
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
import { useHistory } from 'react-router-dom';
import { IconButton } from '@mui/material';


const HomeScreen = () => {
    const { store } = useContext(GlobalStoreContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const [isplayer, setIsPlayer] = useState(false);
    
    const isMenuOpen = Boolean(anchorEl);
    const history = useHistory();

    useEffect(() => {
        store.loadIdNamePairs();
    }, []);

    function handleCreateNewList() {
        store.createNewList();
    }

    function handleComment() {
        setIsPlayer(true);
    }

    function handleAllLists() {
        history.push("/screen/");
    }

    function handleUsers() {
        history.push("/userscreen/");
    }

    function handlePlayer() {
        setIsPlayer(false);
    }

    function handleNameSorting () {
        
    }

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };


    const handleMenuClose = () => {
        setAnchorEl(null);
    };
    const menuId = 'primary-search-account-menu';

    let listCard = ""
    if (store) {
        listCard = 
            <List sx={{width: '100%', bgcolor: 'background.paper', mb:"20px" }}>
            {
                store.idNamePairs.map((pair) => (
                    <ListCard
                        key={pair._id}
                        idNamePair={pair}
                        selected={false}
                        publish = {pair.publish}
                        publishDate = {pair.publishDate}
                        likes = {pair.likes}
                        disLikes = {pair.disLikes}
                        listens = {pair.listens}
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
            <MenuItem onClick={handleNameSorting}>Name(A-Z)</MenuItem>
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
                onClick={handleCreateNewList}
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
                onClick={handleUsers}
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
                <MUIDeleteModal />
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

export default HomeScreen;
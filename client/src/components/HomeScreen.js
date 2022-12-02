import React, { useContext, useEffect } from 'react'
import { GlobalStoreContext } from '../store'
import ListCard from './ListCard.js'
import MUIDeleteModal from './MUIDeleteModal'

import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab'
import List from '@mui/material/List';
import Box from '@mui/material/Box'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'
import SortOutlinedIcon from '@mui/icons-material/SortOutlined'
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const HomeScreen = () => {
    const { store } = useContext(GlobalStoreContext);

    useEffect(() => {
        store.loadIdNamePairs();
    }, []);

    function handleCreateNewList() {
        store.createNewList();
    }
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
                onClick={handleCreateNewList}
            >
                <GroupsOutlinedIcon />
        </Button>
        <Button sx={{transform:"translate(10%, 30%)"}}
                color="primary" 
                onClick={handleCreateNewList}
            >
                <PersonOutlineOutlinedIcon />
        </Button>
        <Box sx={{transform:"translate(50%, -60%)"}} >
        <input type="text" placeholder="Search.." ></input>
        </Box>
            <Box sx={{bgcolor:"background.paper"}} id="list-selector-list">
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
                onClick={handleCreateNewList}
            >
                <SortOutlinedIcon />
                </Button>
            </Box>

        </div>

        <input
                type = "button"
                id = "player-button"
                value="player" />

        <input
                type = "button"
                id = "player-button"
                onClick = {handleCreateNewList}
                value="comment" />


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
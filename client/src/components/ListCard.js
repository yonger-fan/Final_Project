import { useContext, useState} from 'react'
import { GlobalStoreContext } from '../store'
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import TextField from '@mui/material/TextField';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ThumbDownOffAltOutlinedIcon from '@mui/icons-material/ThumbDownOffAltOutlined';
import KeyboardDoubleArrowDownOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowDownOutlined';
import KeyboardDoubleArrowUpOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowUpOutlined';
import { Collapse } from '@mui/material';
import WorkspaceScreen from './WorkspaceScreen';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import AuthContext from '../auth';
import EditToolbar from './EditToolbar';
import SongspaceScreen from './SongSpaceScreen';
/*
    This is a card in our list of top 5 lists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
    
    @author McKilla Gorilla
*/
function ListCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    const [editActive, setEditActive] = useState(false);
    const [open, setOpen] = useState(false);
    const [text, setText] = useState("");
    const { idNamePair, selected, publish, publishDate,likes, disLikes } = props;

    function handleClose() {
        store.closeCurrentList();
    }

    function handleLikes(event, id) {
        store.editLikes(id);
    }

    function handleDisLikes(event, id){
        store.editDisLikes(id);
    }

    function handlePublish(event) {
        store.setPublishDate(idNamePair._id);
        console.log("publish date " + publishDate);
    }


    function handleLoadList(event, id) {
        console.log("handleLoadList for " + id);
        if (!event.target.disabled) {
            let _id = event.target.id;
            if (_id.indexOf('list-card-text-') >= 0)
                _id = ("" + _id).substring("list-card-text-".length);

            console.log("load " + event.target.id);

            // CHANGE THE CURRENT LIST
            store.setCurrentList(id);
        }
    }

    function handleToggleEdit(event) {
        event.stopPropagation();
        toggleEdit();
    }

    function toggleEdit() {
        let newActive = !editActive;
        if (newActive) {
            store.setIsListNameEditActive();
        }
        setEditActive(newActive);
    }

    async function handleDeleteList(event, id) {
        event.stopPropagation();
        let _id = event.target.id;
        _id = ("" + _id).substring("delete-list-".length);
        store.markListForDeletion(idNamePair._id);
    }

    function handleKeyPress(event) {
        if (event.code === "Enter") {
            let id = event.target.id.substring("list-".length);
            store.changeListName(id, text);
            toggleEdit();
        }
    }
    function handleUpdateText(event) {
        setText(event.target.value);
    }

    function handleToogleopen(event){
       // if (store.currentList != null){setOpen(!open);}
       setOpen(!open);
    }


    let selectClass = "unselected-list-card";
    if (selected) {
        selectClass = "selected-list-card";
    }
    let cardStatus = false;
    if (store.isListNameEditActive) {
        cardStatus = true;
    }

    let cardElement =
    <div>
       <ListItem
            id={idNamePair._id}
            key={idNamePair._id}
            sx={{p: "10px", bgcolor: '#8000F00F', marginTop: '15px', display: 'flex', p: 1}}
            className = {"playlist-card"}
            
            onClick={(event) => {
                handleLoadList(event, idNamePair._id)}} 
            onDoubleClick = {(event) => {
                handleToggleEdit(event)}}
                aria-label='edit'         
        >
            <Box sx={{ p: 1, flexGrow: 1, fontSize: "18px", textAlign: "left" }}>{idNamePair.name} 
            <Box> by: {auth.user.firstName} {auth.user.lastName}</Box>
            <Box> {publish? <Box>published: {publishDate}</Box> : null}</Box></Box>
            {publish? <Box sx={{ p: 1, fontSize: "14pt" }}>
                <IconButton onClick={(event) => handleLikes(event, idNamePair._id)}>
                <ThumbUpAltOutlinedIcon style={{fontSize:'14pt'}} />
                </IconButton>
                {likes}
            </Box> :  <Box sx={{ p: 1, fontSize: "14pt" }}>
                <IconButton>
                <ThumbUpAltOutlinedIcon style={{fontSize:'14pt'}} />
                </IconButton>
                {likes}
            </Box>}
            {publish? <Box sx={{ p: 1, fontSize: "14pt" }}>
                <IconButton onClick={(event) => {
                        handleDisLikes(event, idNamePair._id)
                    }} >
                    <ThumbDownOffAltOutlinedIcon style={{fontSize:'14pt'}}/>
                </IconButton>
                {disLikes}
            </Box>: <Box sx={{ p: 1, fontSize: "14pt" }}>
                <IconButton>
                    <ThumbDownOffAltOutlinedIcon style={{fontSize:'14pt'}}/>
                </IconButton>
                {disLikes}
            </Box>}
            
            <Box
            sx={{ p: 1, transform:"translate(0%, 40%)" }}>
                <IconButton >
                {open? null: <KeyboardDoubleArrowDownOutlinedIcon onClick = {(event) => {
                    handleToogleopen(event);
                    handleLoadList(event, idNamePair._id)}}/>}
                </IconButton>
            </Box>
        </ListItem>
        {publish? 
        <Collapse in = {open} unmountOnExit>
        <div class = "expanded">
        <div class = "expanded-grid">
        {store.currentList? <SongspaceScreen/>: null}   
                </div> 
                <Box sx = {{transform:"translate(1.4%, 98%)"}}>
                <Button 
                disabled={!store.canClose()}
                id='close-button'
                onClick = {(event) => {{handleDeleteList(event, idNamePair._id)}}}
                variant="contained">
                    Duplicate
                </Button>
                </Box>
                </div>
                <Box
            sx={{ p: 1, transform:"translate(90%, 20%)" }}>
                <IconButton onClick={(event) => {
                    handleToogleopen(event);
                    handleClose()
                }}><KeyboardDoubleArrowUpOutlinedIcon/></IconButton>
                </Box>
        </Collapse>
        : 
        <Collapse in = {open} unmountOnExit>
            <div class = "expanded">
            <div class = "expanded-grid" >
                {store.currentList? <WorkspaceScreen/>: null}   
                </div> 
                <Box sx = {{transform:"translate(1.4%, 98%)"}}>
                <Button 
                disabled={!store.canClose()}
                id='close-button'
                onClick = {(event) => {{handleDeleteList(event, idNamePair._id)}}}
                variant="contained">
                    Detete
                </Button>
                <Button 
                disabled={!store.canClose()}
                id='close-button'
                onClick={(event) => {
                    handlePublish(event);
                    handleToogleopen(event);
                }}
                variant="contained">
                    Publish
                </Button>
                </Box>
                <Box sx = {{transform:"translate(-6.6%, 0%)"}}><EditToolbar/></Box>    
                <Box
            sx={{ p: 1, transform:"translate(90%, 20%)" }}>
                <IconButton onClick={(event) => {
                    handleToogleopen(event);
                    handleClose()
                }}><KeyboardDoubleArrowUpOutlinedIcon/></IconButton>
                </Box>
            </div>

        </Collapse>  
        }   
        </div>


    if (editActive) {
        cardElement =
            <TextField
                margin="normal"
                required
                fullWidth
                id={"list-" + idNamePair._id}
                label="Playlist Name"
                name="name"
                autoComplete="Playlist Name"
                className='list-card'
                onKeyPress={handleKeyPress}
                onChange={handleUpdateText}
                defaultValue={idNamePair.name}
                inputProps={{style: {fontSize: 48}}}
                InputLabelProps={{style: {fontSize: 24}}}
                autoFocus
            />
    }
    return (
        cardElement
    );
}

export default ListCard;
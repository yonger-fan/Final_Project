import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import Box from '@mui/material/Box';

export default function CommentPlace() {
    const { store } = useContext(GlobalStoreContext);
    function handleKeyPress(event) {
        
    }

    return (
        <div className = "comment">
        <div className='place-comment-card'>
            <div className ='comment-card'></div>

            </div>
        <Box sx = {{transform: "translate(50%, 0%"}}>
        <input type="text" placeholder="Add Comment"onKeyPress={handleKeyPress} ></input>
            </Box>
        </div>
    )

}
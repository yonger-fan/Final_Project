import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import Box from '@mui/material/Box';
import { ListItem } from '@mui/material';

export default function CommentPlace() {
    const { store } = useContext(GlobalStoreContext);
    function handleKeyPress(event) {
        if (event.code === "Enter") {
            let id = event.target.id.substring("list-".length);
            let text = event.target.value;
            store.addComments(store.currentList._id, text);
        }
    }

    let commentCard = "";
     console.log(store.currentList);
    if (store.currentList) {
        commentCard = store.currentList.commentObject.map(Pair => 
            (
            <div className='comment-card'>
            <div>{Pair.userName}: </div>
            <div>{Pair.comment}</div>
            </div>
            ))
        console.log(commentCard);
    }


    return (
        <div className = "comment">
        <div className='place-comment-card'>
            <div className ='comment-card'></div>
            {commentCard}
            </div>
        <Box sx = {{transform: "translate(50%, 0%"}}>
        <input type="text" placeholder="Add Comment"onKeyPress={handleKeyPress} ></input>
            </Box>
        </div>
    )

}
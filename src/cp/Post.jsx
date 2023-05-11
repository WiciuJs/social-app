import "../StyleApp/Post.css";
import { useState } from "react";
import axios from 'axios';

const Post = (props) => {

    const [likesCount, setLikesCount] = useState(props.post.likes.length)



    const delatePost = (id) => {

        axios
            .post('http://akademia108.pl/api/social-app/user/delate', {
                post_id: id // pobieram post id
            })
            .then((res) => {
                console.log(res)
            })
            .catch((error) => {
                console.error(error)
            });
    };
    return (
        <div className="post">
            <div className="avatar">
                <img src={props.post.user.avatar_url} alt={props.post.user.username} />
            </div>
            <div className="postData">
                <div className="podstMeta">
                    <div className="author">
                        {props.post.user.username}</div>
                    <div className="date">
                        {props.post.created_at.substring(0, 10)}</div>
                </div>
                <div className="postContent">{props.post.content}</div>

                <div className="likes">
                    <button className="btn Delate" onClick={()=>delatePost(props.post.id)}>Delate</button>
                    {likesCount}
                </div>
            </div>

        </div>
    )


}
export default Post;

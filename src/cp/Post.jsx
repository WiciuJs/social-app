import "../StyleApp/Post.css";
import { useState } from "react";
import axios from 'axios';
import "../StyleApp/Buttons.css"

const Post = (props) => {

    const [likesCount, setLikesCount] = useState(props.post.likes.length)
    const [deltePostYes, delatePostNo] = useState(false)



    const delatePost = (id) => {

        axios
            .post("https://akademia108.pl/api/social-app/post/delete"
                , {
                    post_id: id // pobieram post po id
                })
            .then((res) => {
                props.setPosts((posts) => {
                    return posts.filter(post => post.id !== res.data.post_id)
                })
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
                    {props.user?.username === props.post.user.username && <button className="btn Delate" onClick={() => delatePostNo(true)}>Delate</button>
                    }{likesCount}

                    {deltePostYes && <div className="confirmDelete">
                        <h2>Jesteś Pewien ?</h2>
                        <button className="btn yes" onClick={() => delatePost(props.post.id)}>Tak</button>
                        <button className="btn no" onClick={() => delatePostNo(false)}>Nie</button>
                    </div>}


                </div>
            </div>

        </div>
    )


}
export default Post;

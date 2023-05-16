import "../StyleApp/Post.css";
import { useState } from "react";
import axios from 'axios';
import "../StyleApp/Buttons.css"

const Post = (props) => {

    const [likesCount, setLikesCount] = useState(props.post.likes.length)
    const [deltePostYes, delatePostNo] = useState(false)
    const [doesUserLiked, setDoesUserLiked] = useState(props.post.likes.filter(like => like.username === props.user?.username).length !== 0);



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

    const likePost = (id, isLiked) => {
        axios.post("https://akademia108.pl/api/social-app/post/" + (isLiked ? 'dislike' : 'like'), {
            post_id: id
        })
            .then(() => {
                setLikesCount(likesCount + (isLiked ? -1 : 1));
                setDoesUserLiked(!isLiked);
            });
    };


    const unfollow = (id) => {
        axios.post("https://akademia108.pl/api/social-app/follows/disfollow", {
            leader_id: id,
        })
            .then(() => {
                props.getLatestPosts();
            })
            .catch((error) => {
                console.log(error);
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
                    }
                    {props.user && (
                        <button
                            className='btn'
                            onClick={() => likePost(props.post.id, doesUserLiked)}
                        >
                            {doesUserLiked ? 'Dislike' : 'Like'}
                        </button>
                    )}
                    {likesCount}
                    {props.user && props.user.username !== props.post.user.username && (
                        <button
                            className='btn unfllow'
                            onClick={() => unfollow(props.post.user.id)}
                        >
                            Unfollow
                        </button>
                    )}
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

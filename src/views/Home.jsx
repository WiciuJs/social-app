import '../StyleApp/Buttons.css';
import '../StyleApp/Home.css';
import { useEffect, useState } from "react";
import axios from 'axios';
import Post from "../cp/Post";
import AddPost from '../cp/AddPost';
const Home = (props) => {

  const [posts, setPosts] = useState([]);

  const getLatestPosts = () => {
    axios
      .post('http://akademia108.pl/api/social-app/post/latest')
      .then((res) => {
        setPosts(res.data)
      })
      .catch((error) => {
        console.error(error)
      });
  };

  const getNextPosts = () => {
    axios
      .post('http://akademia108.pl/api/social-app/post/older-then', {
        date: posts[posts.length - 1].created_at
      })
      .then((res) => {
        setPosts(posts.concat(res.data))
      })
      .catch((error) => {
        console.error(error)
      });
  };
  console.log(posts.created_at)
  const getPrevPosts = () => {
    axios
      .post("https://akademia108.pl/api/social-app/post/newer-then", {
        date: posts[0].created_at, // pobieramy obiek 0
      })
      .then((res) => {
        let resData = res.data
        setPosts(resData.concat(posts)) // przekaznaie na początek i +stan
      })
      .catch((error) => {
        console.error(error)
      })
  }


  useEffect(() => {
    getLatestPosts()
  }, [props.user]);


  return (
    <div className="Home">
      {props.user && <AddPost getPrevPosts={getPrevPosts} />}
      <div className="postList">{posts.map((post) => {
        return <Post post={post} key={post.id} />
      })}
        <button className="btn loadMore" onClick={getNextPosts}>Load More</button>
      </div>
    </div>
  );
};
export default Home;
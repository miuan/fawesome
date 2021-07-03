import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../../../logo.svg";
// import { Counter } from './features/counter/Counter';
import "./Home.css";
import { Post, TPostModel } from "./Post";

function Home() {
  // const posts: Post[] = [{ text: "Initial post " }];
  const [posts, setPosts] = useState<TPostModel[]>([]);
  const [text, setText] = useState<string>("");
  //let text = "";

  const addPost = () => {
    // const newPosts = [];
    // for (const p of posts) {
    //   newPosts.push(p);
    // }
    // newPosts.push({ id: posts.length + 1, text: "Post " });
    const newPosts = [...posts, { id: posts.length + 1, text: text }];

    setText("");
    setPosts(newPosts);
  };

  const onTextChange = (event: any) => {
    setText(event.target.value);
    //text = event.target.value;
  };

  return (
    <div className="App">
      <div><Link to={'/posts'}> Posts </Link></div>
      <div><Link to={'/posts2'}> Posts V2</Link></div>
    </div>
  );
}

export default Home;

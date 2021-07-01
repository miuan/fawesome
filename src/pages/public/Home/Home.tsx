import React, { useState } from "react";
import { Button } from "react-bootstrap";
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
      <h4>Add Post</h4>
      <input type="text" value={text} onChange={onTextChange} />
      <Button onClick={addPost}>Add Post</Button>

      <h4>Post</h4>
      {posts.map((post, idx) => (
        <div key={idx}>
          <Post post={post} />
        </div>
      ))}
    </div>
  );
}

export default Home;

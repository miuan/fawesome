import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import DeleteModal, { IDeleteModalParams } from '../../../components/DeleteModal/DeleteModal'
import logo from '../../../logo.svg'
// import { Counter } from './features/counter/Counter';
import './Home.css'
import { Post, TPostModel } from './Post'

function Posts() {
  // const posts: Post[] = [{ text: "Initial post " }];
  const [posts, setPosts] = useState<TPostModel[]>([])
  const [text, setText] = useState<string>('')
  const [postForRemoveId, setPostForRemoveId] = useState<TPostModel['id']>()
  //let text = "";

  const addPost = () => {
    // const newPosts = [];
    // for (const p of posts) {
    //   newPosts.push(p);
    // }
    // newPosts.push({ id: posts.length + 1, text: "Post " });
    const newPosts = [...posts, { id: posts.length + 1, text: text }]

    setText('')
    setPosts(newPosts)
  }

  const onTextChange = (event: any) => {
    setText(event.target.value)
    //text = event.target.value;
  }

  const showDeleteModal = (id: TPostModel['id']) => {
    setPostForRemoveId(id)
  }

  const onDelete: IDeleteModalParams['onDelete'] = (id) => {
    setPosts(posts.filter((post) => post.id !== id))
    setPostForRemoveId(undefined)
  }

  const onDeleteModalHide = () => {
    setPostForRemoveId(undefined)
  }

  return (
    <div className="App">
      <h4>Add Post</h4>
      <input type="text" value={text} onChange={onTextChange} />
      <Button onClick={addPost}>Add Post</Button>

      <h4>Post</h4>
      {posts.map((post, idx) => (
        <div key={idx}>
          {post.id} {post.text}{' '}
          <Button
            size={'sm'}
            variant={'danger'}
            onClick={() => {
              showDeleteModal(post.id)
            }}
          >
            Remove
          </Button>
        </div>
      ))}

      <DeleteModal
        show={!!postForRemoveId}
        categoryName={'Posts'}
        onDelete={onDelete}
        onHide={onDeleteModalHide}
        deleteObjectId={postForRemoveId}
      />
    </div>
  )
}

export default Posts

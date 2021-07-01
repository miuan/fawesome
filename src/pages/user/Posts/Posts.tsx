import { useMutation, useQuery } from '@apollo/client'
import { gql } from 'graphql.macro'
import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import DeleteModal, { IDeleteModalParams } from '../../../components/DeleteModal/DeleteModal'
import Loading from '../../../components/Loading/Loading'
// import { Counter } from './features/counter/Counter';
import './Home.css'
import { Post, TPostModel } from './Post'

const QUERY = gql`
{allPost{
  id,
  text
}}
`

const Posts = () => {
  // const posts: Post[] = [{ text: "Initial post " }];
  const [posts, setPosts] = useState<TPostModel[]>([])
  const [text, setText] = useState<string>('')
  const [postForRemoveId, setPostForRemoveId] = useState<TPostModel['id']>()
  //let text = "";

  const { data, loading, error, refetch } = useQuery(QUERY)

  const [createPost] = useMutation(gql`
    mutation CreatePost($text: String) {
      createPost(text: $text) {
        id
        text
      }
    }
`)



  const addPost = async () => {
    setText('')
    const newOne = await createPost({ variables: { text } })
    const postsWithNewOne = [...posts, newOne?.data?.createPost as TPostModel]
    refetch()

    // const newOne = { id: posts.length + 1, text: text }

  }

  const onTextChange = (event: any) => {
    setText(event.target.value)
    //text = event.target.value;
  }

  const showDeleteModal = (id: TPostModel['id']) => {
    setPostForRemoveId(id)
  }

  const onDelete: IDeleteModalParams['onDelete'] = (id) => {
    const postsAfterRemove = posts.filter((post) => post.id !== id)
    setPosts(postsAfterRemove)
    setPostForRemoveId(undefined)
  }

  const onDeleteModalHide = () => {
    setPostForRemoveId(undefined)
  }

  if (loading) {
    return (<Loading />)
  }

  if (error) {
    return (<>{`Error! ${error}`}</>);
  }

  return (
    <div className="App">
      <h4>Add Post</h4>
      <input type="text" value={text} onChange={onTextChange} />
      <Button onClick={addPost}>Add Post</Button>

      <h4>Post</h4>
      {data?.allPost?.map((post: any, idx: number) => (
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

import { useMutation, useQuery } from '@apollo/client'
import { loader } from 'graphql.macro'
import React, { useState } from 'react'
import { Alert, Button } from 'react-bootstrap'
import DeleteModal, { IDeleteModalParams } from '../../../components/DeleteModal/DeleteModal'
import Loading from '../../../components/Loading/Loading'
// import { Counter } from './features/counter/Counter';
import './Home.css'
import { Post, TPostModel } from './Post'

const CREATE_MUTATION = loader('./graphql/create.gql')
const ALL_QUERY = loader('./graphql/all.gql')
const REMOVE_MUTATION = loader('./graphql/remove.gql')

const Posts = () => {
  // const posts: Post[] = [{ text: "Initial post " }];
  const [posts, setPosts] = useState<TPostModel[]>([])
  const [text, setText] = useState<string>('')
  const [postForRemoveId, setPostForRemoveId] = useState<TPostModel['id']>()

  const [createPost, { error: createError }] = useMutation(CREATE_MUTATION)
  const { data, loading, error: loadingError, refetch } = useQuery(ALL_QUERY)
  const [removePost, { error: removeError }] = useMutation(REMOVE_MUTATION)

  const addPost = async () => {
    setText('')
    await createPost({ variables: { text } })
    refetch()
  }

  const onTextChange = (event: any) => {
    setText(event.target.value)
    //text = event.target.value;
  }

  const showDeleteModal = (id: TPostModel['id']) => {
    setPostForRemoveId(id)
  }

  const onDelete: IDeleteModalParams['onDelete'] = async (id) => {
    await removePost({ variables: { id } })
    setPostForRemoveId(undefined)
    refetch()
  }

  const onDeleteModalHide = () => {
    setPostForRemoveId(undefined)
  }

  if (loading) {
    return <Loading />
  }



  return (
    <div className="App">
      <h4>Add Post</h4>
      {createError && <Alert variant={'danger'}>Add post: {createError.message}</Alert>}
      {removeError && <Alert variant={'danger'}>Remove post: {removeError.message}</Alert>}
      {loadingError && <Alert variant={'danger'}>Loading: {loadingError.message}</Alert>}
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

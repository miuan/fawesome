import { useMutation, useQuery } from '@apollo/client'
import { loader } from 'graphql.macro'
import React, { useState } from 'react'
import { Alert, Button } from 'react-bootstrap'

import { uploadFile } from '../../../app/utils'
import DeleteModal, { IDeleteModalParams } from '../../../components/DeleteModal/DeleteModal'
import Loading from '../../../components/Loading/Loading'
import Image from '../../../components/Image/Image'
// import { Counter } from './features/counter/Counter';
import './Home.css'
import { Post, TPostModel } from './Post'

const CREATE_MUTATION = loader('./graphql/create.gql')
const ALL_QUERY = loader('./graphql/all.gql')
const REMOVE_MUTATION = loader('./graphql/remove.gql')

const handeUpload = uploadFile('files')

const Posts = () => {

  const [text, setText] = useState<string>('')
  const [postForRemoveId, setPostForRemoveId] = useState<TPostModel['id']>()

  const [createPost, { error: createError }] = useMutation(CREATE_MUTATION)
  const { data, loading, error: loadingError, refetch } = useQuery(ALL_QUERY)
  const [removePost, { error: removeError }] = useMutation(REMOVE_MUTATION)

  const [uploadError, setUploadError] = useState<any>()
  const [lastUploadedImage, setLastUploadedImage] = useState<any>()

  const addPost = async () => {
    setText('')

    const sendingData = { variables: { text } } as any
    if (lastUploadedImage) {
      sendingData.variables.image = lastUploadedImage.publicKey
    }

    await createPost(sendingData)
    setLastUploadedImage(undefined)
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

  const onFileChange = (event: React.FormEvent<HTMLInputElement>) => {
    setUploadError(undefined)
    handeUpload(event, (err, uploadedImage) => {
      if (err) {
        return setUploadError(err)
      }

      setLastUploadedImage(uploadedImage)
    })
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
      {uploadError && <Alert variant={'danger'}>Upload: {uploadError.message}</Alert>}
      <input type="text" value={text} onChange={onTextChange} />
      <div>
        <input type="file" id="customFile" onChange={onFileChange} />
      </div>
      {lastUploadedImage && <div style={{ width: '320px', margin: '0px auto' }}>
        <Image publicKey={lastUploadedImage.publicKey} width={'320px'} height={'280px'} />
      </div>}

      <Button onClick={addPost}>Add Post</Button>

      <h4>Posts</h4>



      {data?.allPost?.map((post: any, idx: number) => (
        <div key={idx}>
          {post.text}{' '}
          {post.image && <div style={{ width: '320px', margin: '0px auto' }}>
            <Image publicKey={post.image} width={'320px'} height={'280px'} />
          </div>}
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

      <a href={'https://github.com/miuan/fawesome/blob/37f894d8c62874f1c436e676f87d96e49b57d4e9/src/pages/user/Posts/Posts.tsx'} target={'_blank'}>Source code</a>

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

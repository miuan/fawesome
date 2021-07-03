import { useMutation, useQuery } from '@apollo/client'
import { loader } from 'graphql.macro'
import React, { useState } from 'react'
import { Alert, Button, Form } from 'react-bootstrap'

import { uploadFile } from '../../../app/utils'
import DeleteModal, { IDeleteModalParams } from '../../../components/DeleteModal/DeleteModal'
import Loading from '../../../components/Loading/Loading'
import Image from '../../../components/Image/Image'

// import { Counter } from './features/counter/Counter';
import './Posts.css'
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
  const [images, setImages] = useState<any>([])

  const addPost = async () => {
    setText('')


    const uploadedImages = await Promise.all(images.map((image: any) => handeUpload(image.raw)))
    const imagesIds = uploadedImages.map((ui: any) => ui.id)
    const sendingData = { variables: { text, imagesIds } } as any
    await createPost(sendingData)

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
    const target = event.target as any
    setImages([...images, {
      preview: URL.createObjectURL(target?.files[0]),
      raw: target?.files[0]
    }])


    // setUploadError(undefined)
    // handeUpload(event, (err, uploadedImage) => {
    //   if (err) {
    //     return setUploadError(err)
    //   }

    //   setLastUploadedImage(uploadedImage)
    // })


  }

  const onImageRemove = (image: any) => {
    console.log(image)
    setImages(images.filter((i: any) => i.preview !== image.preview))
  }

  if (loading) {
    return <Loading />
  }

  return (
    <div className="postsPage">
      {createError && <Alert variant={'danger'}>Add post: {createError.message}</Alert>}
      {removeError && <Alert variant={'danger'}>Remove post: {removeError.message}</Alert>}
      {loadingError && <Alert variant={'danger'}>Loading: {loadingError.message}</Alert>}
      {uploadError && <Alert variant={'danger'}>Upload: {uploadError.message}</Alert>}
      <Form.Group controlId="exampleForm.ControlSelect2">
        <Form.Label>
          <table>
            <tr>
              <td>

              </td>
              <td>
                <div className="colorPicker">
                  <Form.Control
                    type="color"
                    id="exampleColorInput"
                    defaultValue="#28a745"
                    title="Choose your color"
                  />
                </div>

              </td>
              <td>
                <label className="photoButton" htmlFor="uploadImage">
                  <div >Add photo</div>
                </label>
                <input type="file" id="uploadImage" onChange={onFileChange} style={{ display: 'none' }} />
              </td>

            </tr>
          </table>
        </Form.Label>
        <Form.Control as="textarea" rows={5} value={text} onChange={onTextChange} />
        {images && images.length > 0 && <div className="imagePreviews">
          <table >
            <tr>
              {images && images.map((image: any) => (<td>
                <div className="removePreview">
                  <PreviewImage src={image.preview} />
                  <span onClick={() => {
                    onImageRemove(image)
                  }} aria-hidden="true">x</span>
                </div>

              </td>))}
            </tr>
          </table>
        </div>}

      </Form.Group>



      <Button onClick={addPost} variant={'success'}>Complete</Button>
      <div>


      </div>



      <hr />
      <h4>Posts</h4>



      {
        data?.allPost?.map((post: any, idx: number) => (
          <div key={idx} style={{ width: '320px', margin: '0px auto' }}>
            {post.text}{' '}
            {post.image && <Image publicKey={post.image} width={'320px'} height={'280px'} />}

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
        ))
      }

      <a href={'https://github.com/miuan/fawesome/blob/37f894d8c62874f1c436e676f87d96e49b57d4e9/src/pages/user/Posts/Posts.tsx'} target={'_blank'}>Source code</a>

      <DeleteModal
        show={!!postForRemoveId}
        categoryName={'Posts'}
        onDelete={onDelete}
        onHide={onDeleteModalHide}
        deleteObjectId={postForRemoveId}
      />
    </div >
  )
}


export const PreviewImage = ({ src, width, height }: { src: string, width?: string | number, height?: string | number }) => {
  const _width = width || '100px'
  const _height = height || '100px'

  return (
    <div style={{
      overflow: 'hidden',
      width: _width,
      height: _height
    }}>
      <img
        alt=''
        style={{
          objectFit: 'cover',
          width: '100%',
          minHeight: '100%'
        }}
        src={src} />
    </div>
  )
}


export default Posts

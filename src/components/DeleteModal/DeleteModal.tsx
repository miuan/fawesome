import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'

export interface IDeleteModalParams {
  show?: boolean | string | number
  onHide?: () => void
  onDelete: (
    deleteObjectId: IDeleteModalParams['deleteObjectId'],
    deleteObjectName?: IDeleteModalParams['deleteObjectName'],
  ) => void
  categoryName: string
  deleteObjectId?: string | number
  deleteObjectName?: string
  deleting?: boolean
}

export const DeleteModal: React.FC<IDeleteModalParams> = ({
  show = false,
  onHide,
  onDelete,
  categoryName,
  deleteObjectId,
  deleteObjectName,
  deleting,
}) => {
  const [showMe, setShowMe] = useState(show)
  const [lastShow, setLastShow] = useState(show)
  const onDeleteAction = () => {
    if (!deleting) {
      onDelete(deleteObjectId, deleteObjectName)
    }
  }

  const onHideAction = () => {
    if (onHide) {
      onHide()
    } else {
      setShowMe(false)
    }
  }

  useEffect(() => {
    if (show !== lastShow) {
      setShowMe(!!show)
      setLastShow(show)
    }
  }, [lastShow, show, deleteObjectId])

  return (
    <div>
      <Modal show={showMe} onHide={onHideAction}>
        <Modal.Header closeButton>
          <div>
            <Modal.Title>
              Delete {'>>'} {deleteObjectId} {'<<'}
            </Modal.Title>
          </div>
        </Modal.Header>

        {deleteObjectId && (
          <Modal.Body>
            {!deleting ? (
              <p>
                Are you sure, you want remove {categoryName} item with
                {deleteObjectName ? `name ${deleteObjectName} and ` : ''} id{' '}
                <i>'{deleteObjectId}'</i>
              </p>
            ) : (
              <p>
                Removing {categoryName} item with{' '}
                {deleteObjectName ? `name ${deleteObjectName} and ` : ''}
                {deleteObjectId} ...
              </p>
            )}
          </Modal.Body>
        )}

        <Modal.Footer>
          <Button disabled={deleting} variant="danger" type="submit" onClick={onDeleteAction}>
            Delete
          </Button>
          <Button disabled={deleting} variant="primary" onClick={onHideAction}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default DeleteModal

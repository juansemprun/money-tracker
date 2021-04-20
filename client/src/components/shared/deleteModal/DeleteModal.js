import React, { useState } from 'react'

import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core'

const DeleteModal = props => {
    const { type, service, deletableItem } = props
    const { _id } = props.itemToDelete

    const [open, setOpen] = useState(false)
    const [deleteInput, setDeleteInput] = useState('')

    const handleInputChange = e => {
        setDeleteInput(e.target.value)
    }

    const handleDelete = () => {
        const serviceMethod = props.serviceMethod

        service
        [serviceMethod](_id) // Aqui le quité un punto 
            .then(() => {
                props.getUserItemList() // Refresh list table
                handleClose()
                props.handleEditModalClose(false)
                type === 'Transaction' ? props.recalculateAccountAmount() : console.log('hola')
            })
            .catch(err => console.log('Error deleting: ', { err }))
    }

    const handleClickOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    const message = `You can't remove this record, because it is used by other releated data`

    return (
        <div>
            <Button variant="outlined" color="secondary" onClick={handleClickOpen} style={{ width: '100%' }}>
                Delete {type}
            </Button>
            <Dialog open={open} onClose={handleClose} >
                <DialogTitle>{deletableItem ? "Are you sure?" : "Error!"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {deletableItem ? "To confirm this action type 'delete'" : message}
                    </DialogContentText>
                    {deletableItem ?
                        <TextField
                            autoFocus
                            margin="dense"
                            id="deleteName"
                            fullWidth
                            autoComplete="off"
                            variant="outlined"
                            disabled={deletableItem ? false : true}
                            onChange={handleInputChange}
                        />
                        : ""
                    }
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDelete} color="primary" disabled={deleteInput === 'delete' ? false : true}>
                        Confirm
            </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default DeleteModal
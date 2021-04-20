import React, { useState } from 'react'

import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'
import { useStyles } from './styles/snackBar.styles'

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />
}

const SnackBar = props => {
    const classes = useStyles()
    const [open, setOpen] = useState(true)

    const handleClose = () => {
        setOpen(false)
        props.handleSnackBar(false)
    }

    return (
        <div className={classes.root}>
            <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={props.severity}>
                    {props.message}
                </Alert>
            </Snackbar>
        </div >
    )
}

export default SnackBar
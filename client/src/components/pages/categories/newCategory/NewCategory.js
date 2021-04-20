import React, { useState } from 'react'

import { useStyles } from './styles/newCategory.styles'

import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import CloseIcon from '@material-ui/icons/Close'
import Slide from '@material-ui/core/Slide'
import CssBaseline from '@material-ui/core/CssBaseline'
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted'
import Container from '@material-ui/core/Container'
import Avatar from '@material-ui/core/Avatar'

// Custom Components
import NewCategoryForm from './NewCategoryForm'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

const NewCategory = props => {
  const classes = useStyles()
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <div>
      <Button
        variant="outlined"
        color="primary"
        onClick={handleClickOpen}>
        Create new category
      </Button>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Create new category
            </Typography>
            <Button color="secondary" variant="contained" onClick={handleClose}>
              Cancel
            </Button>
          </Toolbar>
        </AppBar>

        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <FormatListBulletedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">New Category</Typography>
            <NewCategoryForm {...props} handleNewCategoryModalClose={() => handleClose()} userCategories={props.userCategories} />
          </div>
        </Container>

      </Dialog>
    </div>
  )
}

export default NewCategory
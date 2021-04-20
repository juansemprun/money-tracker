import React, { useEffect, useState } from 'react'

import { useStyles } from './styles/categoriesList.styles'

import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Edit'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import CloseIcon from '@material-ui/icons/Close'
import Slide from '@material-ui/core/Slide'
import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'
import Avatar from '@material-ui/core/Avatar'

import MaterialTable from 'material-table'

// Custom Components
import EditCategoryForm from './../editCategory/EditCategoryForm'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />
})

const CategoriesList = props => {
    const classes = useStyles()
    const [open, setOpen] = useState(false)

    const handleClose = () => {
        setOpen(false)
    }

    const categoriesData = props.userCategories
    const { getUserCategories } = props
    const categoriesList = []

    useEffect(() => getUserCategories(), [categoriesData.length])

    if (categoriesData.length > 0) {
        categoriesData.map(category => {
            return (
                categoriesList.push({
                    _id: category._id,
                    name: category.name,
                    categoryType: category.type,
                    createdAt: category.createdAt,
                })
            )
        })
    }

    const filterByCategoryType = []
    categoriesList.map(elm => filterByCategoryType.push(elm))
    const userCategories = filterByCategoryType.filter(elm => elm.categoryType === props.type)

    const [categoryToEdit, setcategoryToEdit] = useState([])
    const handleCategoryData = category => {
        setcategoryToEdit(category)
        setOpen(true)
    }

    return (
        <>
            <MaterialTable
                title="Categories"
                columns={[
                    { title: 'Name', field: 'name' },
                    { title: 'Created', field: 'createdAt', type: 'date' },
                ]}
                data={[...userCategories]}
                actions={[
                    {
                        icon: 'edit',
                        tooltip: 'Edit',
                        onClick: (event, rowData) => handleCategoryData(rowData)
                    }
                ]}
                options={{
                    filterCellStyle: { textAlign: 'center' },
                    exportButton: true,
                    actionsColumnIndex: -1,
                    cellStyle: { textAlign: 'center' },
                    headerStyle: { fontWeight: 'bold', textAlign: 'center' },
                }}
            />
            {/* Modal Window */}
            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Edit category
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
                            <EditIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">Edit Category</Typography>
                        <EditCategoryForm
                            {...props}
                            categoryToEdit={categoryToEdit}
                            handleClose={() => handleClose()}
                        />
                    </div>
                </Container>
            </Dialog>
        </>
    )
}

export default CategoriesList

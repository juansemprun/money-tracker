import React from 'react'

import { useStyles } from './styles/editCategoryForm.styles'

import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

import { useForm } from 'react-hook-form'

// Custom Components
import DeleteCategory from './../deleteCategory/DeleteCategory'

const EditCategoryForm = props => {
    const classes = useStyles()

    const { register, handleSubmit, errors } = useForm()

    const onSubmit = formData => {
        const categoriesService = props.categoriesServices
        categoriesService
            .editCategory(props.categoryToEdit._id, formData)
            .then(() => {
                props.getUserCategories()
                props.handleClose(false)
            })
            .catch(err => console.log('Error editing category: ', { err }))
    }

    return (
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)} >
            {/* Inputs */}
            <Grid container spacing={2}>
                {/* Name */}
                <Grid item xs={12}>
                    <TextField
                        error={errors.name ? true : false}
                        name="name"
                        label="Name"
                        id="name"
                        defaultValue={props.categoryToEdit.name}
                        inputRef={register({ required: true })}
                        variant="outlined"
                        fullWidth
                    />
                </Grid>
            </Grid>
            {/* Buttons */}
            <Grid container >
                <Grid item xs={12}>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={classes.button}
                    >
                        Edit Category
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <DeleteCategory
                        {...props}
                        itemToDelete={props.categoryToEdit}
                        handleClose={() => props.handleClose()}
                        getUserCategories={props.getUserCategories}
                        service={props.categoriesServices}
                    />
                </Grid>
            </Grid>

        </form>
    )
}

export default EditCategoryForm

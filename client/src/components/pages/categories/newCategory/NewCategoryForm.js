import React, { useState } from 'react'

import { useStyles } from './styles/newCategoryForm.styles'
import { Grid, TextField, MenuItem, Button } from '@material-ui/core'

import { useForm, Controller } from 'react-hook-form'

const NewCategoryForm = props => {
    const classes = useStyles()

    const { register, handleSubmit, control, errors } = useForm()

    const [categoryType, setCategoryType] = useState('')

    const handleCategoryTypeChange = e => setCategoryType(e.target.value)

    const onSubmit = formData => {
        const categoryService = props.categoriesServices
        const userOwner = props.loggedInUser._id
        formData.userOwner = userOwner

        categoryService
            .newCategory(formData)
            .then(() => {
                props.handleNewCategoryModalClose(false)
                props.getUserCategories()
            })
            .catch(err => console.log('Err creating new category: ', { err }))
    }

    return (
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)} >
            <Grid container spacing={2}>
                {/* Name */}
                <Grid item xs={12}>
                    <TextField
                        error={errors.name ? true : false}
                        name="name"
                        label="Category name"
                        id="name"
                        inputRef={register({ required: true })}
                        variant="outlined"
                        fullWidth
                    />
                </Grid>
                {/* Category Type*/}
                <Grid item xs={12}>
                    <Controller
                        as={TextField}
                        control={control}
                        name="type"
                        error={errors.type ? true : false}
                        id="type"
                        select
                        label="Category type"
                        value={categoryType}
                        defaultValue=""
                        inputRef={register}
                        rules={{ required: true }}
                        onChange={(handleCategoryTypeChange)}
                        variant="outlined"
                        className={classes.formControl}
                    >
                        <MenuItem value="expense">
                            Expense
                    </MenuItem>
                        <MenuItem value="income">
                            Income
                    </MenuItem>

                    </Controller>
                </Grid>
            </Grid>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
            >
                Create Category
          </Button>
        </form>
    )
}

export default NewCategoryForm

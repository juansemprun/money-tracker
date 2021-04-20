import React, { useState } from 'react'

import { useStyles } from './styles/Categories.styles'

import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

// Custom Components
import NewCategory from './newCategory/NewCategory'
import UserCategories from './userCategories/UserCategories'

// Services
import categoriesServices from './../../../services/categories.service'

const Categories = props => {
  const categoriesService = new categoriesServices()
  const classes = useStyles()

  const [userCategories, setUserCategories] = useState([])

  const getUserCategories = () => {
    categoriesService
      .getUserCategories(props.loggedInUser._id)
      .then(response => {
        setUserCategories(response.data)
      })
      .catch(err => console.log('Err getting user categories: ', { err }))
  }

  return (
    <>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <NewCategory
                {...props}
                loggedInUser={props.loggedInUser}
                getUserCategories={() => getUserCategories()}
                categoriesServices={categoriesService}
              />
            </Grid>

            <Grid item xs={12} >
              <UserCategories
                {...props}
                userCategories={userCategories}
                getUserCategories={() => getUserCategories()}
                categoriesServices={categoriesService}
              />
            </Grid>
          </Grid>
        </Container>
      </main>
    </>
  )
}

export default Categories

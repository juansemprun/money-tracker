import React from 'react'

import { useStyles } from './styles/profileCard.styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'

const ProfileCard = props => {
  const classes = useStyles()

  return (
    <Card className={classes.root}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            {props.userData.name}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {props.userData.username}
          </Typography>
        </CardContent>
      </div>
      <div className={classes.imageContainer}>
        <Avatar alt={props.loggedInUser.user} src="https://www.sogapar.info/wp-content/uploads/2015/12/default-user-image.png" className={classes.large} />
      </div>
    </Card>
  )
}

export default ProfileCard
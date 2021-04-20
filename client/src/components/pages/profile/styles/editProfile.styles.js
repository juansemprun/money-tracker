import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => ({
    form: {
      width: '100%', 
      marginTop: theme.spacing(3),
    },
    button: {
      margin: theme.spacing(3, 1, 2, 1),
    },
    errorMessage: {
        color: 'red'
    }
}))
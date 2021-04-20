import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => ({
    form: {
        width: '100%', 
        marginTop: theme.spacing(3),
    },
    formControl: {
        minWidth: 120,
        width: "100%"
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    errorMessage: {
        color: 'red'
    }
}))


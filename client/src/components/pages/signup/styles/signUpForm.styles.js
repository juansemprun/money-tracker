import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(theme => ({
    form: {
        marginTop: theme.spacing(1),
        width: '100%',
        [theme.breakpoints.up("md")]: {
            width: '70%'
        }
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    }
}))
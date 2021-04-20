import { makeStyles } from '@material-ui/core/styles'
import logoAnimated from './../../../resources/images/logo-animated.gif'

export const useStyles = makeStyles(theme => ({
    root: {
        height: '100vh'
    },
    paper: {
        margin: theme.spacing(0, 4),
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.primary.main
    },
    title: {
        marginBottom: '50px'
    },
    image: {
        backgroundImage: `url(${logoAnimated})`,
        backgroundColor: '#3f51b5',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
    }
}))
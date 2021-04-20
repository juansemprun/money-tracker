import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
    },
    content: {
      flex: '1 0 auto',
    },
    imageContainer: {
      display: 'flex',
      width: '110px',
      height: '110px',
      flexGrow: '0',
      flexShrink:'0',
      margin: 'auto',
      alignItems: 'center',
    },
    large: {
      width: theme.spacing(12),
      height: theme.spacing(12),
    },
}))
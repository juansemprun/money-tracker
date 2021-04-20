import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatarExpense: {
    margin: theme.spacing(1),
    backgroundColor: 'red',
  },
  avatarIncome: {
    margin: theme.spacing(1),
    backgroundColor: 'green',
  },
  newTransactionIncome: {
    color: 'green',
    borderColor: 'green',
  },
  newTransactionExpense: {
    color: 'red',
    borderColor: 'red',
  }
}))
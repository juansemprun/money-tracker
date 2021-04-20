import React from 'react'

// Service
import accountServices from './../../../../services/accounts.service'
import transactionServices from './../../../../services/transactions.service'

// Custom Components
import DeleteModal from './../../../shared/deleteModal/DeleteModal'

const ItemDelete = props => {
    const accountService = new accountServices()
    const transactionService = new transactionServices()
    const itemToDelete = () => { }

    const recalculateAccountAmount = () => {
        const newAccountAmount = (props.itemToDelete.accountAmount - (props.itemToDelete.amount))
        accountService
            .editAccount(props.itemToDelete.accountId, { amount: newAccountAmount })
            .then(response => console.log('todo ok', response))
            .catch(err => console.log('Error recalculating account amount: ', { err }))
    }

    return (
        <DeleteModal
            type={'Transaction'} // First letter in capital
            service={transactionService}
            serviceMethod={'deleteTransaction'}
            toDelete={() => itemToDelete()}
            itemToDelete={props.itemToDelete}
            getUserItemList={props.getUserTransactions}
            handleEditModalClose={props.handleClose}
            deletableItem={true}
            recalculateAccountAmount={() => recalculateAccountAmount()}
        />
    )
}

export default ItemDelete

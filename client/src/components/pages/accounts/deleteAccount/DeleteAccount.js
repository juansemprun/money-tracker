import React, { useState, useEffect } from 'react'

// Service
import accountServices from './../../../../services/accounts.service'
import transactionServices from './../../../../services/transactions.service'

// Custom Components
import DeleteModal from './../../../shared/deleteModal/DeleteModal'

const ItemDelete = props => {
    const accountService = new accountServices()
    const itemToDelete = () => { }

    const [deletableItem, setDeletableItem] = useState('')
    useEffect(() => { }, [deletableItem])

    const transactionService = new transactionServices()
    transactionService
        .getTransactionsByAccount(props.itemToDelete._id)
        .then(response => response.data.length ? setDeletableItem(false) : setDeletableItem(true))
        .catch(err => console.log('Err: ', { err }))

    return (
        <DeleteModal
            type={'Account'} // First letter in capital
            service={accountService}
            serviceMethod={'deleteAccount'}
            toDelete={() => itemToDelete()}
            itemToDelete={props.itemToDelete}
            getUserItemList={props.getUserAccounts}
            handleEditModalClose={props.handleClose}
            deletableItem={deletableItem}
        />
    )
}

export default ItemDelete

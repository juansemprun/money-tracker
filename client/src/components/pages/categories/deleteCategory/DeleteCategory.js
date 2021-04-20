import React, { useState, useEffect } from 'react'

// Service
import transactionServices from './../../../../services/transactions.service'

// Custom Components
import DeleteModal from './../../../shared/deleteModal/DeleteModal'

const ItemDelete = props => {
    const itemToDelete = () => { }

    const [deletableItem, setDeletableItem] = useState('')
    useEffect(() => { }, [deletableItem])

    const transactionService = new transactionServices()
    transactionService
        .getTransactionsByCategory(props.itemToDelete._id)
        .then(response => response.data.length ? setDeletableItem(false) : setDeletableItem(true))
        .catch(err => console.log('Err: ', { err }))

    return (
        <DeleteModal
            type={'Category'} // First letter in capital
            service={props.service}
            serviceMethod={'deleteCategory'}
            toDelete={() => itemToDelete()}
            itemToDelete={props.itemToDelete}
            getUserItemList={props.getUserCategories}
            handleEditModalClose={props.handleClose}
            deletableItem={deletableItem}
        />
    )
}

export default ItemDelete

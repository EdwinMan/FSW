import React, {useState} from 'react'
import StoreController from './StoreController/StoreController'
import CreateStore from './CreateStore/CreateStore'
import EditStore from './EditStore/EditStore'
import ViewStore from './ViewStore/ViewStore'

export default function Sell() {

    const [view, setView] = useState(<StoreController
        editStoreHandler={editStoreHandler}
        createStoreHandler={createStoreHandler}
        viewStoreHandler={viewStoreHandler}/>)
    
    function viewHandler(){
        setView(<StoreController
            editStoreHandler={editStoreHandler}
            createStoreHandler={createStoreHandler}
            viewStoreHandler={viewStoreHandler}/>) 
    }

    function createStoreHandler(){
        setView(<CreateStore changeView={viewHandler}/>)
    }

    function editStoreHandler(store){
        setView(<EditStore storeInfo={store} changeView={viewHandler}/>)
    }

    function viewStoreHandler(store){
        setView(<ViewStore storeInfo={store} changeView={viewHandler}/>)
    }

    return view

}

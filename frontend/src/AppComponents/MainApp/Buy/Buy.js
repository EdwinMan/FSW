import React, {useState} from 'react'
import Category from './BuyComponents/Category'
import ItemDisplayer from './BuyComponents/itemDisplayer/ItemDisplayer'
import StoreDisplayer from './BuyComponents/StoreDisplayer/StoreDisplayer'


export default function Buy() {

    const [view, setView] = useState(<Category storeView={storeView} itemView={itemView}/>)

    function itemView(info){
        setView(<ItemDisplayer info={info}/>)
    }

    function storeView(info){
        setView(<StoreDisplayer info={info}/>)
    }

    //called for back button
    function mainView(){
        setView(<Category storeView={storeView} itemView={itemView}/>)
    }

    


    return (view)
}


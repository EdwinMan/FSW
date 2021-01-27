import React, {useState} from 'react'
import CreateProduct from './CreateProduct/CreateProduct';
import EditProduct from './EditProduct/EditProduct';
import ViewProduct from './ViewProduct/ViewProduct';
// import { AuthContext } from '../../../../Context/auth-context'

export default function ViewStore(props) {

    let changeView = props.changeView;
    let store = props.storeInfo;

    const [view, setView] = useState(<ViewProduct
        storeInfo = {store}
        quitStore={changeView}
        editProductHandler={editProductHandler}
        createProductHandler={createProductHandler}
        viewProductHandler={viewProductHandler}/>)

    function viewHandler(){
        setView(<ViewProduct
            storeInfo = {store}
            quitStore={changeView}
            editProductHandler={editProductHandler}
            createProductHandler={createProductHandler}
            viewProductHandler={viewProductHandler}/>) 
        }
    function createProductHandler(){
            setView(<CreateProduct
                storeInfo = {store}
                changeView={viewHandler}
                quitStore={changeView}/>)
        }
    
    function editProductHandler(product){
            setView(<EditProduct productInfo={product} quitStore={changeView} changeView={viewHandler}/>)
        }
    
    function viewProductHandler(product){
            alert("viewProductHandler")
        }



    return (view)


    



}

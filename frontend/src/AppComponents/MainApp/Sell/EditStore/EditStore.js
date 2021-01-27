import React, {useContext, useState} from 'react'
import { AuthContext } from '../../../../Context/auth-context'

export default function EditStore(props) {

    const auth = useContext(AuthContext);
    const axios = require('axios').default;

    let changeView = props.changeView;
    let store = props.storeInfo;
    
    const [storeName, setStoreName] = useState(store.name)
    const [storeDescription, setStoreDescription] = useState(store.description)

    async function editHandler(){

        if(storeName === store.name && storeDescription === store.description)
        {
            alert("At least name or des need to be changed")
        }
        else{

            await axios.put("http://127.0.0.1:8000/api/stores/"+store.id,
             {"name":storeName, "description":storeDescription},
             {
                 headers: {
                   'Authorization': `Bearer ${auth.Token}` 
                 }
             })
            .then( (res) => {
                changeView()
            })
        }
    }

    return (
        <div>
            <h1>EDIT</h1>
            <label>Store Name:</label>
            <input type="text" 
            value={storeName}
            onChange={(e)=>{setStoreName(e.target.value)}}/>
            <br/>
            <label>Store Description:</label>

            <input type="textArea"
            value={storeDescription} 
            onChange={(e)=>{setStoreDescription(e.target.value)}}/>
            
            <br/>

            <button onClick={editHandler}>Edit</button>

            <br/>

            <button onClick={changeView}>Back</button>
        </div>
    )
}

import React, {useContext, useState} from 'react'
import { AuthContext } from '../../../../Context/auth-context'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export default function CreateStore(props) {

    const auth = useContext(AuthContext);
    const axios = require('axios').default;
    
    let changeView = props.changeView;

    const [storeName, setStoreName] = useState()
    const [storeDesc, setStoreDesc] = useState()
    const [image, setImage] = useState("")

    async function CreateStoreHandler(){
        console.log(auth.UserID)
        await axios.post(
        "http://127.0.0.1:8000/api/stores",
        {
         "name":storeName,
         "description":storeDesc,
         "rate":0,
         "user_id":auth.UserID,
        },
        {
            headers: {
              'Authorization': `Bearer ${auth.Token}` 
            }
        })
        .then( (res) => {
            changeView()
        })
    }

    return (
        <div style={{width:"100%",textAlign:"center"}}>
            <h1>Create A New Store</h1>

            <TextField 
            onChange={(e)=>{setImage(e.target.files[0])}} 
            id="outlined-search" 
            style={{width:"400px",marginBottom:"10px"}} //, visibility:"hidden"
            type="file" 
            variant="outlined"
            name="_photos"
            />
            
            <br/>

            <TextField 
            id="outlined-search" 
            label="Store Name" 
            onChange={(e)=>{setStoreName(e.target.value)}}
            style={{width:"400px",marginBottom:"10px"}}
            type="search" 
            variant="outlined"/>
            <br/>



            <TextField
            id="outlined-multiline-static"
            label="Store Descrition"
            multiline
            rows={5}
            onChange={(e)=>{setStoreDesc(e.target.value)}}
            style={{width:"400px",marginBottom:"10px"}}
            variant="outlined"/>
            <br/>

            <Button 
            onClick={changeView} 
            variant="contained"
            style={{marginRight:"10px", marginBottom:"10px"}}
            >Back</Button>

            <Button 
            onClick={CreateStoreHandler} 
            variant="contained" 
            color="primary"
            style={{marginBottom:"10px", backgroundColor:"#343a40"}}
            >Create</Button>

        </div>
    )
}

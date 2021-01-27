import React, {useContext, useEffect, useState} from 'react'
import { AuthContext } from '../../../../Context/auth-context'
import Table from 'react-bootstrap/Table'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';

export default function StoreController(props) {

    let editStoreHandler = props.editStoreHandler;
    let createStoreHandler = props.createStoreHandler;
    let viewStoreHandler = props.viewStoreHandler;

    const auth = useContext(AuthContext);
    const axios = require('axios').default;
    
    const [stores, setStores] = useState(0);
    
    async function getStores(){
        await axios.get("http://127.0.0.1:8000/api/stores/user/"+auth.UserID,
        {
            headers: {
              'Authorization': `Bearer ${auth.Token}` 
            }
        })
        .then( (res) => {
            setStores(res.data.data)
        })
    }

    useEffect(() => 
    {
        getStores()
    }
    ,[]);

    const tableStyle = {
        textAlign:"center",
        cursor: "pointer"
      };



    async function deleteStoreHandler(id){
        await axios.delete("http://127.0.0.1:8000/api/stores/"+id) 
        .then( (res) => {
            console.log(res.data.data)
            getStores()
        })
    }

    return (
        <div>
            <Table 
            striped 
            bordered 
            hover
            style={{fontSize:'18px'}}
            >
                <thead>

                    <tr>
                        <th style={{textAlign:"center"}}>#</th>
                        <th style={{textAlign:"center"}}>Store Name</th>
                        <th 
                        colSpan="2"
                        style={{textAlign:"center"}}
                        >Manage</th>
                    </tr>

                </thead>

                <tbody>
                    
                    {stores === 0 ? 
                    null
                    :
                    stores.map( (store, i)=>
                    <tr>
                        <td style={{textAlign:"center"}}>{i+1}</td>
                        <td onClick={()=>{viewStoreHandler(store)}} style={tableStyle}>{store.name}</td>
                        <td onClick={()=>{editStoreHandler(store)}} style={tableStyle}>Edit <EditOutlinedIcon/></td>
                        <td onClick={()=>{deleteStoreHandler(store.id)}} style={tableStyle}>Delete <DeleteOutlineIcon/></td>
                    </tr>
                    )
                    }


                    <tr>
                        <td
                        colSpan="4"
                        style={tableStyle}
                        onClick={createStoreHandler}
                        >Create New Store
                        <AddCircleOutlineOutlinedIcon/></td>
                    </tr>

                </tbody>
            </Table>
        </div>
    )
}

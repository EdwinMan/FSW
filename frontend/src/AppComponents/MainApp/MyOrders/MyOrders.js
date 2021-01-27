import React,{useState, useEffect,useContext} from 'react'
import { AuthContext } from '../../../Context/auth-context'
import OrderItem from './OrderItem';
import firebase from '../../FireBase/Firebase';


export default function MyOrders() {
    const auth = useContext(AuthContext);
    const axios = require('axios').default;

    const [transactions, setTransactions] = useState(0)

    async function getTransactions(){
        await axios.get("http://127.0.0.1:8000/api/transactions/buyer/"+auth.UserID,
        {
            headers: {
              'Authorization': `Bearer ${auth.Token}` 
            }
        })
        .then( (res) => {
            // console.log(res.data.data)
            setTransactions(res.data.data)
        })
    }

    async function DeleteTransactions(id){
        await axios.delete("http://127.0.0.1:8000/api/transactions/"+id,
        {
            headers: {
              'Authorization': `Bearer ${auth.Token}` 
            }
        })
        .then( (res) => {
            // console.log(res.data.data)
            getTransactions();

            firebase
            .firestore()
            .collection('fsw-final')
            .onSnapshot((querySnapshot) => {
                querySnapshot.forEach( (doc) => {
                if(doc.User_id === auth.UserID){
                    doc.myOrders = doc.myOrders - 1 
                    // doc.RequestedOrders =  doc.RequestedOrders + 1
                }
                })
            })//firebase ends

        })
    }

    useEffect(() => 
    {
        getTransactions()
    }
    ,[]);


    return (
        <div style={{margin:'20px 200px 20px 200px'}}>
            {transactions === 0 ?
            <h1>No Orders</h1>
            :
            transactions.map((item , i)=>
            <OrderItem key={i+1} info={item} DeleteTransactions={DeleteTransactions}/>
            )}
        </div>
    )
}

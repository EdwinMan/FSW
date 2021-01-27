import React, {useState, useContext, useEffect} from 'react'
import { AuthContext } from '../../../../../Context/auth-context'
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';

export default function CreateProduct(props) {

    let changeView = props.changeView;
    let store = props.storeInfo;
    const auth = useContext(AuthContext);
    const axios = require('axios').default;
    let quitStore = props.quitStore;
    

    const [image, setImage] = useState("")
    const [name, setName] = useState("")
    const [quantity, setQuantity] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [category, setCategory] = useState("")
    const [returnable, setReturnable] = useState(false)
    const [isNew, setIsNew] = useState(false)

    const [validCategory, setValidCategory] = useState(0)

    async function getCategories(){
        await axios.get("http://127.0.0.1:8000/api/categories/") 
        .then( (res) => {
            console.log(res.data.data)
            setValidCategory(res.data.data)
        })
    }




    async function createHandler(){

        const fd = new FormData();
        fd.append('image', image);
        fd.append('name', name);
        fd.append('quantity', quantity);
        fd.append('description', description);
        fd.append('store_id', store.id);
        fd.append('category_id', category);
        fd.append('seller_id', auth.UserID);
        fd.append('rate', 2.5);
        fd.append('price', price);
        fd.append('new', isNew);
        fd.append('deliverytime', "deliverytime");
        fd.append('returnable', returnable);
 


        await axios.post(
            "http://127.0.0.1:8000/api/products", fd,
            {
                headers: {
                  'Authorization': `Bearer ${auth.Token}` 
                }
            })  
            .then( (res) => {
                console.log(res.data)
                changeView()
            })

    }

    useEffect(() => 
    {
        getCategories()
    }
    ,[]);

    return (
        <div style={{width:"100%",textAlign:"center"}} >
            <h1>Create Product</h1>

            <TextField 
            onChange={(e)=>{setImage(e.target.files[0])}} 
            id="outlined-search" 
            style={{width:"400px",marginBottom:"10px"}} //, visibility:"hidden"
            type="file" 
            variant="outlined"
            // label="Choose Image"
            name="_photos"
            />
            
            <br/>


            <TextField 
            id="outlined-search" 
            label="Product Name" 
            onChange={(e)=>{setName(e.target.value)}}
            style={{width:"400px",marginBottom:"10px"}}
            type="search" 
            variant="outlined"/>
            <br/>

            <TextField 
            id="outlined-search" 
            label="Quantity" 
            type="search" 
            onChange={(e)=>{setQuantity(e.target.value)}}
            style={{width:"400px",marginBottom:"10px"}}
            variant="outlined"/>
            
            <br/>

            <TextField 
            id="outlined-search" 
            label="Price" 
            type="search" 
            onChange={(e)=>{setPrice(e.target.value)}}
            style={{width:"400px",marginBottom:"10px"}}
            variant="outlined"/>

            <br/>
            <TextField
            id="outlined-multiline-static"
            label="Description"
            multiline
            rows={8}
            onChange={(e)=>{setDescription(e.target.value)}}
            style={{width:"400px",marginBottom:"10px"}}
            variant="outlined"/>
            <br/>
            
            <div  style={{marginLeft:"-300px"}}>
                <Checkbox
                defaultChecked={isNew}
                onChange={()=>{setIsNew(isNew => !isNew)}}
                color="default"
                inputProps={{ 'aria-label': 'checkbox with default color' }}
                />
                <span>New Product</span>
            </div>
                <br/> 
            <div  style={{marginLeft:"-310px" , marginBottom:"20px"}}>
                <Checkbox
                defaultChecked={returnable}
                color="default"
                onChange={()=>{setReturnable(returnable => !returnable)}}
                inputProps={{ 'aria-label': 'checkbox with default color' }}
                />
                <span>Returnable</span>
            </div>

            <br/>
            <FormControl style={{width:"400px",marginBottom:"10px"}}>
                <InputLabel id="demo-simple-select-label">Select Category</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={category}
                onChange={(e)=>{setCategory(e.target.value)}}
                >
                {validCategory===0 ?
                <MenuItem value={0}>Loading Categories</MenuItem>
                :
                validCategory.map((cat,i)=>
                <MenuItem key={i} value={cat.id}>{cat.name}</MenuItem>
                )}
                </Select>
            </FormControl>

            <br/>

            <Button 
            onClick={quitStore} 
            variant="contained"
            style={{marginRight:"10px", marginBottom:"10px"}}
            >quit store</Button>

            <Button 
            onClick={changeView} 
            variant="contained"
            style={{marginRight:"10px", marginBottom:"10px"}}
            >Back</Button>

            <Button 
            onClick={createHandler} 
            variant="contained" 
            color="primary"
            style={{marginBottom:"10px", backgroundColor:"#343a40"}}
            >Create</Button>
            
        </div>
        
    )
}

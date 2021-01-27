import React, {useState,useEffect, useContext} from 'react'
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import { AuthContext } from '../../../../../Context/auth-context';

export default function EditProduct(props) {


    let product = props.productInfo;
    console.log(product)
    let changeView = props.changeView;
    let quitStore = props.quitStore;
    const axios = require('axios').default;
    const auth = useContext(AuthContext);

    const [image, setImage] = useState(product.image)
    const [name, setName] = useState(product.name)
    const [quantity, setQuantity] = useState(product.quantity)
    const [description, setDescription] = useState(product.description)
    const [price, setPrice] = useState(product.price)
    const [category, setCategory] = useState(0)
    const [newCategory, setNewCategory] = useState(0)
    const [allCategory, setAllCategory] = useState(0)
    const [returnable, setReturnable] = useState(false)
    const [isNew, setIsNew] = useState(false)

    async function editHandler(){
        
        if(image === product.image && 
            name === product.name && 
            quantity === product.quantity && 
            price === product.price && 
            Number(newCategory) === Number(category.id) &&
            description === product.description){
            alert("At least name or des need to be changed")
        }
        else{
            console.log("Done")
            await axios.put("http://127.0.0.1:8000/api/products/"+product.id,
             {"name":name,
              "image":image,
              "description":description,
              "quantity":quantity,
              "price":price,
              "category_id":newCategory
            },
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
    }


    async function getCategories(){
        await axios.get("http://127.0.0.1:8000/api/categories/"+product.category_id) 
        .then( (res) => {
            // console.log(res.data.data.name)
            setCategory(res.data.data)
            setNewCategory(res.data.data.id)
        })

        await axios.get("http://127.0.0.1:8000/api/categories/") 
        .then( (res) => {
            console.log(res.data.data)
            setAllCategory(res.data.data)
        })
    }


    useEffect(() => 
    {
        getCategories()
    }
    ,[]);

    return (
        <div style={{width:"100%",textAlign:"center"}} >
            <h1>Edit Product</h1>

            <TextField 
            onChange={(e)=>{setImage(e.target.files[0])}} 
            id="outlined-search" 
            style={{width:"400px",marginBottom:"10px"}}
            type="file" 
            variant="outlined"/>
            <br/>

            <TextField 
            id="outlined-search" 
            label="Product Name" 
            onChange={(e)=>{setName(e.target.value)}}
            style={{width:"400px",marginBottom:"10px"}}
            type="search" 
            value={name}
            variant="outlined"/>
            <br/>

            <TextField 
            id="outlined-search" 
            label="Quantity" 
            type="search" 
            onChange={(e)=>{setQuantity(e.target.value)}}
            style={{width:"400px",marginBottom:"10px"}}
            value={quantity}
            variant="outlined"/>
            <br/>   

            <TextField 
            id="outlined-search" 
            label="Price" 
            type="search" 
            value={price}
            onChange={(e)=>{setPrice(e.target.value)}}
            style={{width:"400px",marginBottom:"10px"}}
            variant="outlined"/>
            <br/>

            <TextField
            id="outlined-multiline-static"
            label="Description"
            multiline
            rows={10}
            onChange={(e)=>{setDescription(e.target.value)}}
            style={{width:"400px",marginBottom:"10px"}}
            value={description}
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
            <div  style={{marginLeft:"-310px", marginBottom:"20px"}}>
                <Checkbox
                defaultChecked={returnable}
                color="default"
                onChange={()=>{setReturnable(returnable => !returnable)}}
                inputProps={{ 'aria-label': 'checkbox with default color' }}
                />
                <span>Returnable</span>
            </div>

            <TextField // NEW ONE HERE
            id="outlined-select-currency"
            select
            label="Select Category"
            value={newCategory}
            onChange={(e)=>{setNewCategory(e.target.value)}}
            helperText="Please select your currency"
            variant="outlined"
            style={{width:"400px",marginBottom:"10px"}}
            >
            {   allCategory===0 ?
                <option value="No Categories">No Categories</option>
                :
                allCategory.map((cat,i) => (
                <MenuItem key={i} value={cat.id}>
                {cat.name}
                </MenuItem>
            ))}
            </TextField>
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
            onClick={editHandler} 
            variant="contained" 
            color="primary"
            style={{marginBottom:"10px"}}
            >Edit</Button>
        </div>
    )
}

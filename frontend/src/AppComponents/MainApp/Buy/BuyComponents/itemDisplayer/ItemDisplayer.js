import React,{useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Item from './Item'
import ItemDetails from './ItemDetails';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ReactStars from "react-rating-stars-component";
import Checkbox from '@material-ui/core/Checkbox';
import CircularProgress from '@material-ui/core/CircularProgress';
import './ItemDisplayer.css';

// Inspired by the former Facebook spinners.
const useStylesFacebook = makeStyles((theme) => ({
  root: {
    position: 'relative',
  },
  bottom: {
    color: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
  },
  top: {
    color: '#1a90ff',
    animationDuration: '550ms',
    position: 'absolute',
    left: 0,
  },
  circle: {
    strokeLinecap: 'round',
  },
}));

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    inline: {
      display: 'inline',
    },
    search: {
      width: '300px',
      backgroundColor: '',
      borderRight: '2px solid #F0F0F0',
      marginLeft:'10px',
      marginTop:'13px',
      padding: '10px',
      paddingRight: '30px',
    },
    main: {
      display: 'flex',
      
    },
    priceButtons: {
      justifyContent:'left',
      fontWeight :"normal",
    },
  }));

export default function ItemDisplayer(props) {

    const axios = require('axios').default;

    let CategoryInfo = props.info;

    const [listMode, setListMode] = useState(true)

    const [items, setIems] = useState(0);

    const [selectedProductId, setSelectedProductId] = useState(-1);

    const [searchPrice, setSearchPrice] = useState([0,999999999]);

    const [price, setPrice] = useState([false,false,false,false,false]); //

    const [rate, setRate] = useState(0);

    const [usedChecked, setUsedChecked] = React.useState(true);
    const [newChecked, setNewChecked] = React.useState(true);

    const classes = useStyles();
    const classes2 = useStylesFacebook();

    const priceSetter = (key)=>{
      setSearchPrice([0,10])
    }

    function itemSelectHandler(id){
      // alert(CategoryInfo.name)
      setSelectedProductId(id);
      setListMode(listMode => !listMode)
    }

    async function getItems(){
        await axios.get("http://127.0.0.1:8000/api/products/category/"+CategoryInfo.id) 
        .then( (res) => {
            console.log(res.data.data)
            setIems(res.data.data)
        })
    }

    useEffect(() => 
    {
      getItems()
    }
    ,[]);
    
// style={{border:"1px solid red"}}
    return (<div style={{backgroundColor:'white', marginTop:'-10px', paddingRight:'170px',paddingLeft:'170px'}}>

        {listMode ?
            items=== 0 ?
            <div className={classes2.root} style={{textAlign:'center',justifyContent:'center', marginTop:'200px'}}>
              <CircularProgress
              variant="determinate"
              className={classes.bottom}
              size={40}
              thickness={4}
              {...props}
              value={100}
            />
          </div>
            :
            <div style={{marginTop: '10px'}}>
            <div className={classes.main}>
              <div className={classes.search}>
                  <h3 style={{fontFamily: 'Verdana,sans-serif'}}>Search Box</h3>
                  <br/>
                  <h6 style={{fontWeight:"bold"}}>Rate</h6>
                  <ReactStars
                  count={5}
                  onChange={(e)=>{setRate(e)}}
                  size={24}
                  isHalf={true}
                  emptyIcon={<i className="far fa-star"></i>}
                  halfIcon={<i className="fa fa-star-half-alt"></i>}
                  fullIcon={<i className="fa fa-star"></i>}
                  activeColor="#ffd700"
                />
                  <br/>
                  <h6 style={{fontWeight:"bold"}}>Price</h6>
                  <li style={{listStyleType:"none",marginLeft:"5px"}}><input onChange={()=>{priceSetter(0)}} type="checkbox" /><span className="searchC">Under $10</span></li>
                  <li style={{listStyleType:"none",marginLeft:"5px"}}><input onChange={()=>{priceSetter(1)}} type="checkbox" /><span className="searchC">$10 to $15</span></li>
                  <li style={{listStyleType:"none",marginLeft:"5px"}}><input onChange={()=>{priceSetter(2)}} type="checkbox" /><span className="searchC">$15 to $25</span></li>
                  <li style={{listStyleType:"none",marginLeft:"5px"}}><input onChange={()=>{priceSetter(3)}} type="checkbox" /><span className="searchC">$25 to $35</span></li>
                  <li style={{listStyleType:"none",marginLeft:"5px"}}><input onChange={()=>{priceSetter(4)}} type="checkbox" /><span className="searchC">$35 & Above</span></li>
                  <br/><br/>
                  <h6 style={{fontWeight:"bold"}}>Condition</h6>

                  <li style={{listStyleType:"none",marginLeft:"5px"}}>
                    <input 
                    type="checkbox"
                    onChange={()=>{setNewChecked( newChecked => !newChecked)}}
                    />
                    <span className="searchC">New</span>
                  </li>
                  <li style={{listStyleType:"none",marginLeft:"5px"}}>
                    <input 
                    type="checkbox"
                    onChange={()=>{setUsedChecked( usedChecked => !usedChecked)}}
                    />
                    <span className="searchC">Used</span>
                  </li>
                  <li style={{listStyleType:"none",marginLeft:"5px"}}>
                    <input 
                    type="checkbox"
                    // onChange={()=>{setUsedChecked( usedChecked => !usedChecked)}}
                    />
                    <span className="searchC">Not Specified</span>
                  </li>

                  <br/><br/>
                  <h6 style={{fontWeight:"bold"}}>Returns</h6>
                  <li style={{listStyleType:"none",marginLeft:"5px"}}>
                    <input 
                    type="checkbox"
                    // onChange={()=>{setUsedChecked( usedChecked => !usedChecked)}}
                    />
                    <span className="searchC">returnable</span>
                  </li>
                  <li style={{listStyleType:"none",marginLeft:"5px"}}>
                    <input 
                    type="checkbox"
                    // onChange={()=>{setUsedChecked( usedChecked => !usedChecked)}}
                    />
                    <span className="searchC">non-returnable</span>
                  </li>
                  <li style={{listStyleType:"none",marginLeft:"5px"}}>
                    <input 
                    type="checkbox"
                    // onChange={()=>{setUsedChecked( usedChecked => !usedChecked)}}
                    />
                    <span className="searchC">Not Specified</span>
                  </li>

                  <br/><br/>
                  <h6 style={{fontWeight:"bold"}}>Delivery Time</h6>
                  <li style={{listStyleType:"none",marginLeft:"5px"}}>
                    <input 
                    type="checkbox"
                    // onChange={()=>{setUsedChecked( usedChecked => !usedChecked)}}
                    />
                    <span className="searchC">1-2 Days</span>
                  </li>
                  <li style={{listStyleType:"none",marginLeft:"5px"}}>
                    <input 
                    type="checkbox"
                    // onChange={()=>{setUsedChecked( usedChecked => !usedChecked)}}
                    />
                    <span className="searchC">2-5 Days</span>
                  </li>
                  <li style={{listStyleType:"none",marginLeft:"5px"}}>
                    <input 
                    type="checkbox"
                    // onChange={()=>{setUsedChecked( usedChecked => !usedChecked)}}
                    />
                    <span className="searchC">5-10 Days</span>
                  </li>
                  <li style={{listStyleType:"none",marginLeft:"5px"}}>
                    <input 
                    type="checkbox"
                    // onChange={()=>{setUsedChecked( usedChecked => !usedChecked)}}
                    />
                    <span className="searchC">10-20 Days</span>
                  </li>
                  <li style={{listStyleType:"none",marginLeft:"5px"}}>
                    <input 
                    type="checkbox"
                    // onChange={()=>{setUsedChecked( usedChecked => !usedChecked)}}
                    />
                    <span className="searchC">20-30 Days</span>
                  </li>
                  <li style={{listStyleType:"none",marginLeft:"5px"}}>
                    <input 
                    type="checkbox"
                    // onChange={()=>{setUsedChecked( usedChecked => !usedChecked)}}
                    />
                    <span className="searchC">Not Specified</span>
                  </li>
              </div>
            

              <List className={classes.root}>
                {items.map( (product,i)=>
                product.price >= searchPrice[0] && product.price <= searchPrice[1] && product.rate >= rate  ? 
                <Item key={i} click ={itemSelectHandler} productInfo={product}/>
                :
                null
                )} 
              </List>
            </div>
            </div>
            :
             <div>
               <ItemDetails productId={selectedProductId}/>
             </div>
        }

        </div>
      )
}

import React,{useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ReactStars from "react-rating-stars-component";
import Checkbox from '@material-ui/core/Checkbox';
import Item from '../itemDisplayer/Item';
import ItemDetails from '../itemDisplayer/ItemDetails';
import CircularProgress from '@material-ui/core/CircularProgress';

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
    width: '200px',
    backgroundColor: '',
    marginLeft:'10px',
    marginTop:'13px',
    padding: '10px',
  },
  main: {
    display: 'flex',
    
  },
  priceButtons: {
    justifyContent:'left',
    fontWeight :"normal",
  },
}));

export default function StoreDisplayer(props) {

    // window.history.pushState('page2', 'Title', '/buy/stores');
    const [selectedProductId, setSelectedProductId] = useState(-1);
    const [rate, setRate] = useState(0);
    const [searchPrice, setSearchPrice] = useState([0,999999999]);
    const [usedChecked, setUsedChecked] = React.useState(true);
    const [newChecked, setNewChecked] = React.useState(true);
    const [listMode, setListMode] = useState(true)

    const axios = require('axios').default;

    const [items, setIems] = useState(0);
    const classes2 = useStylesFacebook();
    const classes = useStyles();
    let storeInfo = props.info;
    console.log(storeInfo);

    function itemSelectHandler(id){
      // alert(CategoryInfo.name)
      setSelectedProductId(id);
      setListMode(listMode => !listMode)
    }


    async function getProducts(){
        await axios.get("http://127.0.0.1:8000/api/products/store/"+storeInfo.id) 
        .then( (res) => {
            console.log(res.data.data)
            setIems(res.data.data)
        })
    }


    useEffect(() => 
    {
        getProducts()
    }
    ,[]);

    return (<div>
      <h1 style={{margin:"10px",color: "#343a40", textShadow:"2px 2px 5px #343a40"}}>Welcome to <span style={{fontWeight:"",color:"rgb(236 146 14)"}}>{storeInfo.name} Store</span></h1>

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
                <h4 style={{fontFamily: 'cursive',textShadow:"3px 3px 4px #343a40"}}>Search Box</h4>
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
                <li style={{listStyleType:"none",marginLeft:"5px"}}><input type="checkbox" /><span style={{marginLeft:"5px"}}>Under $10</span></li>
                <li style={{listStyleType:"none",marginLeft:"5px"}}><input type="checkbox" /><span style={{marginLeft:"5px"}}>$10 to $15</span></li>
                <li style={{listStyleType:"none",marginLeft:"5px"}}><input type="checkbox" /><span style={{marginLeft:"5px"}}>$15 to $25</span></li>
                <li style={{listStyleType:"none",marginLeft:"5px"}}><input type="checkbox" /><span style={{marginLeft:"5px"}}>$25 to $35</span></li>
                <li style={{listStyleType:"none",marginLeft:"5px"}}><input type="checkbox" /><span style={{marginLeft:"5px"}}>$35 & Above</span></li>

                <br/><br/>
                <h6 style={{fontWeight:"bold"}}>Condition</h6>

                <li style={{listStyleType:"none",marginLeft:"5px"}}>
                  <input 
                  type="checkbox"
                  onChange={()=>{setNewChecked( newChecked => !newChecked)}}
                  />
                  <span style={{marginLeft:"5px"}}>New</span>
                </li>
                <li style={{listStyleType:"none",marginLeft:"5px"}}>
                  <input 
                  type="checkbox"
                  onChange={()=>{setUsedChecked( usedChecked => !usedChecked)}}
                  />
                  <span style={{marginLeft:"5px"}}>Used</span>
                </li>
                <li style={{listStyleType:"none",marginLeft:"5px"}}>
                  <input 
                  type="checkbox"
                  // onChange={()=>{setUsedChecked( usedChecked => !usedChecked)}}
                  />
                  <span style={{marginLeft:"5px"}}>Not Specified</span>
                </li>

                <br/><br/>
                <h6 style={{fontWeight:"bold"}}>Returns</h6>
                <li style={{listStyleType:"none",marginLeft:"5px"}}>
                  <input 
                  type="checkbox"
                  // onChange={()=>{setUsedChecked( usedChecked => !usedChecked)}}
                  />
                  <span style={{marginLeft:"5px"}}>returnable</span>
                </li>
                <li style={{listStyleType:"none",marginLeft:"5px"}}>
                  <input 
                  type="checkbox"
                  // onChange={()=>{setUsedChecked( usedChecked => !usedChecked)}}
                  />
                  <span style={{marginLeft:"5px"}}>non-returnable</span>
                </li>
                <li style={{listStyleType:"none",marginLeft:"5px"}}>
                  <input 
                  type="checkbox"
                  // onChange={()=>{setUsedChecked( usedChecked => !usedChecked)}}
                  />
                  <span style={{marginLeft:"5px"}}>Not Specified</span>
                </li>

                <br/><br/>
                <h6 style={{fontWeight:"bold"}}>Delivery Time</h6>
                <li style={{listStyleType:"none",marginLeft:"5px"}}>
                  <input 
                  type="checkbox"
                  // onChange={()=>{setUsedChecked( usedChecked => !usedChecked)}}
                  />
                  <span style={{marginLeft:"5px"}}>1-2 Days</span>
                </li>
                <li style={{listStyleType:"none",marginLeft:"5px"}}>
                  <input 
                  type="checkbox"
                  // onChange={()=>{setUsedChecked( usedChecked => !usedChecked)}}
                  />
                  <span style={{marginLeft:"5px"}}>2-5 Days</span>
                </li>
                <li style={{listStyleType:"none",marginLeft:"5px"}}>
                  <input 
                  type="checkbox"
                  // onChange={()=>{setUsedChecked( usedChecked => !usedChecked)}}
                  />
                  <span style={{marginLeft:"5px"}}>5-10 Days</span>
                </li>
                <li style={{listStyleType:"none",marginLeft:"5px"}}>
                  <input 
                  type="checkbox"
                  // onChange={()=>{setUsedChecked( usedChecked => !usedChecked)}}
                  />
                  <span style={{marginLeft:"5px"}}>10-20 Days</span>
                </li>
                <li style={{listStyleType:"none",marginLeft:"5px"}}>
                  <input 
                  type="checkbox"
                  // onChange={()=>{setUsedChecked( usedChecked => !usedChecked)}}
                  />
                  <span style={{marginLeft:"5px"}}>20-30 Days</span>
                </li>
                <li style={{listStyleType:"none",marginLeft:"5px"}}>
                  <input 
                  type="checkbox"
                  // onChange={()=>{setUsedChecked( usedChecked => !usedChecked)}}
                  />
                  <span style={{marginLeft:"5px"}}>Not Specified</span>
                </li>
            </div>
            
            <List className={classes.root}>
              {items.map( (product,i)=>
              product.price >= searchPrice[0] && product.price <= searchPrice[1] && product.rate >= rate ? 
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

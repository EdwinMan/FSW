import React,{useState, useEffect, useContext} from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import CategoryItem from './CategoryItem'
import StoreItem from './StoreItem';
import GridContainer from "../../Statistic/components/Grid/GridContainer.js";
import GridItem from "../../Statistic/components/Grid/GridItem.js";
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

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

export default function Category(props) {

    const axios = require('axios').default;

    let storeView = props.storeView;
    let itemView = props.itemView;

    const [categories, setCategories] = useState(0);
    const [stores, setStores] = useState(0);
    const classes2 = useStylesFacebook();

    async function getCategories(){
        await axios.get("http://127.0.0.1:8000/api/categories") 
        .then( (res) => {
            // console.log(res.data.data)
            setCategories(res.data.data)
        })
    }

    async function getStores(){
        await axios.get("http://127.0.0.1:8000/api/stores") 
        .then( (res) => {
            // console.log(res.data.data)
            setStores(res.data.data)
        })
    }

    useEffect(() => 
    {
        getCategories()
        getStores()
    }
    ,[]);

    // onClick={()=>{setCat({"id":cat.id, "name":cat.name})}}
    return (<div style={{width:"fit-content",textAlign:"center", margin:' 0px 130px 0px 140px'}}>
        
        <h1 style={{fontFamily: 'Garamond, serif', backgroundColor:"white", borderBottom:'1px solid gray',padding:"10px", fontWeight:'bold', margin:' 0px -130px 0px -140px'}}>Explore Popular Categories</h1>
        <GridContainer>
        {
                categories === 0 ? 

                <div className={classes2.root} style={{textAlign:'center',justifyContent:'center', marginTop:'200px'}}>
                    <CircularProgress
                    variant="determinate"
                    className={classes2.bottom}
                    size={40}
                    thickness={4}
                    {...props}
                    value={100}
                    />
                </div>
                :

                  categories.map((cat, i)=>
                  <GridItem  xs={12} sm={6} md={3}>
                      <CategoryItem 
                  key={i} 
                  CategoryInfo={cat}
                  SeeMoreButton={itemView}
                  />
                  </GridItem>
                  )}

        </GridContainer>
        <hr/>

        <h1 style={{fontFamily: 'Garamond, serif', backgroundColor:"#343a40",color:"white", border:'1px solid gray',padding:"10px", fontWeight:'bold',margin:' 0px -130px 0px -140px'}}>Explore All Stores</h1>
        <GridContainer>
        {
                stores === 0 ? 

                <div className={classes2.root} style={{textAlign:'center',justifyContent:'center', marginTop:'200px'}}>
                <CircularProgress
                variant="determinate"
                className={classes2.bottom}
                size={40}
                thickness={4}
                {...props}
                value={100}
              />
            </div>
                :
                stores.map((store, i)=>
                <GridItem  xs={12} sm={6} md={3}>
                <StoreItem 
                key={i} 
                StoreInfo={store}
                SeeMoreButton={storeView}
                /></GridItem>)
            }
        </GridContainer>

        </div>)
}

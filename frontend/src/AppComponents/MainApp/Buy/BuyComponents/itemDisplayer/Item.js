import React from 'react'
import ListItem from '@material-ui/core/ListItem';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Typography from '@material-ui/core/Typography';
import Image from 'react-bootstrap/Image'
import Media from 'react-bootstrap/Media'
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import './Item.css'

const labels = {
  0.5: 'Useless',
  1: 'Useless+',
  1.5: 'Poor',
  2: 'Poor+',
  2.5: 'Ok',
  3: 'Ok+',
  3.5: 'Good',
  4: 'Good+',
  4.5: 'Excellent',
  5: 'Excellent+',
};

const itemStyle = makeStyles((theme) => ({
    inline: {
      display: 'inline',
    },
  }));

  const useStyles = makeStyles({
    root: {
      width: 200,
      display: 'flex',
      alignItems: 'center',
    },
  });

export default function Item(props) {

    let click = props.click;
    let product = props.productInfo;  
    // console.log(product.image)

    let firstLetter = product.name.charAt(0).toUpperCase();
    let rest = product.name.slice(1);
    let product_name = firstLetter + rest;
    const classes = useStyles();
    let product_img = process.env.PUBLIC_URL + `images/${product.image}`;

    return (<>
      <Media onClick={()=>{click(product.id)}} style={{cursor:"pointer", padding:"20px", marginLeft:'60px'}} as="li">
      <img
        width={200}
        height={200}
        className="mr-3"
        src={product_img}
        // style={{border:'2px solid #343a40'}}
        alt="Generic placeholder"
    
      />
      <Media.Body
      style={{marginLeft:'50px', marginRight:'100px'}}>
        <p
        style={{fontSize:'22px', lineHeight:'24px',fontWeight:'650',fontStyle:'Verdana,sans-serif'}}
        >
        {product_name}</p>
        

        <p style={{fontSize:'18px', lineHeight:'24px',fontWeight:'400',fontStyle:'normal'}}>
        {product.description}
        </p>

    <div className={classes.root}>
      <Rating
        value={product.rate}
      />
    </div>

    <span aria-hidden="true">
      <span className="a-price-symbol">$</span>
      <span className="a-price-whole">{product.price}</span>
    </span>



      </Media.Body>
    </Media>
    <hr style={{marginTop:"20px",marginBottom:"20px" , width:"90%", borderWidth:"2px", borderColor:'#F0F0F0'}}/>
    </>)
}

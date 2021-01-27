import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import PhoneIcon from '@material-ui/icons/Phone';//phone
import HomeIcon from '@material-ui/icons/Home';//address
import PersonIcon from '@material-ui/icons/Person';//name
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import SendIcon from '@material-ui/icons/Send';

const useStyles = makeStyles((theme) => ({

    margin: {
      margin: theme.spacing(1),
    },
    root: {
      width: '1350px',
      marginBottom:"10px",
      
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      flexBasis: '44%',
      flexShrink: 0,
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
      flexBasis: '50%',
    },
    thirdHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
      },
  }));



export default function TransactionView(props) {
    
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    let item = props.item;
    const [stage, setStage] = React.useState(item.stage);
      const handleChange2 = (event) => {
        setStage(event.target.value);
      };

    
    let index = props.index;
    let AcceptOrder = props.AcceptOrder;
    let DenyOrder= props.DenyOrder;
    let stageHandler = props.stageHandler;
    let address = item.address.split(";"); //fullname-add 1- add 2- city- phone
    // console.log(item);

    let item_status = item.status === -1 ?
        <div style={{color:"blue",fontSize:"20px", fontFamily:"Noto Sans, sans-serif"}}>Awaiting Confirmation</div>
        :
        item.status === 0 ?
        <div style={{color:"red",fontSize:"20px", fontFamily:"Noto Sans, sans-serif"}}>Denied by You</div>
        :
        item.status === 2 ?
        <div style={{color:"green",fontSize:"20px", fontFamily:"Noto Sans, sans-serif"}}>Order Delivered</div>
        :
        <div style={{color:"orange",fontSize:"20px", fontFamily:"Noto Sans, sans-serif"}}>Awaiting Delivery</div>


    const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
    };


    return (
        <div className={classes.root}>
      <Accordion style={{background:"#FCFCFC"}} expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography className={classes.heading} style={{fontSize:"18px"}}>Order {index+1}</Typography>
          
          <Typography className={classes.secondaryHeading}>{item_status}</Typography>
          
          <div className={classes.thirdHeading} style={{fontSize:"18px"}}>Details</div>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          <table style={{margin:'auto', marginBottom:'50px'}}>
        <thead>
          {/* font-family: Verdana,sans-serif */}
          <tr>
            <th style={{width:'500px', padding:'10px', borderBottom:'2px solid gray', fontSize:'17px', color:'#007185'}}><ShoppingCartIcon />Requested Product</th>
            <th style={{width:'500px', padding:'10px', borderBottom:'2px solid gray', fontSize:'17px', color:'#007185'}}><PersonIcon />Receiver Name</th>
            <th style={{width:'500px', padding:'10px', borderBottom:'2px solid gray', fontSize:'17px', color:'#007185'}} ><HomeIcon />Receiver Address 1</th>
            <th style={{width:'500px', padding:'10px', borderBottom:'2px solid gray', fontSize:'17px', color:'#007185'}}><HomeIcon />Receiver Address 2</th>
            <th style={{width:'500px', padding:'10px', borderBottom:'2px solid gray', fontSize:'17px', color:'#007185'}}><LocationCityIcon />Receiver City</th>
            <th style={{width:'500px', padding:'10px', borderBottom:'2px solid gray', fontSize:'17px', color:'#007185'}}><PhoneIcon />Receiver Phone</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{width:'250px', padding:'10px', fontFamily:'Verdana,sans-serif', fontSize:'17px', fontWeight:'500'}}>{item.product_name}</td>
            <td style={{width:'250px', padding:'10px', fontFamily:'Verdana,sans-serif', fontSize:'17px', fontWeight:'500'}}>{address[0]}</td>
            <td style={{width:'250px', padding:'10px', fontFamily:'Verdana,sans-serif', fontSize:'17px', fontWeight:'500'}}>{address[1]}</td>
            <td style={{width:'250px', padding:'10px', fontFamily:'Verdana,sans-serif', fontSize:'17px', fontWeight:'500'}}>{address[2]}</td>
            <td style={{width:'250px', padding:'10px', fontFamily:'Verdana,sans-serif', fontSize:'17px', fontWeight:'500'}}>{address[3]}</td>
            <td style={{width:'250px', padding:'10px', fontFamily:'Verdana,sans-serif', fontSize:'17px', fontWeight:'500'}}>{address[4]}</td>
          </tr>
        </tbody>
      </table>
      <hr/>
          </Typography>
        </AccordionDetails>
        {
        item.status === -1 ?
        <div style={{textAlign:"center", display:"flex", justifyContent:"center"}}>
          <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          startIcon={<DeleteIcon />}
          onClick={()=>{DenyOrder(item.id)}}
          >DENY</Button>
          <div style={{width:"10px"}}></div>
          <Button
          variant="contained"
          color="primary"
          className={classes.button}
          endIcon={<SendIcon/>}
          onClick={()=>{AcceptOrder(item.id)}}
          >ACCEPT</Button>
        </div>
        :
        item.status === 1 ?
        <div style={{textAlign:"center"}}>
      <FormControl style={{width:"400px"}}>
        <InputLabel id="demo-simple-select-label">Set The Status Of The Order</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={stage}
          onChange={handleChange2}
        >
          <MenuItem value={-1}></MenuItem>
          <MenuItem value={0}>Preparing & Packaging</MenuItem>
          <MenuItem value={1}>Delivering</MenuItem>
          <MenuItem value={2}>Order Delivered</MenuItem>
        </Select>
      </FormControl>
      <br/>
      <br/>
      <Button color="primary" onClick={()=>{stageHandler(item.id, stage)}} variant="contained">Update Order status</Button>
        </div>
        :
        <div style={{textAlign:"center"}}>
        <Button
        variant="contained"
        color="secondary"
        className={classes.button}
        startIcon={<DeleteIcon />}
        onClick={()=>{alert(item.id)}}
        >Clear</Button>
        </div>
        }

        <div style={{height:"20px"}}></div>
      </Accordion>
      
    </div>
    )
}

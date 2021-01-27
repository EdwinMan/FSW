import React,{useState, useEffect,useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Image from 'react-bootstrap/Image'
import Card from 'react-bootstrap/Card'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ThumbDownOutlinedIcon from '@material-ui/icons/ThumbDownOutlined';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import GridContainer from "../../../Statistic/components/Grid/GridContainer.js";
import GridItem from "../../../Statistic/components/Grid/GridItem.js";
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import './ItemDetails.css'
import Rating from '@material-ui/lab/Rating';
import { AuthContext } from '../../../../../Context/auth-context'
import firebase from '../../../../FireBase/Firebase'

  const itemDetailStyle = makeStyles((theme) => ({
    inline: {
      display: 'flex',
    },
    font:{
        fontSize:"20px",
        // fontWeight:'bold',
         fontFamily:'Garamond, serif',
        },

    main:{
    margin: "20px",
    marginTop: "-1px",
    paddingLeft:'100px',
    paddingRight:'100px',
    // maxWidth:"1000px",
    },
  }));

  const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      flexBasis: '47%',
      flexShrink: 0,
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
    },
  }));

export default function ItemDetails(props) {

    const auth = useContext(AuthContext);
    const axios = require('axios').default;
    const classes = itemDetailStyle();  
    const [product, setProduct] = useState(0);
    const [img, setImg] = useState(0);
    const [open, setOpen] = React.useState(false);
    const [comment, setComment] = React.useState("");
    const [commentData, setCommentData] = React.useState(0);

    const [fullName, setFullName] = useState("");
    const [address1, setAddress1] = useState("");
    const [address2, setAddress2] = useState("");
    const [city, setCity] = useState("");
    const [phone, setPhone] = useState("");

    const classes2 = useStyles();
    const [expanded, setExpanded] = React.useState(false);
  
    const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
    };

    const handleClickOpen = () => {
        auth.isLoggedIn ? 
        setOpen(true)
        :
        window.location.assign("http://localhost:3000/login")
    };

    const handleClose = () => {
        setOpen(false);
    };


    async function getProduct(){
        await axios.get("http://127.0.0.1:8000/api/products/"+props.productId) 
        .then( (res) => {
            console.log("Product INFO:",res.data.data)
            setProduct(res.data.data)
            setImg(process.env.PUBLIC_URL + `images/${res.data.data.image}`)
        })

        await axios.get("http://127.0.0.1:8000/api/comments/"+props.productId) 
        .then( (res) => {
            // console.log("COMMENTS:",res.data)
            setCommentData(res.data)
            
        })
    }

    useEffect(() => 
    {
        getProduct()
    }
    ,[]);

    async function orderhandler() {
        
        let address = fullName +";"+ address1 +";"+ address2 +";"+ city +";"+ phone;

        // console.log(auth.UserID)
        await axios.post(
        "http://127.0.0.1:8000/api/transactions",
        {
         "buyer_id":auth.UserID,
         "seller_id":product.seller_id,
         "product_id":product.id,
         "quantity":1,
         "address":address,
        },
        {
            headers: {
              'Authorization': `Bearer ${auth.Token}` 
            }
        })
        .then( (res) => {
            
            firebase
            .firestore()
            .collection('finalProject')
            .onSnapshot((querySnapshot) => {
                querySnapshot.forEach( (doc) => {
                if(doc == auth.UserID){
                    let tempOrders = auth.orders;
                    auth.setOrdersContext([tempOrders[0]+1,tempOrders[1]]);
                    doc.myOrders = doc.myOrders + 1;
                }
                if(doc == product.seller_id){
                    let tempOrders = auth.orders;
                    auth.setOrdersContext([tempOrders[0],tempOrders[1]+1]);
                    doc.myReq = doc.requestedOrders + 1;
                }
                })
            })//firebase ends

            handleClose();
        })
        
    }

    async function commentHandler() {
        await axios.post(
        "http://127.0.0.1:8000/api/transactions",
        {
         "buyer_id":auth.UserID,
        }) 
        .then( (res) => {
            console.log(res.data);
            // getProduct(); should get Comments Not Products
        })
    }

    return (
        <div className={classes.main} > 
            <Breadcrumbs style={{paddingTop:'20px', paddingBottom:'20px'}} aria-label="breadcrumb">
                <Link color="inherit">
                Buy
                </Link>
                <Link color="inherit">
                Electronics
                </Link>
                <Typography color="textPrimary">{product.name}</Typography>
            </Breadcrumbs>
            <GridContainer >
                <GridItem  xs={12} sm={6} md={6}>
                <Image src={img} width="100%" height="70%" rounded />
                </GridItem>
                <GridItem  xs={12} sm={6} md={6} >
                <div className={classes.font}>
                <span id="productTitle" className="a-size-large product-title-word-break">{product.name}</span>
                <div>
                    <Rating
                    value={5}
                    />
                    <br/>
                    <span id="priceblock_ourprice" class="a-size-large a-color-price priceBlockBuyingPriceString">${product.price}</span>
                </div>
                <hr/>
                <h4 style={{fontWeight:'bold'}}>About this item</h4>
                <br/>
                <table>
                    <tbody>
                    <tr >
                            <td style={{fontWeight:'bold'}}>Description:</td>
                            <td style={{width:'25px'}}></td>
                            {product === 0 ? 
                            <td style={{fontWeight:'bold'}}>Loading</td>
                            :
                            <td className="a-list-item">{product.description}</td>
                            }
                        </tr>
                        <tr >
                            <td style={{fontWeight:'bold'}}>Condition:</td>
                            <td style={{width:'25px'}}></td>
                            {product === 0 ? 
                            <td style={{fontWeight:'bold'}}>Loading</td>
                            :
                            product.new === 1 ?
                            <td className="a-list-item">New</td>
                            :
                            <td className="a-list-item">Used</td>
                            }
                        </tr>
                        <tr>
                            <td style={{fontWeight:'bold'}}>Quantity:</td>
                            <td style={{width:'25px'}}></td>
                            {product === 0 ? 
                            <td style={{fontWeight:'bold'}}>Loading</td>
                            :
                            <td className="a-list-item">{product.quantity}</td>
                            }
                            
                        </tr>
                        <tr>
                            <td style={{fontWeight:'bold'}}>Price:</td>
                            <td style={{width:'25px'}}></td>
                            {product === 0 ? 
                            <td style={{fontWeight:'bold'}}>Loading</td>
                            :
                            <td className="a-list-item">{product.price}$</td>
                            }
                            
                        </tr>
                        <tr>
                            <td style={{fontWeight:'bold'}}>Delivery:</td>
                            <td style={{width:'25px'}}></td>
                            <td className="a-list-item">Estimated between 1-2 Days.</td>
                        </tr>
                        <tr>
                            <td style={{fontWeight:'bold'}}>Payment:</td>
                            <td style={{width:'25px'}}></td>
                            <td className="a-list-item">Cash</td>
                        </tr>
                        <tr>
                            <td style={{fontWeight:'bold'}}>Returns:</td>
                            <td style={{width:'25px'}}></td>
                            {product === 0 ? 
                            <td style={{fontWeight:'bold'}}>Loading</td>
                            :
                            product.returnable === 0 ?
                            <td className="a-list-item">Seller do not accept Returns.</td>
                            :
                            <td className="a-list-item">Seller accept Returns.</td>
                            }
                            
                        </tr>
                    </tbody>
                </table>
                </div>
                </GridItem>
            </GridContainer>
            <hr/>
            <GridContainer>

            <GridItem  xs={12} sm={6} md={6}>
            {/* {commentData.length} */}
            <h3 data-hook="dp-local-reviews-header" className="a-spacing-medium a-spacing-top-large"> Top Reviews</h3>
               
            <div >
                        {auth.isLoggedIn ? 
                        <div>
                            <TextField
                            id="outlined-multiline-static"
                            label=" Add a Comment"
                            multiline
                            rows={1}
                            onChange={(e)=>{setComment(e.target.value)}}
                            style={{width:"78%",marginRight:"2%",marginBottom:"10px"}}
                            variant="outlined"/>
                            <Button 
                            variant="contained" 
                            onClick={commentHandler}
                            style={{width:"20%", height:'55px'}}
                            color="primary">
                            Send
                            </Button>
                        </div>
                        :
                        null
                        }
                        <List className={classes.root}>
                            {
                            commentData===0 ? <span>No Comments</span>
                            :
                            commentData.map((item, i)=>
                                <ListItem alignItems="flex-start">
                                <ListItemText
                                    primary={item.fname + " " + item.lname}
                                    secondary={
                                    <React.Fragment>
                                    <Typography
                                    component="span"
                                    variant="body2"
                                    className={classes.inline}
                                    color="textPrimary"
                                    >
                                    {item.date} 
                                    </Typography>
                                    {" — "+ item.comment}
                                    <br/>
                                    <div style={{margin:"10px"}}> 
                                    <ThumbUpAltOutlinedIcon style={{cursor:"pointer"}}/>
                                    <span style={{fontWeight:'bold', margin:"10px"}}>{Math.floor(Math.random() * 15)}</span>
                                    <ThumbDownOutlinedIcon style={{cursor:"pointer"}}/>
                                    <span style={{fontWeight:'bold', margin:"10px"}}>{Math.floor(Math.random() * 5)}</span>
                                    </div>
                                    </React.Fragment>
                                    
                                    }
                                />
                                
                                </ListItem>
                            )}
                        </List>
                    </div>
                </GridItem>
                <GridItem  xs={12} sm={6} md={6}>
                <Card style={{ width: '100%', textAlign:'center',border:'1px solid #C0C0C0', marginTop:'32px' }}>
                <Card.Body>
                    <Card.Title>Order This Product</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Shop with confidence</Card.Subtitle>
                    <Card.Subtitle className="mb-2 text-muted">Pay on delivery</Card.Subtitle>
                    <Card.Text>
                    {null}
                    </Card.Text>
                    <div>
                        <div style={{textAlign:'center'}}>
                        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                        Purchase Item
                        </Button>
                        </div>
                        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                            <DialogTitle id="form-dialog-title">Shipping Address Information:</DialogTitle>
                            <DialogContent>
                            <DialogContentText>
                            Receiver information:
                            </DialogContentText>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Full Name"
                                type="text"
                                onChange={(e)=>{setFullName(e.target.value)}}
                                fullWidth
                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Address Line 1"
                                type="text"
                                onChange={(e)=>{setAddress1(e.target.value)}}
                                fullWidth
                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Address Line 2"
                                type="text"
                                onChange={(e)=>{setAddress2(e.target.value)}}
                                fullWidth
                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="City"
                                type="text"
                                onChange={(e)=>{setCity(e.target.value)}}
                                fullWidth
                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Phone"
                                type="text"
                                onChange={(e)=>{setPhone(e.target.value)}}
                                fullWidth
                            />
                            </DialogContent>
                            <DialogActions>
                            <Button onClick={handleClose} color="primary">
                                Cancel
                            </Button>
                            <Button onClick={orderhandler} color="primary">
                                Order
                            </Button>
                            </DialogActions>
                        </Dialog>
                    </div>
                </Card.Body>
                </Card>
                </GridItem>
            </GridContainer>


                </div>
    )
}



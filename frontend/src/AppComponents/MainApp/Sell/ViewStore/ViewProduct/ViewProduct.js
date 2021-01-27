import React,{useState, useEffect, useContext} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import MuiAlert from '@material-ui/lab/Alert';
import './ViewProduct.css';
import { AuthContext } from '../../../../../Context/auth-context'

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      margin: '10px',
      // border: '1px solid #343a40',
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
    },
    content: {
      flex: '1 0 auto',
    },
    cover: {
      width:"150px",
      height:"150px",
      margin: "20px 40px 20px 20px",
    
    },
    controls: {
      display: 'flex',
      alignItems: 'center',
      paddingLeft: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
    playIcon: {
      height: 38,
      width: 38,
    },
  }));

export default function ViewProduct(props) {

    const classes = useStyles();
    // const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [tempId, setTempId] = React.useState();

    let store = props.storeInfo;
    let editProduct = props.editProductHandler;
    let createProduct = props.createProductHandler;
    let quitStore = props.quitStore;
    

    const axios = require('axios').default;
    const auth = useContext(AuthContext);
    const [product, setProduct] = useState([]);

    const handleClickOpen = (id) => {
        setOpen(true);
        setTempId(id);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

    async function getProducts(){
        await axios.get("http://127.0.0.1:8000/api/products/store/"+store.id,
        {
            headers: {
              'Authorization': `Bearer ${auth.Token}` 
            }
        }) 
        .then( (res) => {
            console.log(res.data.data)
            setProduct(res.data.data)
        })
    }

    async function deleteProductHandler(id){

        await axios.delete("http://127.0.0.1:8000/api/products/"+id,
        {
            headers: {
              'Authorization': `Bearer ${auth.Token}` 
            }
        })
        .then( (res) => {
            console.log(res.data.data)
            getProducts()
            handleClose()
        })
    }

    useEffect(() => 
    {
        getProducts()
    }
    ,[]);

    // backgroundColor:'white',
    return (<div style={{padding:"40px 190px 20px 190px"}}>
    {
        product.length === 0 ?
        <Alert 
        severity="info"
        style={{margin:"15px", marginBottom:"30px" , backgroundColor:"#607d8b"}}
        >Start By Adding Your First Product!</Alert>
        :
        product.map( (product, i)=>
        <Card key={i} className={classes.root}>
        {/* Section One Image */}
        <CardMedia
        
        className={classes.cover}
        image={process.env.PUBLIC_URL + `images/${product.image}`}
        title="Live from space album cover"
        />

        {/* Section Two Info */}
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            {product.name}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Price: {product.price}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Quantity: {product.quantity}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {/* Product Rate: {product.rate} */}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Description: {product.description.substring(0,19)+"..."}
          </Typography>
        </CardContent>
      </div>

        
      {/* Section Three Manage */}
      <div className={classes.controls} style={{marginLeft:"auto"}}>
      <div onClick={()=>{editProduct(product)}} className="icon">
            <EditOutlined style={{marginBottom:'5px', marginLeft: "1px",  marginRight: "1px"}}/>
        </div>
        {/* handleClickOpen */}
        <div onClick={()=>{handleClickOpen(product.id)}} className="icon">
            <DeleteOutlined style={{marginBottom:'5px', marginLeft: "1px",  marginRight: "1px"}}/>
        </div>
        <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{"Are You Sure You Want to Delete This Product?"}</DialogTitle>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Disagree
                </Button>
                <Button onClick={()=>{deleteProductHandler(tempId)}} color="primary" autoFocus>
                    Agree
                </Button>
            </DialogActions>
        </Dialog>

      </div>

      </Card>)}
      <Button 
      onClick={quitStore} 
      variant="contained"
      style={{marginLeft:"10px",marginRight:"10px"}}
      >quit store</Button>

      <Button 
      style={{marginLeft:"10px",marginRight:"10px", backgroundColor:"#343a40"}} 
      onClick={createProduct} 
      variant="contained" 
      color="primary">
      Add New Product
      </Button>

      

    </div>)
}

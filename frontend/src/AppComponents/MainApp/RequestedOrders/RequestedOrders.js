import React,{useState, useEffect,useContext} from 'react'
import { AuthContext } from '../../../Context/auth-context'
import RequestedOrderItem from './RequestedOrderItem';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TransactionView from './TransactionView';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `vertical-tab-${index}`,
      'aria-controls': `vertical-tabpanel-${index}`,
    };
  }
  
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
      display: 'flex',
      height: '100%',
      width:'1600px',
      margin:'auto',
      marginTop:'30px',
    //   paddingTop:'20px',
      

    },
    tabs: {
      borderRight: `1px solid ${theme.palette.divider}`,
    },
  }));

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }


export default function RequestedOrders() {
    const auth = useContext(AuthContext);
    const axios = require('axios').default;

    const classes = useStyles();
    const [value, setValue] = React.useState(0);
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    
    const [open, setOpen] = React.useState(false);
  
    const handleClick = () => {
      setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };


    const [transactions, setTransactions] = useState(0)

    async function getTransactions(){
        await axios.get("http://127.0.0.1:8000/api/transactions/seller/"+auth.UserID,
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

    async function AcceptOrder(id) {
        // console.log("Order Accepted with transaction ID:",id);

        await axios.put(
        "http://127.0.0.1:8000/api/transactions/"+id,
        {
            "status":1,
        },
        {
            headers: {
              'Authorization': `Bearer ${auth.Token}` 
            }
        })
        .then( (res) => {
            // console.log(res.data)
            getTransactions()
        })
        }

    async function DenyOrder(id) {
        // console.log("Order Denied with transaction ID:",id);

        await axios.put(
        "http://127.0.0.1:8000/api/transactions/"+id,
        {
            "status":0,
        },
        {
            headers: {
              'Authorization': `Bearer ${auth.Token}` 
            }
        })
        .then( (res) => {
            // console.log(res.data)
            getTransactions()
        })
        }


    useEffect(() => 
    {
        getTransactions()
    }
    ,[]);



    async function stageHandler(id, s) {
        handleClick()
        if(s === 2){
            await axios.put(
                "http://127.0.0.1:8000/api/transactions/"+id,
                {
                    "stage":s,
                    "status":2,
                },
                {
                    headers: {
                      'Authorization': `Bearer ${auth.Token}` 
                    }
                })
                .then( (res) => {
                    getTransactions()
                })
        }
        else if(s !== ''){
            await axios.put(
                "http://127.0.0.1:8000/api/transactions/"+id,
                {
                    "stage":s,
                },
                {
                    headers: {
                      'Authorization': `Bearer ${auth.Token}` 
                    }
                })
                .then( (res) => {
                    // console.log(res.data)
                    // alert("Done")
                    // handleClick()
                })
        }

    }

    function StoreOrdersInfo(key) {
        let waitingConfirmation = 0;   // status = -1
        let waitingDelivery     = 0;   // status =  1
        let OrderDelivered      = 0;   // status =  2
        let Denied              = 0;   // status =  0

        key.forEach(item => {
            item.status === -1 ? 
            waitingConfirmation = waitingConfirmation + 1
            :
            item.status === 0 ? 
            Denied = Denied + 1
            :
            item.status === 1 ? 
            waitingDelivery = waitingDelivery + 1
            :
            OrderDelivered = OrderDelivered + 1
        });

        return [waitingConfirmation,waitingDelivery,OrderDelivered,Denied]
    }
      
        return (<div style={{width:'100%',height:'886px', marginTop:'-30px',backgroundColor:'white'}}>
          <div className={classes.root}>
            <Tabs
              orientation="vertical"
              variant="scrollable"
              value={value}
              onChange={handleChange}
              aria-label="Vertical tabs example"
              className={classes.tabs}
              style={{paddingTop:'15px' , textAlign:'left'}} //,borderLeft:'1px solid red'
            >
              {Object.keys(transactions).map((key ,i)=>
              
              <Tab
              style={{fontSize:'22px', textAlign:'left'}}
               label={key} {...a11yProps(i)} />)}
            </Tabs>
            {Object.keys(transactions).map((key ,i)=>
                <TabPanel value={value} index={i}>
                    <table style={{width:'1350px', marginBottom:'20px', fontSize:'20px'}}>
                        <tr>
                            <td><span style={{fontWeight:'bold'}}>Store Name:</span> <span style={{color:'#007185'}}>{key}</span></td> 
                            <td><span style={{fontWeight:'bold'}}>Total Orders:</span> <span style={{color:'#007185'}}>{transactions[key].length}</span></td>
                            <td><span style={{fontWeight:'bold'}}>Awaiting Confirmation:</span> <span style={{color:'#007185'}}>{StoreOrdersInfo(transactions[key])[0]}</span></td>
                            <td><span style={{fontWeight:'bold'}}>Awaiting Delivery:</span> <span style={{color:'#007185'}}>{StoreOrdersInfo(transactions[key])[1]}</span></td>
                            <td><span style={{fontWeight:'bold'}}>Order Delivered:</span> <span style={{color:'#007185'}}>{StoreOrdersInfo(transactions[key])[2]}</span></td>
                            <td><span style={{fontWeight:'bold'}}>Denied:</span> <span style={{color:'#007185'}}>{StoreOrdersInfo(transactions[key])[3]}</span></td>
                        </tr>
                    </table>
                {transactions[key].map( (item, j)=>
                <TransactionView stageHandler={stageHandler} DenyOrder={DenyOrder} AcceptOrder={AcceptOrder} item={item} index={j}/>
                )}
              </TabPanel> )}

            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    Status Updated Successfully!
                </Alert>
            </Snackbar>
          </div>
          </div> );

            
    
}


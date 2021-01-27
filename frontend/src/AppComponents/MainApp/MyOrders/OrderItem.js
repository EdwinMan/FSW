import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DeleteIcon from '@material-ui/icons/Delete';
import CancelIcon from '@material-ui/icons/Cancel';
import CustomizedSteppers from './CustomizedSteppers';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      marginTop:"10px",
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      flexBasis: '50%',
      flexShrink: 0,
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
    },
  }));




export default function OrderItem(props) {

    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const [open, setOpen] = React.useState(false);

    let transaction_info = props.info;
    let index = props.key;
    let DeleteTransactions = props.DeleteTransactions;

    // transaction_info.status = 1

    let AccordionIcon;
    let AccordionStyle;
    let isExpanded;
    let AccordionDetail;
    let tempAddress;

    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

      const cancelHandleClose = () => {
        DeleteTransactions(transaction_info.id);
        setOpen(false);
      };

    if(transaction_info.status === 1){
        AccordionStyle = {cursor:'pointer'};
        tempAddress = transaction_info.created_at.split(" ")[0];
        AccordionIcon = <div><span style={{fontSize:'20px', marginRight:'110px'}}></span><ExpandMoreIcon /></div>; 
        isExpanded = expanded === `panel${index}`;
        AccordionDetail = <CustomizedSteppers transaction_info={transaction_info}/>;
    }
    else{
        AccordionStyle = {cursor:'auto'};
        AccordionIcon = <div><span style={{fontSize:'20px', marginRight:'10px'}}>{transaction_info.created_at.split(" ")[0]}</span><DeleteIcon onClick={()=>{DeleteTransactions(transaction_info.id)}}/></div>;
        isExpanded = null;
        AccordionDetail = null;
        }
    if(transaction_info.status === -1){
        AccordionIcon = 
        <>
        <span style={{fontSize:'20px', marginRight:'10px'}}>{transaction_info.created_at.split(" ")[0]}</span>
          <CancelIcon onClick={handleClickOpen} />
          <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          >
          <DialogTitle id="alert-dialog-title">{"Are You Sure You Want to Cancel This Order?"}</DialogTitle>
          <DialogContent>
          <DialogContentText id="alert-dialog-description">
          By Canceling this order, it will be completely discard and the Store Will not Receive any order
          </DialogContentText>
          </DialogContent>
          <DialogActions>
          <Button onClick={handleClose} color="primary">
          Discard
          </Button>
          <Button onClick={cancelHandleClose} color="primary" autoFocus>
          Cancel
          </Button>
          </DialogActions>
          </Dialog>
      </>;
    }


    const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
    };

    return (
        <div className={classes.root}>
          <Accordion  expanded={isExpanded} onChange={handleChange(`panel${index}`)}>
            <AccordionSummary
              expandIcon={AccordionIcon}
              style= {AccordionStyle}
            >
              <Typography className={classes.heading} style={{fontSize:"25px"}}>{transaction_info.name}</Typography>
              {transaction_info.status === -1 ?
              <Typography className={classes.secondaryHeading} style={{fontSize:"18px"}}>Pending</Typography>
              :
              transaction_info.status === 0 ?
              <Typography className={classes.secondaryHeading} style={{fontSize:"18px",color:"red"}}>Denied</Typography>
              :
              transaction_info.status === 1 ?
              <Typography className={classes.secondaryHeading} style={{fontSize:"18px",color:"orange"}}>Accepted</Typography>
              :
              <Typography className={classes.secondaryHeading} style={{fontSize:"18px",color:"#28a745"}}>Received</Typography>
            }
            </AccordionSummary>
            
            <AccordionDetails>
              {AccordionDetail}
            </AccordionDetails>
          </Accordion>
        </div>
      );
}

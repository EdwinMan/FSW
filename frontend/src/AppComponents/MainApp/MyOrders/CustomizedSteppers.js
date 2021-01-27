import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Check from '@material-ui/icons/Check';
import SettingsIcon from '@material-ui/icons/Settings';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import VideoLabelIcon from '@material-ui/icons/VideoLabel';




const useQontoStepIconStyles = makeStyles({
  root: {
    color: '#eaeaf0',
    display: 'flex',
    height: 22,
    alignItems: 'center',
  },
  active: {
    color: '#784af4',
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: 'currentColor',
  },
  completed: {
    color: '#784af4',
    zIndex: 1,
    fontSize: 18,
  },
});

function QontoStepIcon(props) {
  const classes = useQontoStepIconStyles();
  const { active, completed } = props;

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
      })}
    >
      {completed ? <Check className={classes.completed} /> : <div className={classes.circle} />}
    </div>
  );
}

QontoStepIcon.propTypes = {
  /**
   * Whether this step is active.
   */
  active: PropTypes.bool,
  /**
   * Mark the step as completed. Is passed to child components.
   */
  completed: PropTypes.bool,
};



const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  active: {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  },
  completed: {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
  },
});

function ColorlibStepIcon(props) {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;

  const icons = {
    1: <SettingsIcon />,
    2: <GroupAddIcon />,
    3: <VideoLabelIcon />,
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {icons[String(props.icon)]}
    </div>
  );
}

ColorlibStepIcon.propTypes = {
  /**
   * Whether this step is active.
   */
  active: PropTypes.bool,
  /**
   * Mark the step as completed. Is passed to child components.
   */
  completed: PropTypes.bool,
  /**
   * The label displayed in the step icon.
   */
  icon: PropTypes.node,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',  
    textAlign:'center', 
    justifyContent:'center',
    
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return ['Preparing & Packaging', 'Delivering'];
}


export default function CustomizedSteppers(props) {
  // let stage = props.transaction_info.stage;
  let transaction_info =  props.transaction_info;
  console.log(transaction_info.stage);
  const classes = useStyles();
  let address = transaction_info.address.split(";");
  const steps = getSteps();

console.log(transaction_info);
  return (
    <div className={classes.root}>
      <table style={{margin:'auto', marginBottom:'50px'}}>
        <thead>
          {/* font-family: Verdana,sans-serif */}
          <tr>
            <th style={{width:'250px', padding:'10px', borderBottom:'2px solid gray', fontSize:'20px', color:'#007185'}}>Order Placed</th>
            <th style={{width:'250px', padding:'10px', borderBottom:'2px solid gray', fontSize:'20px', color:'#007185'}}>Order Price</th>
            <th style={{width:'250px', padding:'10px', borderBottom:'2px solid gray', fontSize:'20px', color:'#007185'}} >Ship To</th>
            <th style={{width:'250px', padding:'10px', borderBottom:'2px solid gray', fontSize:'20px', color:'#007185'}}>Shipping Address</th>
            <th style={{width:'250px', padding:'10px', borderBottom:'2px solid gray', fontSize:'20px', color:'#007185'}}>Phone</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{width:'250px', padding:'10px', fontFamily:'Verdana,sans-serif', fontSize:'17px', fontWeight:'500'}}>{transaction_info.created_at}</td>
            <td style={{width:'250px', padding:'10px', fontFamily:'Verdana,sans-serif', fontSize:'17px', fontWeight:'500'}}>{transaction_info.price} $</td>
            <td style={{width:'250px', padding:'10px', fontFamily:'Verdana,sans-serif', fontSize:'17px', fontWeight:'500'}}>{address[0]}</td>
            <td style={{width:'250px', padding:'10px', fontFamily:'Verdana,sans-serif', fontSize:'17px', fontWeight:'500'}}>{address[3]}, {address[1]}, {address[2]}</td>
            <td style={{width:'250px', padding:'10px', fontFamily:'Verdana,sans-serif', fontSize:'17px', fontWeight:'500'}}>{address[4]}</td>
          </tr>
        </tbody>
      </table>
      <hr/>
      <h4 style={{color:'#007185'}}>Track Your Order</h4>
      <Stepper alternativeLabel activeStep={transaction_info.stage}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
}

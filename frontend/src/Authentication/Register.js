import React,{useState} from 'react'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import firebase from '../AppComponents/FireBase/Firebase';

function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://material-ui.com/">
          ORS
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }


  const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

export default function Register(props) {

    let Switch = props.Switch;
    const classes = useStyles();
    const axios = require('axios').default;

    const [fName, setFName] = useState()
    const [lName, setLName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [phone, setPhone] = useState()


    // function makeFirebase(){
      
    //     firebase.firestore().collection().doc(email).set({
    //       myOrders: 0,
    //       requestedOrders: 0
    //     })
    //     .catch(function(error) {
    //         console.log("Could not access Firestore cloud: ", error);
    //     });
      
    // }

    async function RegisterHandler(){

      firebase.firestore().collection("finalProject").doc(email).set({
        myOrders: 0,
        requestedOrders: 0
      })
      .catch(function(error) {
          console.error("Could not access Firestore cloud: ", error);
      });

            await axios.post(
                "http://127.0.0.1:8000/api/users",
                {
                 "fName":fName,
                 "lName":lName,
                 "address":"address",
                 "email":email,
                 "password":password,
                 "phone":phone
                }
                 ) 
                .then( async (res) => {
                  // makeFirebase()
                  Switch()
                }) 
        
              
    }

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>

            {/* first name */}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="First Name"
            autoFocus
            onChange={(e)=>{setFName(e.target.value)}}
          />

            {/* last name */}
            <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Last Name"
            autoFocus
            onChange={(e)=>{setLName(e.target.value)}}
          />


            {/* phone */}
            <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Phone"
            autoFocus
            onChange={(e)=>{setPhone(e.target.value)}}
          />

            {/* email */}
            <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(e)=>setEmail(e.target.value)}
          />

            {/* confirm Email */}
            <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Confirm Email"
            name="email"
            autoComplete="email"
            autoFocus
            // onChange={(e)=>setEmail(e.target.value)}
          />

            {/* password */}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e)=>setPassword(e.target.value)}
          />
            {/* confirm password */}
            <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Confirm Password"
            type="password"
            id="password"
            autoComplete="current-password"
            // onChange={(e)=>setPassword(e.target.value)}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={RegisterHandler}
          >
            Sign Up
          </Button>
          <Grid container>
            <Grid item onClick={Switch}>
              <Link href="#" variant="body2">
                {"Already have an account? Sign In"}
              </Link>
            </Grid>
          </Grid>
        
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>

    )
}

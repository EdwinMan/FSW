import React, {useState, useContext} from 'react'
import { AuthContext } from '../Context/auth-context';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
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
        <Link color="inherit" href="https://localhost:3000">
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

export default function Login(props) {

    const classes = useStyles();
    const auth = useContext(AuthContext); 
    let Switch = props.Switch;

    const axios = require('axios').default;

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    async function LoginHandler(){
        await axios.post(
            "http://127.0.0.1:8000/api/login",
            {
             "email":email,
             "password":password
            }
             ) 
            .then( (res) => {
                console.log(res.data.data[1]);
                try{
                    auth.setUserID(res.data.data[0][0].id)
                    auth.setToken(res.data.data[1])
                    firebase
                    .firestore()
                    .collection('finalProject')
                    .onSnapshot((querySnapshot) => {
                        querySnapshot.forEach( (doc) => {
                        if(doc === email){
                          auth.setOrdersContext([doc.myOrders,doc.requestedOrders])
                          // break;
                        }
                        })
                    })//firebase ends

                    auth.login()
                    window.history.pushState('page2', 'Title', '/buy');
                }
                catch{
                    console.log("ERROR")
                }
              
              });
    }

    return (<div>
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div  className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        
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
          <div style={{marginRight:'auto'}}>
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          </div>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={LoginHandler}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item onClick={Switch}>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        
      </div>

      <Box mt={8}>
        <Copyright />
      </Box>


    </Container>
    </div>
    )
}

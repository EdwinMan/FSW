import React,{useState} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthContext } from './Context/auth-context'
import firebase from "./AppComponents/FireBase/Firebase";

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import NavBar from './AppComponents/NavBar/NavBar';
import Auth from './Authentication/Auth';
import Sell from './AppComponents/MainApp/Sell/Sell.js';
import Buy from './AppComponents/MainApp/Buy/Buy.js';
import MyOrders from './AppComponents/MainApp/MyOrders/MyOrders.js';
import RequestedOrders from './AppComponents/MainApp/RequestedOrders/RequestedOrders.js';
import Statistic from './AppComponents/MainApp/Statistic/Statistic.js';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userID, setUserID] = useState();
  const [token, setToken] = useState();
  const [orders, setOrders] = useState([0,0]);

  const ref = firebase.firestore().collection('fsw-final')
  
  function getOrders() {
  ref.onSnapshot((querySnapshot) => {
    const items = [];
    querySnapshot.forEach( (doc) => {
      if(doc.User_id === userID){
      items.push(doc.data());
    }
    })
    setOrders(items);
  })}
  const login = ()=> {
    setIsLoggedIn(true);
  }

  const logout = ()=> {
    setIsLoggedIn(false);
  }

  const setTheUserID = (id)=> {
    setUserID(id);
  }

  const setUserToken = (t)=>{
    setToken(t)
  }
  

  const setUserOrders = ()=>{
    // setOrders(o)
    getOrders();
  }
  return (
    <div style={{ 
      // backgroundImage: process.env.PUBLIC_URL + `images/1-1-1609682062.png`,
    }}>
      <Router>

      <AuthContext.Provider
    value={ { isLoggedIn:isLoggedIn,
              login: login,
              logout:logout,
              UserID: userID,
              setUserID: setTheUserID,
              setToken:setUserToken,
              Token:token,
              orders:orders,
              setOrdersContext:setUserOrders
              }
          }>
                

          <NavBar/>

          {isLoggedIn? 
          <Switch>
          <Route exact path="/myorders">
              <MyOrders/>
          </Route>
          <Route exact path="/requestedorders">
              <RequestedOrders/>
          </Route>
          <Route exact path="/statistic">
            <Statistic/>
          </Route>
          <Route exact path="/sell">
              <Sell/>
          </Route>
          <Route path="/">
              <Buy/>
          </Route>
          </Switch>
          :
          <Switch>
          <Route exact path="/login">
              <Auth/>
          </Route>
          <Route exact path="/sell">
              <Auth/>
          </Route>
          <Route path="/">
              <Buy/>
          </Route>
          </Switch>
          }


          

        </AuthContext.Provider>

      </Router>
    </div>
  );
}

export default App;









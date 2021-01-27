import React, {useState, useContext, useEffect} from 'react'
import './NavBar.css'
import Nav from 'react-bootstrap/Nav'
import { AuthContext } from '../../Context/auth-context';
import {Link} from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar'
import Badge from '@material-ui/core/Badge';
import MailIcon from '@material-ui/icons/Mail';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import firebase from '../FireBase/Firebase';

export default function NavBar() {

    const auth = useContext(AuthContext); 
    const [buy, setBuy] = useState(null)
    const [sell, setSell] = useState(null)
    const [login, setLogin] = useState(null)
    const [mOrder, setMOrder] = useState(null)
    const [rOrder, setROrder] = useState(null)
    const [statistic, setStatistic] = useState(null)
    const [orders, setOrders] = useState([])
    function logoutHandler(){
        auth.logout()
    }

    function buttonSelectedBuy(){
        setBuy({color:"rgb(218, 165, 32)"})
        setSell(null)
        setMOrder(null)
        setROrder(null)
        setStatistic(null)
        setLogin(null)
    }
    function buttonSelectedSell(){
        setBuy(null)
        setSell({color:"rgb(218, 165, 32)"})
        setMOrder(null)
        setROrder(null)
        setStatistic(null)
        setLogin(null)
    }

    function buttonSelectedMyORder(){
        setBuy(null)
        setSell(null)
        setMOrder({color:"rgb(218, 165, 32)"})
        setROrder(null)
        setStatistic(null)
        setLogin(null)
    }

    function buttonSelectedReqOrder(){
        setBuy(null)
        setSell(null)
        setMOrder(null)
        setROrder({color:"rgb(218, 165, 32)"})
        setStatistic(null)
        setLogin(null)
    }

    function buttonSelectedStatistic(){
        setBuy(null)
        setSell(null)
        setMOrder(null)
        setROrder(null)
        setStatistic({color:"rgb(218, 165, 32)"})
        setLogin(null)
    }

    function buttonSelectedLogin(){
        setBuy(null)
        setSell(null)
        setMOrder(null)
        setROrder(null)
        setStatistic(null)
        setLogin({color:"rgb(218, 165, 32)"})
    }

    
    function getOrders() {
        firebase.firestore().collection('finalProject')
        .onSnapshot( (querySnapshot) => {
            querySnapshot.forEach( (doc) => {
                if(doc == auth.UserID){
                    setOrders([doc.myOrders,doc.requestedOrders]);
                }
                    
            })
        })
    }

    useEffect( ()=>{
        getOrders()
    },[])

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand  style={{color:"rgb(104 127 255)", fontWeight: "bold"}}>ORS</Navbar.Brand>
            <Navbar.Brand>{' '}</Navbar.Brand>
            <Navbar.Brand>{' '}</Navbar.Brand>

            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                <Navbar.Brand ><Link onClick={buttonSelectedBuy}  to="buy" style={{color:"white", textDecoration:"none"}}><div style={buy} className="navLinks">Buy</div></Link></Navbar.Brand>
                <Navbar.Brand>{' '}</Navbar.Brand>
                <Navbar.Brand><Link onClick={buttonSelectedSell} to="sell" style={{color:"white", textDecoration:"none"}}><div style={sell} className="navLinks">Sell</div></Link></Navbar.Brand>
                <Navbar.Brand>{' '}</Navbar.Brand>
                {auth.isLoggedIn ? 
                <>
                <Navbar.Brand><Link to="myorders" onClick={buttonSelectedMyORder} style={{color:"white", textDecoration:"none"}}>
                    <div style={mOrder} className="navLinks">
                        My Orders
                        <Badge badgeContent={orders[0]} color="primary" style={{marginLeft:'5px'}}>
                                <ShoppingCartOutlinedIcon />
                        </Badge>
                    </div>
                    </Link></Navbar.Brand>
                <Navbar.Brand>{' '}</Navbar.Brand>
                <Navbar.Brand><Link to="requestedorders" onClick={buttonSelectedReqOrder} style={{color:"white", textDecoration:"none"}}>
                    <div style={rOrder} className="navLinks">
                        Requested Orders 
                        
                            <Badge badgeContent={orders[1]} color="primary" style={{marginLeft:'5px'}}>
                                <MailIcon />
                            </Badge>
                    </div>
                    </Link></Navbar.Brand>
                <Navbar.Brand>{' '}</Navbar.Brand>
                <Navbar.Brand><Link to="statistic" onClick={buttonSelectedStatistic} style={{color:"white", textDecoration:"none"}}><div style={statistic} className="navLinks">Statistics</div></Link></Navbar.Brand>

                </>
                :
                null}

                </Nav>
                <Nav>
                    {auth.isLoggedIn ? 
                    <>
                    <Navbar.Brand><Link to="premium" style={{color:"white", textDecoration:"none"}}>Account</Link></Navbar.Brand>
                    <Navbar.Brand  onClick={logoutHandler} ><Link to="/" style={{color:"#DCDCDC", textDecoration:"none", cursor:"pointer"}}><div className="navLinks">Logout</div></Link></Navbar.Brand>
                    </>
                    :
                    <Navbar.Brand><Link to="login" onClick={buttonSelectedLogin} style={{color:"white", textDecoration:"none"}}><div style={login} className="navLinks">Login</div></Link></Navbar.Brand>
                    }
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

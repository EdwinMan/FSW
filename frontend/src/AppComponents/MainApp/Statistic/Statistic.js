import React,{useState, useEffect,useContext} from 'react'
import { AuthContext } from '../../../Context/auth-context'
import { makeStyles } from "@material-ui/core/styles";
import Store from "@material-ui/icons/Store";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import AccessTime from "@material-ui/icons/AccessTime";
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import Button from '@material-ui/core/Button';
import GridItem from "./components/Grid/GridItem.js";
import GridContainer from "./components/Grid/GridContainer.js";
import Table from "./components/Table/Table.js";
import Card from "./components/Card/Card.js";
import CardHeader from "./components/Card/CardHeader.js";
import CardIcon from "./components/Card/CardIcon.js";
import CardBody from "./components/Card/CardBody.js";
import CardFooter from "./components/Card/CardFooter.js";
import {CanvasJSChart } from 'canvasjs-react-charts';

import jsPDF from 'jspdf';
  
import styles from "./dashboardStyle.js";

const useStyles = makeStyles(styles);




export default function Statistic() {

  let yData = [0,0,0,0,0,0,0]; // graph One
  let yData2 = [0,0,0,0,0,0,0]; // graph Two
  

  const axios = require('axios').default;
  const auth = useContext(AuthContext);
    const classes = useStyles();
    const [totalStores, setTotalStores] = useState(null)
    const [totalRevenue, setTotalRevenue] = useState(null)
    const [totalSold, setTotalSold] = useState(null)
    const [totalProducts, setTotalProducts] = useState(null)
    const [graph1Sales, setGraph1Sales] = useState(0)
    const [graph2Sales, setGraph2Sales] = useState(0)

    const [graph1, setGraph1] = useState([
      { y: 0, label: "Mon" },
      { y: 0, label: "Tues" },
      { y: 0, label: "Wed" },
      { y: 0, label: "Thur" },
      { y: 0, label: "Fri" },
      { y: 0, label: "Yesterday" },
      { y: 0, label: "Today" }
    ])

    const [graph2, setGraph2] = useState([
      { y: 0, label: "Mon" },
      { y: 0, label: "Tues" },
      { y: 0, label: "Wed" },
      { y: 0, label: "Thur" },
      { y: 0, label: "Fri" },
      { y: 0, label: "Yesterday" },
      { y: 0, label: "Today" }
    ])

  const options = {
    backgroundColor: "transparent",
    animationEnabled: true,
    exportEnabled: true,
    theme: "light2", //"light1", "dark1", "dark2"
    title:{
      // text: "Simple Column Chart with Index Labels"
    },
    axisY: {
      includeZero: true
    },
    data: [{
      type: "column", //change type to bar, line, area, pie, etc
      indexLabel: "{y}", //Shows y value on all Data Points
      indexLabelFontColor: "#5A5757",
      indexLabelPlacement: "inside", //outside //inside
      dataPoints: graph1
      // dataPoints: [
      //   { x: 10, y: 71 },
      //   { x: 20, y: 55 },
      //   { x: 30, y: 50 },
      //   { x: 40, y: 65 },
      //   { x: 50, y: 71 },
      //   { x: 60, y: 68 },
      //   { x: 70, y: 38 },
      //   { x: 80, y: 92, indexLabel: "Highest" },
      //   { x: 90, y: 54 },
      //   { x: 100, y: 60 },
      //   { x: 110, y: 21 },
      //   { x: 120, y: 49 },
      //   { x: 130, y: 36 }
      // ]
    }]
  }


  const options2 = {
    backgroundColor: "transparent",
    animationEnabled: true,
    exportEnabled: true,
    theme: "light2", //"light1", "dark1", "dark2"
    title:{
      // text: "Simple Column Chart with Index Labels"
    },
    axisY: {
      includeZero: true
    },
    data: [{
      type: "area", //change type to bar, line, area, pie, etc
      indexLabel: "{y}", //Shows y value on all Data Points
      indexLabelFontColor: "#5A5757",
      indexLabelPlacement: "inside", //outside //inside
      dataPoints: graph2
      // dataPoints: [
      //   { x: 10, y: 71 },
      //   { x: 20, y: 55 },
      //   { x: 30, y: 50 },
      //   { x: 40, y: 65 },
      //   { x: 50, y: 71 },
      //   { x: 60, y: 68 },
      //   { x: 70, y: 38 },
      //   { x: 80, y: 92, indexLabel: "Highest" },
      //   { x: 90, y: 54 },
      //   { x: 100, y: 60 },
      //   { x: 110, y: 21 },
      //   { x: 120, y: 49 },
      //   { x: 130, y: 36 }
      // ]
    }]
  }

  const generatePDF = () => {
    var doc = new jsPDF('p','pt');
    doc.text(20,20,"this is default text")
    doc.setFont('courier')
    // doc.setFontType('normal')
    doc.save("report.pdf")
  }


    async function getData() {

      await axios.get("http://127.0.0.1:8000/api/stores/total/"+auth.UserID,
      {
          headers: {
            'Authorization': `Bearer ${auth.Token}` 
          }
      })
      .then( (res) => {
          // console.log(res.data.data)
          setTotalStores(res.data.data)
      });

      await axios.get("http://127.0.0.1:8000/api/totalrevenue/"+auth.UserID,
      {
          headers: {
            'Authorization': `Bearer ${auth.Token}` 
          }
      })
      .then( (res) => {
          // console.log(res.data[0].total_Revenue)
          setTotalRevenue(res.data[0].total_Revenue)
      })

      await axios.get("http://127.0.0.1:8000/api/totalsold/"+auth.UserID,
      {
          headers: {
            'Authorization': `Bearer ${auth.Token}` 
          }
      }) 
      .then( (res) => {
          // console.log(res.data)
          setTotalSold(res.data)
      })
      
      await axios.get("http://127.0.0.1:8000/api/products/totalproducts/"+auth.UserID,
      {
          headers: {
            'Authorization': `Bearer ${auth.Token}` 
          }
      })
      .then( (res) => {
          // console.log(res.data)
          setTotalProducts(res.data)
      })

      await axios.get("http://127.0.0.1:8000/api/transactions/storestatus/"+auth.UserID,
      {
          headers: {
            'Authorization': `Bearer ${auth.Token}` 
          }
      }) 
      .then( (res) => {
          console.log(res.data)
          // setGraphData(res.data)
          // var today = new Date();
          // console.log(today.getDate())

          

          try{
            yData[0] = res.data[0].views
            yData2[0] = parseInt(res.data[0].total_Revenue); 
          }catch{}
          try{
            yData[1] = res.data[1].views
            yData2[1] = parseInt(res.data[1].total_Revenue); 
          }catch{}
          try{
            yData[2] = res.data[2].views
            yData2[2] = parseInt(res.data[2].total_Revenue); 
          }catch{}
          try{
            yData[3] = res.data[3].views
            yData2[3] = parseInt(res.data[3].total_Revenue); 
          }catch{}
          try{
            yData[4] = res.data[4].views
            yData2[4] = parseInt(res.data[4].total_Revenue); 
          }catch{}
          try{
            yData[5] = res.data[5].views
            yData2[5] = parseInt(res.data[5].total_Revenue); 
          }catch{}
          try{
            yData[6] = res.data[6].views
            yData2[6] = parseInt(res.data[6].total_Revenue); 
          }catch{}

          console.log("yData2: ",yData2);

          setGraph1([
            { y: Math.ceil(yData[6] + yData[6]*0.55), label: "Mon" },
            { y: Math.ceil(yData[5] + yData[5]*0.55), label: "Tues" },
            { y: Math.ceil(yData[4] + yData[4]*0.55), label: "Wed" },
            { y: Math.ceil(yData[3] + yData[3]*0.55), label: "Thur" },
            { y: Math.ceil(yData[2] + yData[2]*0.55), label: "Fri" },
            { y: Math.ceil(yData[1] + yData[1]*0.55), label: "Yesterday" },
            { y: Math.ceil(yData[0] + yData[0]*0.55), label: "Today" }
          ])

          setGraph2([
            { y: Math.ceil(yData2[6] + yData2[6]*0.55), label: "Mon" },
            { y: Math.ceil(yData2[5] + yData2[5]*0.55), label: "Tues" },
            { y: Math.ceil(yData2[4] + yData2[4]*0.55), label: "Wed" },
            { y: Math.ceil(yData2[3] + yData2[3]*0.55), label: "Thur" },
            { y: Math.ceil(yData2[2] + yData2[2]*0.55), label: "Fri" },
            { y: Math.ceil(yData2[1] + yData2[1]*0.55), label: "Yesterday" },
            { y: Math.ceil(yData2[0] + yData2[0]*0.55), label: "Today" }
          ])

          setGraph1Sales([yData[0],yData[1]])
          setGraph2Sales([yData2[0],yData2[1]])
      })

      

    }

    useEffect(() => 
    {
        getData()
    }
    ,[]);


    return(<div style={{margin:"10px"}}>
            <GridContainer>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
              <Store />
              </CardIcon>
              <p className={classes.cardCategory} style={{fontSize:'20px'}}>Total Stores</p>
              <h3 className={classes.cardTitle}>
                {Math.floor(totalStores + totalStores*0.55)}
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Update />
                Just Updated
              </div>
            </CardFooter>
          </Card>
        </GridItem>

        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <MonetizationOnIcon />
              </CardIcon>
              <p className={classes.cardCategory} style={{fontSize:'20px'}}>Total Revenue</p>
              <h3 className={classes.cardTitle}>${Math.floor(parseInt(totalRevenue)  + parseInt(totalRevenue)*0.55)}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Update />
                Just Updated
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <ShoppingCartIcon/>
              </CardIcon>
              <p className={classes.cardCategory} style={{fontSize:'20px'}}>Total Sold Product</p>
              <h3 className={classes.cardTitle}>{Math.floor(parseInt(totalSold)  + parseInt(totalSold)*0.55)}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Update />
                Just Updated
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
        <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <ShoppingBasketIcon />
              </CardIcon>
              <p className={classes.cardCategory} style={{fontSize:'20px'}}>Total Products</p>
              <h3 className={classes.cardTitle}>+{Math.floor(parseInt(totalProducts)  + parseInt(totalProducts)*0.55)}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Update />
                Just Updated
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      
      <GridContainer>

      <GridItem xs={12} sm={12} md={6}>

      
        <Card chart >
        {/* color="success" */}
        {/* <CardHeader style={{backgroundColor:"rgb(0 255 0 / 30%)"}}> */}
        <CardHeader style={{backgroundColor:"#F8F8F8"}}>
        <CanvasJSChart options = {options}/>
        <hr/>
        </CardHeader>
        <CardBody>
              <h4 className={classes.cardTitle}>Daily Products Sold</h4>
              <p className={classes.cardCategory}>
                <span className={classes.successText} style={{color:'red'}}>
                  <ArrowDownward className={classes.upArrowCardCategory} /> {Math.round(((graph1Sales[0]/(graph1Sales[0]+graph1Sales[1]))*100))}%
                  {/* <ArrowUpward className={classes.upArrowCardCategory} /> {Math.round(((graph1Sales[0]/(graph1Sales[0]+graph1Sales[1]))*100))}% */}
                </span>{" "}
                decrease in today sales.
              </p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> updated 0 minutes ago
              </div>
            </CardFooter>
        </Card>

      </GridItem>



      <GridItem xs={12} sm={12} md={6}>
      <Card chart >
        {/* color="success" */}
        <CardHeader style={{backgroundColor:"#F8F8F8"}}>
        <CanvasJSChart options = {options2}/>
        <hr/>
        </CardHeader>
        <CardBody>
              <h4 className={classes.cardTitle}>Daily Profit</h4>
              {Math.round(((graph2Sales[0]/(graph2Sales[0]+graph2Sales[1]))*100)-50) >= 0 ? 
              <p className={classes.cardCategory}>
              <span className={classes.successText}>
                <ArrowUpward className={classes.upArrowCardCategory} /> {Math.round(((graph2Sales[0]/(graph2Sales[0]+graph2Sales[1]))*100)-50)}%
              </span>{" "}
              increase in today sales.
            </p>
            :
            <p className={classes.cardCategory}>
            <span className={classes.successText} style={{color:'red'}}>
              <ArrowDownward className={classes.upArrowCardCategory} /> {Math.round(((graph2Sales[0]/(graph2Sales[0]+graph2Sales[1]))*100)-50)}%
            </span>{" "}
            decrease in today sales.
          </p>
              }

            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> updated 0 minutes ago
              </div>
            </CardFooter>
        </Card>
      </GridItem>

      </GridContainer>

  <div style={{textAlign:'center'}}>
  <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="warning">
              <h4 className={classes.cardTitleWhite} style={{fontSize:'30px'}}>Stores Stats</h4>
              <p className={classes.cardCategoryWhite}>
                {/* blabla */}
              </p>
            </CardHeader>
            <CardBody style={{fontSize:'25px'}}>
              <Table
                tableHeaderColor="warning"
                tableHead={["ID", "Store Name", "Profit", "Total Items", "Sold Items"]}
                tableData={[
                  ["1", "VitamineBeirut", "$205", "7", "2"],
                  ["2", "Pawxie", "$100", "12", "6"],
                  ["3", "ToyStore", "$105", "4", "2"],
                  ["4", "HadiStore", "$155", "5", "4"],
                  ["5", "TipTop", "$205", "7", "5"],
                  ["6", "TopLaptop", "$55", "3", "1"],
                  ["7", "TopSecretOutlet", "$86", "7", "2"],
                  ["8", "TopTissus", "$40", "2", "1"],
                ]}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
      </div>
      <div style={{justifyContent:'center', textAlign:'center'}}>
        <Button 
              onClick={generatePDF} 
              variant="contained" 
              color="primary"
              style={{marginBottom:"10px", backgroundColor:"#343a40"}}
              >Download Report</Button>
        </div>
      </div>
    )

   
}

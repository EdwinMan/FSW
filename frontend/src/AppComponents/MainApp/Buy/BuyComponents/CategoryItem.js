/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import './CategoryItem.css'


const useStyles = makeStyles((theme) => ({
    root: {
      width: 400,
      '& > *': {
        margin: theme.spacing(1),
      },
      margin: "10px",

    },
    media: {
      width:350,
      paddingTop: '70.25%', // 16:9
      margin: 'auto',
      
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[500],
    },
  }));

export default function CategoryItem(props) {

    let CategoryInfo = props.CategoryInfo;
    let setCat = props.SeeMoreButton;

    const classes = useStyles();
    return (
      <Card className={classes.root}>
        <div
        className="MuiT"
        >
        {CategoryInfo.name} 
        </div>
        <CardMedia
          className={classes.media}
          style={{cursor:"pointer"}}
          image={process.env.PUBLIC_URL + 'images/'+CategoryInfo.name+'.png'}
          title={CategoryInfo.name} 
          onClick={()=>{setCat(CategoryInfo)}}
        />
        <CardContent>
          <Typography variant="body2" style={{textAlign:"left"}}  component="p">
            <a
            onClick={()=>{setCat(CategoryInfo)}}
            style={{color:"#007185",  fontSize:"120%", cursor:"pointer", fontFamily:'"Amazon Ember",Arial,sans-serif', whiteSpace: 'nowrap',textOverflow: 'ellipsis'}}
            >Shop now</a>
          </Typography>

        </CardContent>
      </Card>
    );
  }
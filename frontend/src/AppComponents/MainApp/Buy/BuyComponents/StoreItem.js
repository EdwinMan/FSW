import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
      width: 400,
      height: 400,
      margin: "10px",
      cursor: "pointer",
    },
    media: {
      height: 250,
    },
  });


export default function StoreItem(props) {
    const classes = useStyles();
    let StoreInfo = props.StoreInfo;
    let SeeMoreButton = props.SeeMoreButton
    console.log(StoreInfo)

    return (
        
        <Card onClick={()=>{SeeMoreButton(StoreInfo)}}className={classes.root}>
            
            <CardMedia
              className={classes.media}
              image={process.env.PUBLIC_URL + 'images/'+StoreInfo.name+'.png'}
              title="Contemplative Reptile"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
              {StoreInfo.name}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
              {StoreInfo.description}
              </Typography>
            </CardContent>
          
        </Card>
        
      );
    }
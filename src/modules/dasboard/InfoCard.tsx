import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import { red } from '@material-ui/core/colors';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import React from 'react';

const formatDate = (timestamp: number) => moment(timestamp).format('MMMM Do YYYY, h:mm:ss a');

const useStyles = makeStyles(
  createStyles({
    card: {
      width: '100%',
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    avatar: {
      backgroundColor: red[500],
    },
  }),
);

const InfoCard = ({ data }: any) => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar aria-label="Recipe" className={classes.avatar}>
            R
          </Avatar>
        }
        title={data.name}
        subheader={formatDate(data.createdAt)}
      />
      <CardMedia
        className={classes.media}
        image={data.imgSrc}
        title={data.manufacturer}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          <strong>manufacturer:</strong> {data.manufacturer}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          <strong>customer:</strong> {data.customer}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          <strong>description:</strong> {data.description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default InfoCard;

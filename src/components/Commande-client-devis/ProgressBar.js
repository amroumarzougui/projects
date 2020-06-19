
import React from 'react';
import { lighten, makeStyles, withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';

const ColorCircularProgress = withStyles({
  root: {
    color: '#00695c',
  },
})(CircularProgress);

const ColorLinearProgress = withStyles({
  colorPrimary: {
    // backgroundColor: '#b2dfdb',
    backgroundColor: '#00695c',
  },
  barColorPrimary: {
    backgroundColor: '#00965d', 
    // backgroundColor: '#d2dfdb',
  },
})(LinearProgress);

const BorderLinearProgress = withStyles({
  root: {
    height: 10,
    backgroundColor: lighten('#ff6c5c', 0.5),
  },
  bar: {
    borderRadius: 20,
    backgroundColor: '#ff6c5c',
  },
})(LinearProgress);

// Inspired by the Facebook spinners.
const useStylesFacebook = makeStyles({
  root: {
    position: 'relative',
  },
  top: {
    color: '#eef3fd',
  },
  bottom: {
    color: '#6798e5',
    animationDuration: '550ms',
    position: 'absolute',
    left: 0,
  },
});



const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  margin: {
    margin: theme.spacing(1),
  },
}));

export default function ProgressBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {/* <ColorCircularProgress size={30} thickness={5} /> */}
      <ColorLinearProgress className={classes.margin} />
      {/* <BorderLinearProgress
        className={classes.margin}
        variant="determinate"
        color="secondary"
        value={50}
      />
      <FacebookProgress /> */}
    </div>
  );
}

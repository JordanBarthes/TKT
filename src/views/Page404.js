import React from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core';

const style = () => ({
    page404: {
        display: 'flex',
        justifyContent: 'center',
        height: '500px',
        alignItems: 'center'
    }
});
const Page404 = ({ classes }) => (
    <Typography className={classes.page404} align='center'
        variant="h1" gutterBottom>
        PAGE 404
  </Typography>
);


export default withStyles(style)(Page404);

import { makeStyles } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles({
    XColor: {
        color: 'red',
    },
    OColor: {
        color: 'blue',
    }
})

export default function Square({value,clicked}){
    const classes = useStyles();
    return(<button style={{width: '20px',height: '20px'}} onClick={clicked} className={value === 'X' ? classes.XColor : classes.OColor}>{value}</button>)
}
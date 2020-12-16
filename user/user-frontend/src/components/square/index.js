import { Button } from '@material-ui/core';
import React from 'react';

export default function Square({value,clicked}){
    return(<button style={{width: '20px',height: '20px'}} onClick={clicked}>{value}</button>)
}
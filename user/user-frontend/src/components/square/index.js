import { Button } from '@material-ui/core';
import React from 'react';

export default function Square({clicked}){
    return(<button style={{width: '20px',height: '20px'}} onClick={clicked}></button>)
}
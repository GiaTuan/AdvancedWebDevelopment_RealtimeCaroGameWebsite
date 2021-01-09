import { Box } from '@material-ui/core';
import React from 'react';
import Square from './square';

export default function Board({board}){
    return(
        <Box>    
            <Box style={{width: "400px",margin: 'auto'}}>
            {
                board.map((value,key) => (
                    <Square key={key} value={value}></Square>
                ))
            }
            </Box>
        </Box>)
}
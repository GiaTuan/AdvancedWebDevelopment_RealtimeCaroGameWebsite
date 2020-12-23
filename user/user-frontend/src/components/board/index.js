import { Box, Button } from '@material-ui/core';
import React from 'react';
import Square from '../square';

export default function Board({board,handleClickSquare}){
    return(
        <Box>    
            <Box flexWrap="wrap" style={{width: "400px",margin: 'auto'}}>
            {
                board.map((value,key) => (
                    <Square key={key} value={value} clicked={() => handleClickSquare(key)}></Square>
                ))
            }
            </Box>
        </Box>)
}
import { Box, Button } from '@material-ui/core';
import React from 'react';
import Square from '../square';

export default function Board({board,handleClickSquare}){
    // const nRows = 20;
    // const nCols = 20;
    // const squares = new Array(nRows*nCols).fill(0);
    

    
    return(
        <>    
            <Box flexWrap="wrap" style={{width: "400px"}}>
            {
                board.map((value,key) => (
                    <Square key={key} value={value} clicked={() => handleClickSquare(key)}></Square>
                ))
            }
            </Box>
        </>)
}
import { Box, Button } from '@material-ui/core';
import React from 'react';
import Square from '../square';

export default function Board(props){
    const nRows = 50;
    const nCols = 50;
    const squares = new Array(nRows*nCols).fill(0);

    const handleClickSquare = (i) => {
        console.log(Math.floor(i/50),(i%50),"Clicked");
    }

    return(
        <>
            
            <Box flexWrap="wrap" style={{width: "1000px"}}>
            {
                squares.map((value,key) => (
                    <Square key={key} clicked={() => handleClickSquare(key)}></Square>
                ))
            }
            </Box>
        </>)
}
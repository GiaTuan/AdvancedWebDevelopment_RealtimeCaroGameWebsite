import { Box, makeStyles, Typography } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles({
    chatBox: {
        height: '500px',
        overflow: 'scroll',
    }
});

export default function BoardHistory({history})
{
    const classes = useStyles();
    return(
    <Box>
        <Box cellHeight={160} className={classes.chatBox}>
            {
                history.map((value,key) => (
                <Typography key={key}>{value.idUser}: ({value.row}:{value.col})</Typography>
                ))
            }
        </Box>
    </Box>)
}

//idGame: "1", idUser: 1, row: 1, col: 4, turn: "X"
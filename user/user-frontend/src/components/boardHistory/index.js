import { Box, makeStyles, Typography } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles({
    chatBox: {
        height: '500px',
        overflow: 'scroll',
        overflowX: 'hidden'
    }
});

export default function BoardHistory({history})
{
    const classes = useStyles();
    return(
    <Box>
        <Box  cellHeight={160} boxShadow={2} p={2} className={classes.chatBox}>
        <Typography variant="h5">History:</Typography>

            {
                history.map((value,key) => (
                <Typography key={key}><b>{value.idUser}</b>: ({value.row}:{value.col})</Typography>
                ))
            }
        </Box>
    </Box>)
}
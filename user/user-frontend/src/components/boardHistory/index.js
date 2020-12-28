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
                    value.idUser !== undefined ? 
                    <Typography key={key}><b>Player {value.idUser}</b>: clicked at row <b>{value.row}</b>, column <b>{value.col}</b></Typography>
                    :
                    <Typography key={key}><b>Player {value.iduser}</b>: clicked at row <b>{value.row}</b>, column <b>{value.col}</b></Typography>
                ))
            }
        </Box>
    </Box>)
}
import { Box, Button, GridList, GridListTile, makeStyles, TextField, Typography } from "@material-ui/core";
import React ,{useState} from "react";

const useStyles = makeStyles({
    chatBox: {
        height: '500px',
        overflow: 'scroll',
    }
});

export default function Chat({chatHistory,handleChangeText,handleSubmitChat}){
    const classes = useStyles();
    return(
        <Box>
            <Box cellHeight={160} className={classes.chatBox}>
                {
                    chatHistory.map((value,key) => (
                    <Typography key={key}>{Object.keys(value)}: {value[Object.keys(value)]}</Typography>
                    ))
                }
            </Box>
            <Box border={1}>
                <form onSubmit={handleSubmitChat}>
                    <TextField onChange={handleChangeText} fullWidth></TextField>
                    <Button type="submit">Submit</Button>
                </form>
            </Box>
            
        </Box>);
}
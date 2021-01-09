import { Box, Button, makeStyles, TextField, Typography } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles({
    chatBox: {
        height: '500px',
        overflow: 'scroll',
        overflowX: 'hidden'
    },
    chatWrap : {
        wordWrap: 'break-word'
    }
});

export default function Chat({chatHistory,handleChangeText,handleSubmitChat,isDisableChat}){
    const classes = useStyles();
    return(
        <Box>
            
            <Box cellHeight={160} boxShadow={2} p={2} className={classes.chatBox}>
            <Typography variant="h5">Chat:</Typography>
                {
                    chatHistory.map((value,key) => (
                    <Typography key={key} className={classes.chatWrap}><b>{value.user.id} - {value.user.name}</b>: {value.content}</Typography>
                    ))
                }
            </Box>

            {
                isDisableChat ? 
                null : 
                <Box mt={2}>
                    <form onSubmit={handleSubmitChat}>
                        <TextField label="Text here" variant="outlined" onChange={handleChangeText} fullWidth multiline rowsMax={4}></TextField>
                        <Button type="submit" variant="contained" color="primary">Submit</Button>
                    </form>
                </Box>
            }
            
        </Box>);
}
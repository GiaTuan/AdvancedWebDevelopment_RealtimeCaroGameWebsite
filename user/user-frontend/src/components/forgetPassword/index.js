import { Box, Button, CssBaseline, Grid, makeStyles, MuiThemeProvider, Paper, TextField, Typography } from '@material-ui/core';
import React , {useState} from 'react';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import {Link, useHistory} from 'react-router-dom';
import URL from '../url';

const useStyles = makeStyles({
    paperContainer: {
        paddingTop: '3em',
        paddingLeft: '1em',
        paddingRight: '1em',
        paddingBottom: '1em',
        width: '389px'
    }
});

export default function Login(props){
    const [email,setEmail] = useState('');
    const [message,setMessage] = useState('');
    const classes = useStyles();

    const submitForget = async (e) => {
        e.preventDefault();
        const response = await fetch(URL.getUrl()+"login/forgotPassword",{
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            email: email})});
        
        if(response.status === 200)
        { 
            setMessage("Sent to email");
        }
        if(response.status === 401){
            setMessage("Email not existed");
        } 
    }

    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
    }
   

    
    return (
        <>
            <MuiThemeProvider>
                <CssBaseline></CssBaseline>
                <Grid container justify="center" alignItems="center" direction="column" style={{height: '100vh'}}>
                    <Grid item >
                        <Typography variant={"h4"}>Caro Game</Typography>
                    </Grid>
                    <br></br>
                    <br></br>
                    <Grid item lg={4}>
                        <Paper elevation={3} className={classes.paperContainer}>
                            <Typography style={{textAlign: 'center'}}>Forget password</Typography>
                            <form onSubmit={submitForget}>
                                <TextField  name="email" label="Email" onChange={handleChangeEmail} fullWidth>
                                </TextField>
                                <br></br>
                                <Typography style={{color: 'red'}}>{message}</Typography>
                                <br></br>
                                <Button variant="contained" color="primary" fullWidth type="submit">
                                    Send to email
                                </Button>
                            </form><br></br>
                           
                                
                            <br></br>
                            <Typography style={{textAlign: 'center'}}><Link to="/">Login</Link></Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </MuiThemeProvider>
        </>);
}
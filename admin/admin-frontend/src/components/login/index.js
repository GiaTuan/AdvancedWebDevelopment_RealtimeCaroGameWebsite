import { Button, CssBaseline, Grid, makeStyles, MuiThemeProvider, Paper, TextField, Typography } from '@material-ui/core';
import React , {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import URL from '../url';
import Auth from '../protectedRoute/authentication'

const useStyles = makeStyles({
    paperContainer: {
        paddingTop: '3em',
        paddingLeft: '1em',
        paddingRight: '1em',
        paddingBottom: '1em'
    },
    googleLoginBtn:{
        marginTop: '1em',
        width: '100%'
    },
    facebookLoginBtn:{
        marginTop: '10px',
        background: '#365899',
        border: '1px solid transparent',
        borderRadius: '2px',
        alignItems: 'center',
        boxShadow: 'rgba(0, 0, 0, 0.24) 0px 2px 2px 0px, rgba(0, 0, 0, 0.24) 0px 0px 1px 0px',
        color: '#ffffff',
        fontSize: '14px',
        width: '100%',
        textAlign: 'left',
        fontWeight: '500',
        display: 'inline-flex',
        paddingTop: '10px',
        paddingRight: '10px',
        paddingBottom: '10px',
        paddingLeft: '15px'
    },
});

export default function Login(props){
    const [loginData,setLoginData] = useState({
        username: '',
        password: ''
    });
    const [message,setMessage] = useState('');
    const history = useHistory();
    const classes = useStyles();

    const submitLogin = async (e) => {
        e.preventDefault();
        const response = await fetch(URL.getUrl()+"login",{
            method: 'POST',
            mode: 'cors',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
        username: loginData.username,
        password: loginData.password})});

        if(response.ok)
        { 
            const data = await response.json();
            localStorage.setItem('token',data.token); 
            Auth.logIn(() => {
                props.history.push("/hall");
            });               
        }
        else setMessage("Username or password is not correct")
    }

    const onChangeUsername = (e) => {
        setLoginData({...loginData, username: e.target.value});
    }

    const onChangePassword = (e) => {
        setLoginData({...loginData, password: e.target.value});
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
                            <Typography style={{textAlign: 'center'}}>Login</Typography>
                            <form onSubmit={submitLogin}>
                                <TextField  name="username" label="Username" onChange={onChangeUsername} fullWidth>
                                </TextField>
                                <TextField  name="password" label="Password" type="password" onChange={onChangePassword} fullWidth>
                                </TextField>
                                <br></br>
                                <Typography style={{color: 'red'}}>{message}</Typography>
                                <br></br>
                                <Button variant="contained" color="primary" fullWidth type="submit">
                                    Login
                                </Button>
                            </form>
                                <br></br>
                                <br></br>
                                <Typography style={{textAlign: 'center'}}>or <Link to="/register">Register</Link> </Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </MuiThemeProvider>
        </>);
}
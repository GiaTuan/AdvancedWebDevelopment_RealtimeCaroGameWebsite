import { Button, createMuiTheme, CssBaseline, Grid, makeStyles, MuiThemeProvider, Paper, TextField, Typography } from '@material-ui/core';
import React , {useState} from 'react';
import URL from '../url';

const useStyles = makeStyles({
    paperContainer: {
        paddingTop: '3em',
        paddingLeft: '1em',
        paddingRight: '1em',
        paddingBottom: '1em'
    }
});

const theme = createMuiTheme({
    overrides: {
        MuiCssBaseline: {
          "@global": {
            body: {
              backgroundImage:
              `url(${"/crossword.png"})`
            }
          }
        }
      }
})

export default function Register(props){
    const classes = useStyles();
    const [registerData,setRegisterData] = useState({
        username: '',
        email: '',
        password: '',
        name: '',
        phone: '',
    });
    const [message,setMessage] = useState('');
    const [isSuccess,setIsSuccess] = useState(false);

    const submitRegister = async (e) => {
        e.preventDefault();
        if(registerData.username === '' || registerData.email === '' || registerData.password === '')
        {
            setMessage("Username or email or password is empty");
            return;
        }
        const response = await fetch(URL.getUrl()+"register",{
                mode: 'cors',
                method: 'POST',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            username: registerData.username,
            email: registerData.email,
            password: registerData.password,
            name: registerData.name,
            phone: registerData.phone})});
            
        const data = await response.json()
        if(response.status === 403)
        {
            setMessage(data);
        }

        else
        {
            setIsSuccess(true);
            setMessage("Register successfully, please check email to activate your account");
        }
    }

    const onChangeUsername = (e) =>{
        setRegisterData({...registerData,
            username: e.target.value
        })
    };

    const onChangeEmail = (e) =>{
        setRegisterData({...registerData,
            email: e.target.value
        })
    };

    const onChangePassword = (e) =>{
        setRegisterData({...registerData,
            password: e.target.value
        })
    };

    const onChangeName = (e) =>{
        setRegisterData({...registerData,
            name: e.target.value
        })
    };

    const onChangePhone = (e) =>{
        setRegisterData({...registerData,
            phone: e.target.value
        })
    };
    return (
        <>
            <MuiThemeProvider theme = {theme}>
                <CssBaseline></CssBaseline>
                <Grid container justify="center" alignItems="center" direction="column" style={{height: '100vh'}}>
                    <Grid item >
                        <Typography variant={"h4"}>Caro Game</Typography>
                    </Grid>
                    <br></br>
                    <br></br>
                    <Grid item lg={4}>
                        <Paper elevation={3} className={classes.paperContainer}>
                            <Typography style={{textAlign: 'center'}}>Register</Typography>
                            <form onSubmit={submitRegister}>
                                <TextField onChange={onChangeUsername} name="username" label="*Username" fullWidth>
                                </TextField>
                                <TextField onChange={onChangePassword} name="password" label="*Password" type="password" fullWidth>
                                </TextField>
                                <TextField onChange={onChangeEmail} name="email" label="*Email" type="text"  fullWidth>
                                </TextField>
                                <TextField onChange={onChangeName} name="name" label="Name" type="text"  fullWidth>
                                </TextField>
                                <TextField onChange={onChangePhone} name="phone" label="Phone" type="text"  fullWidth>
                                </TextField>
            
                        
                                <br></br>
                                <Typography style={ isSuccess? {color: 'blue'} : {color: 'red'}}>{message}</Typography>
                                <br></br>

                                <Button variant="contained" color="primary" fullWidth type="submit">
                                    Register
                                </Button>
                                <br></br>
                                <br></br>
                                <Typography style={{textAlign: 'center'}}>or <a href="/">Login</a> </Typography>
                            </form>
                        </Paper>
                    </Grid>
                </Grid>
            </MuiThemeProvider>
        </>);
}
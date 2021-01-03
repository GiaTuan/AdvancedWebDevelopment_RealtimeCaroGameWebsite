import { Box, Button, Grid, Typography, TextField } from '@material-ui/core';
import React,{useState,useEffect} from 'react';
import { Link, useHistory, useLocation, useParams } from 'react-router-dom';
import URL from '../url';

export default function ChangePassword(props){
    const [currentPassword,setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [message,setMessage]=useState('');
    const location = useLocation();
    const history = useHistory();
    const {id} = useParams();

    useEffect(()=>{
        async function verifyUser() {
            const response = await fetch(URL.getUrl()+"users/verify",{
                method: 'GET',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }});

            if(response.status === 401)
            {
                history.push('/');
            }
        }

        verifyUser();
    },[]);

    const handleChangeCurrentPassword = (e) => {
        setCurrentPassword(e.target.value);
    }

    const handleChangeNewPassword = (e) => {
        setNewPassword(e.target.value);
    }

    const handleSubmitChangePassword = async (e) => {
        e.preventDefault();
        if(currentPassword === '' || newPassword === '')
        {
            setMessage("Current or new password is empty");
            return;
        }
        const response = await fetch(URL.getUrl()+"users/"+id+'/changePassword',{
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')},
            body: JSON.stringify({
                currentPassword: currentPassword,
                newPassword: newPassword})});
        
        const data = await response.json();
        setMessage(data);
    }

    return(
        <Box m={3}>
           <Grid container spacing={2}>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                    <Link to={{
                        pathname: "/user/"+location.state?.idUser,
                        state: { idUser: location.state?.idUser}}}>
                            <Button variant="outlined" color="primary">Return To Info</Button>
                    </Link>
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                    <Box boxShadow={4}>
                        <Grid container justify="center" alignItems="center" direction="column" style={{height: '100vh'}}>
                            <Grid item>
                                <Typography variant="h5">
                                    Change Password
                                </Typography>
                            </Grid>
                            <Grid item>
                                <form onSubmit={handleSubmitChangePassword}>
                                    <div>
                                        <TextField  type="password" label="Currnet password" onChange={handleChangeCurrentPassword}></TextField>
                                    </div>
                                    <div>
                                        <TextField type="password" label="New password" onChange={handleChangeNewPassword}></TextField>
                                    </div><br></br>
                                    <Typography>{message}</Typography>
                                    <Button variant="contained" color="primary" type="submit">Change</Button>
                                </form>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}
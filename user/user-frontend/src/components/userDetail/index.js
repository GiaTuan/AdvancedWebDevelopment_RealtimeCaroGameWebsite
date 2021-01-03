import { Box, Button, Grid, Typography } from '@material-ui/core';
import React,{useState,useEffect} from 'react';
import { Link, useHistory, useLocation, useParams } from 'react-router-dom';
import URL from '../url';

export default function UserDetail(props){
    const [user,setUser] = useState({
        email: "",
        id: 0,
        isadmin: false,
        isblocked: false,
        name: "",
        phone: "",
        point: 0,
        totalplays: 0,
        totalwins: 0
    })
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

        async function getUser(){
            const response = await fetch(URL.getUrl()+"users/" + id,{
                method: 'GET',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }});

            const data = await response.json();
            setUser(data);
        }

        verifyUser();
        getUser();
    },[]);


    return(
        <Box m={3}>
           <Grid container spacing={2}>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                    <Link to={{
                        pathname: "/hall",
                        state: { idUser: location.state?.idUser}}}>
                            <Button variant="outlined" color="primary">Return To Hall</Button>
                    </Link>
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                    <Box boxShadow={4}>
                        <Grid container justify="center" alignItems="center" direction="column" style={{height: '100vh'}}>
                            <Grid item>
                                <Typography variant="h5">
                                    User's Information
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography>
                                    ID: {user.id}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography>
                                    Name: {user.name}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography>
                                    Email: {user.email}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography>
                                    Phone: {user.phone}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography>
                                    &#9956; Point: {user.point}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography>
                                    &#9876; Total plays: {user.totalplays}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography>
                                    &#9818; Total wins: {user.totalwins} ({(user.totalwins/user.totalplays*100).toFixed(3)}%)
                                </Typography>
                            </Grid>
                            <Grid item>
                            {
                                id === location.state?.idUser.toString() ? 
                                <Link to={{
                                pathname: "/user/"+location.state?.idUser +"/changePassword",
                                state: {
                                    idUser: location.state?.idUser
                                }}} style={{textDecoration: 'none'}}>
                                    <Button variant="contained" color="primary">Change Password</Button>
                                </Link> : null
                            }
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}
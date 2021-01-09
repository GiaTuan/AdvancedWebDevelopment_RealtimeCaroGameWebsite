import { Box, Button, Grid, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import Header from '../../header';
import URL from '../../url';

export default function UserDetail(props){
    const [user,setUser] = useState({
        email: "",
        id: 3,
        isadmin: false,
        isblocked: false,
        name: "",
        phone: "",
        point: 0,
        totalplays: 0,
        totalwins: 0
    })
    const history = useHistory();
    const {id} = useParams();

    useEffect(()=>{
        async function verifyUser() {
            const response = await fetch(URL.getUrl()+"account/verify",{
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
            const response = await fetch(URL.getUrl()+"account/" + id,{
                method: 'GET',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }});

            const data = await response.json();
            console.log(data);
            setUser(data);
        }

        verifyUser();
        getUser();
    },[])

    const hanleBlockUser = async () => {
        const respond = await fetch(URL.getUrl() + "account/" + id + "/block",{
            method: 'GET',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }});

        if(respond.status === 200)
        {
            console.log("huhu");
            setUser({...user,isblocked: true});
        }
    }

    const handleUnblockUser = async () => {
        const respond = await fetch(URL.getUrl() + "account/" + id + "/unblock",{
            method: 'GET',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }});

        if(respond.status === 200)
        {
            setUser({...user,isblocked: false});
        }
    }

    const handleGetGamesOfUser = async () => {
        history.push('/users/' + id + "/games");
    }

    return(
        <Box m={3}>
           <Grid container spacing={2}>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                    <Header></Header>
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                    <Box boxShadow={4}>
                        <Grid container justify="center" alignItems="center" direction="column" style={{height: '100vh'}}>
                            <Grid item>
                                <Typography variant="h4">
                                    User's Information
                                </Typography>
                            </Grid>
                            <Grid item>
                                {
                                    user.isadmin ?                                  
                                    <Typography variant="h6">
                                       <b>Admin</b>
                                    </Typography>
                                    :
                                    <Typography variant="h6">
                                       <b>Member
                                       {
                                            user.isblocked ? 
                                                <span> (Blocked)</span>
                                            : null
                                        }</b>
                                    </Typography>
                                }
                            </Grid>
                            <Grid item>
                                <Typography>
                                    <b>ID:</b> {user.id}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography>
                                    <b>Name:</b> {user.name}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography>
                                    <b>Email:</b> {user.email}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography>
                                    <b>Phone:</b> {user.phone}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography>
                                    <b>&#9956; Point:</b> {user.point}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography>
                                    <b>&#9876; Total plays:</b> {user.totalplays}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography>
                                    <b>&#9818; Total wins:</b> {user.totalwins} ({(user.totalwins/user.totalplays*100,3).toFixed(3)}%)
                                </Typography>
                            </Grid>
                            <Grid item>
                                
                            </Grid>
                            <br></br>
                            <Grid item>
                                <Button variant="contained" onClick={handleGetGamesOfUser} >Games user played</Button>
                            </Grid><br></br>
                            <Grid item>
                                {
                                    user.isblocked ? 
                                    <Button onClick={handleUnblockUser} variant="contained" color="primary">Unblock user</Button> 
                                    :
                                    <Button onClick={hanleBlockUser} variant="contained" color="secondary">Block user</Button>
                                }
                                
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}
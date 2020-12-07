import { Grid, Typography } from '@material-ui/core';
import React , {useState,useEffect} from 'react';
import ListUser from '../listUser';
import {initializeSocket,getUsetsOnline} from '../socket';

export default function Hall(props){
    const [usersOnline,setUsersOnline] = useState([]);
    useEffect(() => {
        initializeSocket();
        getUsetsOnline(users => {
            let newUsersOnlineArray =[];
            for(const user in users)
            {
                newUsersOnlineArray = [...newUsersOnlineArray,users[user]];

            }
            setUsersOnline(newUsersOnlineArray);
        });
    },[]);

    return (
        <Grid container spacing={2}>
            <Grid item lg={3} xs={3} sm={3} md={3}>
                <ListUser usersOnline={usersOnline}></ListUser>
            </Grid>
            <Grid item lg={9}>
                Chat container
            </Grid>
        </Grid> 
    );
}

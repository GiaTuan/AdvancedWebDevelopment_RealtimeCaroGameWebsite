import { Grid, GridList, GridListTile, makeStyles, Typography } from '@material-ui/core';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import React, { useState,useEffect } from 'react';
import URL from '../url'; 


const useStyles = makeStyles({
    userContainer: {
        boxShadow: '0px 3px 3px -2px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12)',
        height : '100vh'
    },
    stateUserIcon:{
        fontSize: '12px'
    },
    stateUserIconColorOnline:{
        color: '#00d700'
    },
    stateUserIconColorOffline:{
        color: '#bcbcbc'
    }
});

export default function ListUser({usersOnline})
{
    const [users, setUsers] = useState([]);
    useEffect(() => {
        const getAllUsers = async () => {
            const users = await fetch(URL.getUrl()+"users",{
                method: 'GET',
                mode: 'cors',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'}
            })
            const data = await users.json();
            setUsers(data);
        }
        getAllUsers();
    },[]);

    const classes = useStyles();
    return (
        <Grid container direction="column" className={classes.userContainer} spacing={2}>
            <Typography>LIST OF USERS</Typography>
            {
                users.map((u,key) => (
                    Object.values(usersOnline).indexOf(u.id.toString()) >= 0 ?
                        <Grid item key={key} >
                            <Typography><FiberManualRecordIcon className={[classes.stateUserIconColorOnline,classes.stateUserIcon].join(" ")}></FiberManualRecordIcon>{u.name}</Typography>
                        </Grid>
                   : 
                        <Grid item key={key} >
                            <Typography><FiberManualRecordIcon className={[classes.stateUserIconColorOffline,classes.stateUserIcon].join(" ")}></FiberManualRecordIcon>{u.name}</Typography>
                        </Grid>
                ))}
        </Grid>
        
    );
}
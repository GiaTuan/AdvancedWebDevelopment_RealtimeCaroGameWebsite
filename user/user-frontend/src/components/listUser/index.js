import { Box, Grid, makeStyles, Tooltip, Typography} from '@material-ui/core';
import DetailsIcon from '@material-ui/icons/Details';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import React from 'react';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
    userContainer: {
        boxShadow: '0px 3px 3px -2px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12)',
    },
    stateUserIcon:{
        fontSize: '12px'
    },
    DetailUserIcon:{
        fontSize: '20px',
        float: 'right',
        '&:hover': {
            boxShadow: '0px 3px 3px -2px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12)',
        }
    },
    stateUserIconColorOnline:{
        color: '#00d700'
    },
    stateUserIconColorOffline:{
        color: '#bcbcbc'
    },
    userBox: {
        height: '500px',
        overflow: 'scroll',
        overflowX: 'hidden'
    },
    first: {
        border: '5px inset #dc0000',
       
    },
    second: {
        border: '5px groove #0000d8',
    },
    third: {
        border: '5px solid #7b007b',
    },
   
});

export default function ListUser({myId,users,usersOnline})
{
    const classes = useStyles();
    const history = useHistory();

    const handleClickUserDetail = (id) => {
        history.replace({
            pathname: '/user/'+id,
            state:{
                idUser: myId
            }
        });
    }

    return (
        <Grid container direction="column" className={classes.userContainer}>
            <Box cellHeight={200}  className={classes.userBox} p={2}>
                <Typography variant="h6">HONORABLE PLAYERS LIST</Typography>
                {users.map((value,key) => (
                    Object.values(usersOnline).indexOf(value.id) >= 0 ?
                        <Grid item key={key}>
                            <Typography className={key === 0 ? classes.first : key === 1 ? classes.second : key === 2 ? classes.third : ''}>
                                <FiberManualRecordIcon className={[classes.stateUserIconColorOnline,classes.stateUserIcon].join(" ")}/>
                                &nbsp;&nbsp;{value.id} - <b>{value.name}</b>
                                {
                                    myId === value.id ? <span>&nbsp;&#129409;</span> : null
                                }
                                <Tooltip title="Detail User" aria-label="add">
                                    <DetailsIcon onClick={() => handleClickUserDetail(value.id)} className={classes.DetailUserIcon}></DetailsIcon>
                                </Tooltip>
                            </Typography>
                            <hr></hr>
                        </Grid>
                        : 
                        <Grid item key={key} >
                            <Typography className={key === 0 ? classes.first : key === 1 ? classes.second : key === 2 ? classes.third : ''}>
                                <FiberManualRecordIcon className={[classes.stateUserIconColorOffline,classes.stateUserIcon].join(" ")}/>
                                &nbsp;&nbsp;{value.id} - <b>{value.name}</b>
                                <Tooltip title="Detail User" aria-label="add">
                                    <DetailsIcon  onClick={() => handleClickUserDetail(value.id)} className={classes.DetailUserIcon}></DetailsIcon>
                                </Tooltip>
                            </Typography>
                            <hr></hr>
                        </Grid>
                ))}
            </Box>
        </Grid>
        
    );
}
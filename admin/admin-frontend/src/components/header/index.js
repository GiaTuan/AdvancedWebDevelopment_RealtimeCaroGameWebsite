import { Box, Button, makeStyles } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
    menuItem:{
        margin: '10px'
    }
})

export default function Header(props){
    const classes = useStyles();
    const history = useHistory();
    const handleLogOut = () => {
        localStorage.removeItem("token");
        history.push("/");
    }
    return(
        <Box>
            <Link to="/users" className={classes.menuItem}><Button variant="contained" color="primary">Users</Button></Link>
                <Link to="/games" className={classes.menuItem}><Button variant="contained" color="primary">Games</Button></Link>
            <Button onClick={handleLogOut} variant="outlined" color="primary" className={classes.menuItem}>Log out</Button>

        </Box>
    )
}
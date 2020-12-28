import { Box, Button, Grid, List, ListItem, ListItemText, Typography } from '@material-ui/core';
import React , {useState,useEffect} from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import URL from '../url';

export default function History(props){
    const [games,setGames] = useState([]);
    const location = useLocation();
    const history = useHistory();

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

        async function getHistory(){
            const respond = await fetch(URL.getUrl() + "users/" + location.state.idUser + "/history",{
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
            }});

            const data = await respond.json();
            setGames(data);
        }

        verifyUser();
        getHistory();
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
                    <Typography variant="h5">Your History</Typography>
                    <List>
                        {games.map((value,key) =>(
                            <div key={key}>
                                <Box boxShadow={2} m={2}>
                                    <ListItem>
                                        <ListItemText>
                                            ID Game: {value.idgame}
                                        </ListItemText>
                                        <Link to={{
                                            pathname: "/history/" + value.idgame,
                                            state: { idUser: location.state?.idUser}}}>
                                                <Button>Detail</Button>
                                        </Link>
                                    </ListItem>
                                </Box>    
                            </div>
                        ))}
                    </List>
                </Grid>
            </Grid>
        </Box>
    );
}
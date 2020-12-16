import { Box, Button, Dialog, DialogTitle, Grid, Typography,DialogContentText,DialogContent,DialogActions, TextField } from '@material-ui/core';
import { useHistory, useLocation } from "react-router-dom";
import React , {useState,useEffect} from 'react';
import ListUser from '../listUser';
import {initializeSocket,getUsetsOnline} from '../socket';
import URL from '../url';
import {joinGame,startGame} from '../socket';

export default function Hall(props){

    const [usersOnline,setUsersOnline] = useState([]);
    const [open, setOpen] = useState(false)
    const [idGame,setIdGame] = useState(0);
    const [message,setMessage] = useState('');
    const location = useLocation();
    const history = useHistory();

    useEffect(() => {
        initializeSocket(location.state.idUser);
    },[location.state.idUser]);

    useEffect(()=>{
        getUsetsOnline(users => {
            let newUsersOnlineArray =[];
            for(const user in users)
            {
                newUsersOnlineArray = [...newUsersOnlineArray,users[user]];
            }
            setUsersOnline(newUsersOnlineArray);
        });
    },[])

    const handleJoinNewGameClick = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
      };


    const handleNewGameClick = async (e) => {
        e.preventDefault();

        const response = await fetch(URL.getUrl()+"game",{
            method: 'GET',
            mode: 'cors',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }});

        const dataRespond = await response.json();

        const idGame = dataRespond.id.toString();

        joinGame(idGame,location.state.idUser,(data)=>{
            if(data.success === true){
                history.push({
                    pathname: '/game/'+idGame,
                    state: {idUser: location.state.idUser}});
            }
        });   
    }

    const handleChangeIdGame = (e) => {
        setIdGame(e.target.value);
    }

    const handleJoinGameSubmit = async (e) => {
        
        e.preventDefault();
       
        const response = await fetch(URL.getUrl()+"game/check",{
            method: 'POST',
            mode: 'cors',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                idGame: idGame
            })});
        const data = await response.json();
        if(data === true)
        {
            joinGame(idGame,location.state.idUser,(data)=>{
                if(data.success === true){
                    history.push({
                        pathname: '/game/'+idGame,
                        state: {idUser: location.state.idUser}});
                }
                else{
                    setMessage("Room is full");
                }
            });
        }
        else{
            setMessage('ID Game is not correct');
        }
    }

    return (
        <Box m={3}>
            <Grid container spacing={2}>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                    <Box display="flex" justifyContent="flex-end">
                        <form onSubmit={handleNewGameClick}><Button type="submit">New Game</Button></form>
                        <Button onClick={handleJoinNewGameClick}>Join Game</Button>
                        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">                           
                            <DialogTitle id="form-dialog-title">Join Game</DialogTitle>
                            <form onSubmit={handleJoinGameSubmit}>
                                <DialogContent>
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="name"
                                        label="ID Game"
                                        type="text"
                                        fullWidth
                                        onChange = {handleChangeIdGame}
                                    />
                                    <Typography>{message}</Typography>
                                </DialogContent>
                                <DialogActions>
                                <Button onClick={handleClose} color="primary">
                                    Cancel
                                </Button>
                                <Button color="primary" type="submit">
                                    Join
                                </Button>
                                </DialogActions>
                            </form>
                        </Dialog>
                    </Box>
                </Grid>
                <Grid item lg={3} xs={3} sm={3} md={3}>
                    <ListUser usersOnline={usersOnline}></ListUser>
                </Grid>
                <Grid item lg={9}>
                    Chat container
                </Grid>
            </Grid> 
        </Box>
    );
}

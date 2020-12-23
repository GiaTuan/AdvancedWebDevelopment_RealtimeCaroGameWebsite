import { Box, Button, Dialog, DialogTitle, Grid, Typography,DialogContentText,DialogContent,DialogActions, TextField } from '@material-ui/core';
import { useHistory, useLocation } from "react-router-dom";
import React , {useState,useEffect} from 'react';
import ListUser from '../listUser';
import {initializeSocket,getUsetsOnline} from '../socket';
import URL from '../url';
import {joinGame, matchRandom, cancelMatchRandom, getMatchRandomResult} from '../socket';
import ListGames from '../listGames';

export default function Hall(props){

    const [users, setUsers] = useState([]);
    const [usersOnline,setUsersOnline] = useState([]);
    const [games,setGames] = useState([]);
    const [open, setOpen] = useState(false);
    const [isMatchOption,setIsMatchOption] = useState(false);
    const [idGame,setIdGame] = useState(0);
    const [message,setMessage] = useState('');
    const history = useHistory();
    const location = useLocation();

    useEffect(()=>{
        const verifyUser = async () => {
            const response = await fetch(URL.getUrl()+"users/verify",{
                method: 'GET',
                mode: 'cors',
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

        const getAllUsers = async () => {
            const responds = await fetch(URL.getUrl()+"users",{
                method: 'GET',
                mode: 'cors',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
            const data = await responds.json();
            setUsers(data);
        }

        const getAllGames = async () => {
            const respond = await fetch(URL.getUrl() + "game/all", {
                method: 'GET',
                mode: 'cors',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
            const data = await respond.json();
            setGames(data);
        }

        getUsetsOnline(users => {
            let newUsersOnlineArray =[];
            for(const user in users)
            {
                newUsersOnlineArray = [...newUsersOnlineArray,users[user]];
            }
            setUsersOnline(newUsersOnlineArray);
        });

        getMatchRandomResult(data => {
            const idGameString = data.idGame.toString()
            joinGame(idGameString,location.state.idUser,(data)=>{
                if(data.success === true){
                    history.push({
                        pathname: '/game/'+idGameString,
                        state: {idUser: location.state.idUser}});
                }
            });  
        })

        verifyUser();
        getAllUsers();
        getAllGames();

    },[])

    useEffect(() => {
            initializeSocket(location.state?.idUser);
    },[]);

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
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
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

    const handleJoin = (id) => {
        const idGame = id.toString();
        
        joinGame(idGame,location.state.idUser,(data)=>{
            if(data.success === true){
                history.push({
                    pathname: '/game/'+idGame,
                    state: {idUser: location.state.idUser}});
            }
        });
    }

    const handleClickMatchRandom = () => {
        setIsMatchOption(true);
        matchRandom(location.state.idUser);

    }
    const handleClickCancelMatchRandom = () => {
        setIsMatchOption(false);
        cancelMatchRandom(location.state.idUser);
    }

    return (
        <Box m={3}>
            <Grid container spacing={2}>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                    <Box display="flex" justifyContent="flex-end">
                        {
                            isMatchOption === false ? 
                            <Button  color="primary" onClick={handleClickMatchRandom}>Match Random</Button>
                            :
                            <Button  color="secondary" onClick={handleClickCancelMatchRandom}>Cancel Match Random</Button>
                        }
                        <Button onClick={handleJoinNewGameClick} variant="outlined" color="primary">Join Game</Button>
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
                        <Button variant="contained" color="primary" onClick={handleNewGameClick}>New Game</Button>
                    </Box>
                </Grid>
                <Grid item lg={3} md={3} sm={4} xs={12}>
                    <ListUser users={users} usersOnline={usersOnline}></ListUser>
                </Grid>
                <Grid item lg={9} md={9} sm={8} xs={12}>
                    <ListGames games={games} handleJoin={handleJoin}></ListGames>
                </Grid>
            </Grid> 
        </Box>
    );
}

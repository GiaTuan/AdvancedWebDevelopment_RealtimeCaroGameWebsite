import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Snackbar, TextField, Typography } from '@material-ui/core';
import React, { useState,useEffect, useRef } from 'react';
import {Link, useParams, useLocation, useHistory} from "react-router-dom";
import {leaveGame,sendText,getChatHistory,sendPosition,getBoard,demo, playGame, getPlayers} from '../socket';
import Board from '../board';
import Chat from '../chat';
import BoardHistory from '../boardHistory';
import URL from '../url';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Game(props){

    const [text,setText] = useState('');
    const [chatHistory,setChatHistory] = useState([]);
    const [board,setBoard] = useState([]);
    const [players,setPlayers] = useState([]);
    const [boardHistory,setBoardHistory] = useState([]);
    const [winner,setWinner] = useState({});
    const [open,setOpen] = useState(false);
    const [openMessage,setOpenMessage] = useState(false);
    const [isPlaySuccess,setIsPlaySuccess] = useState(undefined);
    const history = useHistory();
    const location = useLocation();
    const { id } = useParams();

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

        getChatHistory(data => {
            setChatHistory(data);
        });

        getBoard(data => {
            if(Object.keys(data.winner).length !== 0)
            {
                setWinner(data.winner);
            }
            if(data.history !== undefined)
            {
                setBoardHistory(data.history);
            }
            setBoard(data.board);
        });

        getPlayers(data => {
            console.log(data);
            if(data.success === true)
            {
                setIsPlaySuccess(true);
            }
            if(data.success === false)
            {
                setIsPlaySuccess(false);
            }
            setPlayers(data.players);
            setOpenMessage(true);
        })

    },[]);

    const handleLeaveGame = () => {
        leaveGame(id,location.state.idUser);
    }

    const handleChangeText = (e) => {
        setText(e.target.value);
    }

    const handleSubmitChat = (e) => {
        e.preventDefault();
        sendText(id,location.state.idUser,text);
    }

    const handleClickSquare = (i) => {  
        sendPosition(id,location.state.idUser, Math.floor(i/20), i%20)
    }

    const handlePlayGame = (id,idUser) => {
        playGame(id,idUser)
    }

    const handleInviteBtnClick = (idGame,idUser) => {
        setOpen(true);
        console.log(idGame,idUser)
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpenMessage(false);
      };
    

    return(
        <Box m={3}>
           <Grid container spacing={2}>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                    <Link to={{
                        pathname: "/hall",
                        state: { idUser: location.state?.idUser}}}>
                            <Button variant="outlined" color="primary" onClick={handleLeaveGame}>Return To Hall</Button>
                    </Link>
                </Grid>
                <Grid item lg={6} md={12} sm={12} xs ={12}>
                    <Grid container>
                        <Grid item lg={9} md={9} sm={9} xs ={9}>
                            <Typography>Game ID: {id}</Typography>
                            <Typography>Your ID: {location.state?.idUser}</Typography>
                            <Typography>Players:</Typography>
                            <ol>
                                {
                                    players.map((value,key) => (
                                        <li key={key}>  &#9823; {value.id} - {value.name}</li>
                                    ))
                                }
                            </ol>
                        </Grid>
                        <Grid item lg={3} md={3} sm={3} xs ={3}>
                            <Button variant="contained" color="primary" onClick={ () => handlePlayGame(id,location.state?.idUser)}>Play</Button>
                            <Snackbar open={openMessage}>
                            {
                                isPlaySuccess ? 
                                <Alert onClose={handleCloseAlert} severity="success">
                                    Play game success
                                </Alert>:
                                isPlaySuccess === false ? 
                                <Alert onClose={handleCloseAlert} severity="error">
                                    Game is full
                                </Alert> :
                                <Alert severity="info" onClose={handleCloseAlert}>Welcome to Game</Alert>
                            }
                            </Snackbar>
                            <Button onClick={() => handleInviteBtnClick(id,location.state?.idUser)}>Invite</Button>
                            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">                           
                            <DialogTitle id="form-dialog-title">Invite</DialogTitle>
                            <form >
                                <DialogContent>
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="name"
                                        label="ID Game"
                                        type="text"
                                        fullWidth
                                    />
                                    <Typography>message</Typography>
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
                            {Object.keys(winner).length !== 0 ? <Typography variant="h6">Winner: &#9818; {winner.id} - {winner.name}</Typography> : null}
                        </Grid>
                    </Grid>
                    <Board board={board} handleClickSquare={handleClickSquare}></Board>
                </Grid>
                <Grid item lg={3} md={5} sm={5} xs ={5}>
                    <BoardHistory history={boardHistory}></BoardHistory>
                </Grid>
                <Grid item lg={3} xs={7} sm={7} md={7}>
                    <Chat chatHistory={chatHistory} handleChangeText={handleChangeText} handleSubmitChat={handleSubmitChat}></Chat>
                </Grid>
            </Grid> 
        </Box>
    )} 
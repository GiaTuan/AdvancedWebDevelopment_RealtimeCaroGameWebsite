import { Box, Button, Grid, Typography } from '@material-ui/core';
import React, { useState,useEffect } from 'react';
import {Link, useParams, useLocation} from "react-router-dom";
import {leaveGame,sendText,getText} from '../socket';
import Board from '../board';
import Chat from '../chat';
 
  

export default function Game(props){
    const [text,setText] = useState('');
    const [chatHistory,setChatHistory] = useState([]);
    const location = useLocation();
    const { id } = useParams();

    useEffect(() => {
       getText(data => {
        setChatHistory(data)});
    })

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

    return(
        <Box m={3}>
           <Grid container spacing={2}>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                   <Link to={{
                       pathname: "/hall",
                       state: {idUser: location.state.idUser}
                   }}><Button onClick={handleLeaveGame}>Return To Hall</Button></Link>
                    <Typography>Your Game ID: {id}</Typography>
                </Grid>
                <Grid item lg={10} md={12} sm={12} xs ={12}>
                    <Board></Board>
                </Grid>
                <Grid item lg={2} xs={12} sm={12} md={12}>
                    <Chat chatHistory={chatHistory} handleChangeText={handleChangeText} handleSubmitChat={handleSubmitChat}></Chat>
                </Grid>
            </Grid> 
        </Box>
    )} 
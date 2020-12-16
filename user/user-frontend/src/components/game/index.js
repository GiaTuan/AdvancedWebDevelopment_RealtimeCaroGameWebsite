import { Box, Button, Grid, Typography } from '@material-ui/core';
import React, { useState,useEffect, useRef } from 'react';
import {Link, useParams, useLocation} from "react-router-dom";
import {leaveGame,sendText,getText,sendPosition,getBoard,demo} from '../socket';
import Board from '../board';
import Chat from '../chat';
import BoardHistory from '../boardHistory';
import URL from '../url';
import io  from 'socket.io-client';



export default function Game(props){

    const [text,setText] = useState('');
    const [chatHistory,setChatHistory] = useState([]);
    const [board,setBoard] = useState([]);
    const [boardHistory,setBoardHistory] = useState([]);
    const [winner,setWinner] = useState(0);
    const location = useLocation();
    const { id } = useParams();
   
    useEffect(() => {
        getText(data => {
            setChatHistory(data);
        });


        getBoard(data => {
            console.log("Get board",data);
            if(data.winner !== 0)
            {
                setWinner(data.winner);
            }
            if(data.history !== undefined)
            {
                setBoardHistory(data.history);
            }
            setBoard(data.board);
        });

        // return () => {
        //     setChatHistory([]);
        //     setBoard([]);
        //     setBoardHistory([]);
        //     setWinner(0);
        // }
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

    return(
        <Box m={3}>
           <Grid container spacing={2}>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                   <Link to={{
                       pathname: "/hall",
                       state: {idUser: location.state.idUser}
                   }}><Button onClick={handleLeaveGame}>Return To Hall</Button></Link>
                    <Typography>Your Game ID: {id}</Typography>
                    <Typography>Your id: {location.state.idUser}</Typography>
                    <Typography variant="h4">Winner: {winner}</Typography>
                </Grid>
                <Grid item lg={6} md={12} sm={12} xs ={12}>
                    <Board board={board} handleClickSquare={handleClickSquare}></Board>
                </Grid>
                <Grid item lg={3} md={12} sm={12} xs ={12}>
                    <BoardHistory history={boardHistory}></BoardHistory>
                </Grid>
                <Grid item lg={3} xs={12} sm={12} md={12}>
                    <Chat chatHistory={chatHistory} handleChangeText={handleChangeText} handleSubmitChat={handleSubmitChat}></Chat>
                </Grid>
            </Grid> 
        </Box>
    )} 
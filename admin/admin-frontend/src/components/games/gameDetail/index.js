import { Box, Grid, Typography } from '@material-ui/core';
import React, {useState, useEffect} from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Header from '../../header';
import URL from '../../url';
import Board from '../board';
import Chat from '../chat';
import BoardHistory from '../history';

export default function GameDetail(props){
    const [game,setGame] = useState({});
    const [chatHistory, setChatHistory] = useState([]);
    const [boardHistory,setBoardHistory] = useState([]);
    const [players,setPlayers] = useState([]);
    const history = useHistory();
    const {id} = useParams();

    useEffect(()=>{
        async function verifyUser() {
            const response = await fetch(URL.getUrl()+"account/verify",{
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

        async function getGame(){
            const respond = await fetch(URL.getUrl() + "game/" + id,{
                method: 'GET',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }});

            const data = await respond.json();
            setGame(data[0]);
        }

        async function getChat(){
            const respond = await fetch(URL.getUrl()+ 'game/' + id + '/chat',{
                method: 'GET',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }});

            const data = await respond.json();
            setChatHistory(data);
        }

        async function getBoardHistory(){
            const respond = await fetch(URL.getUrl()+ 'game/' + id + '/history',{
                method: 'GET',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }});

            const data = await respond.json();
            setBoardHistory(data);
        }

        async function getGamePlayers(){
            const respond = await fetch(URL.getUrl()+ 'game/' + id + '/players',{
                method: 'GET',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }});

            const data = await respond.json();
            setPlayers(data);
        }

        verifyUser();
        getGame();
        getChat();
        getBoardHistory();
        getGamePlayers();
    },[])


    return(
        <Box m={3}>
           <Grid container spacing={2}>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                    <Header></Header>
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                    {
                        game !== undefined ? 
                        <Typography variant = "h5">Winner ID: &#9818;{game.winner}</Typography> : null
                    }
                    <Typography>Players: </Typography>
                    <ol>
                        {
                            players.map((value,key) => (
                                <li key={key}>  &#9823; {value.iduser} - {value.Account.name}</li>
                            ))
                        }
                    </ol>
                </Grid>
                <Grid item lg={6} md={12} sm={12} xs ={12}>
                {
                    game.boards !== undefined  ? 
                    <Board board={game.boards}></Board>  : null
                }  
                </Grid>
                <Grid item lg={3} md={5} sm={5} xs ={5}>
                    <BoardHistory history={boardHistory}></BoardHistory>
                </Grid>
                <Grid item lg={3} md={7} sm={7} xs={7}>
                    <Chat chatHistory={chatHistory}></Chat>
                </Grid>
            </Grid>
        </Box>
    );
}
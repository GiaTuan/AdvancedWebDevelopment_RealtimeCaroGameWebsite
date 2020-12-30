import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Header from '../header';
import url from '../url';
import GameTable from './gameTable';

export default function Games(props){
    const [games,setGames] = useState([]);
    const history = useHistory();
    useEffect(()=>{

        const verifyUser = async () => {
            const response = await fetch(url.getUrl()+"account/verify",{
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
        async function getAllGames(){
            const respond = await fetch(url.getUrl() + "game",{
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }});
            const data = await respond.json();
            console.log(data);
            setGames(data);
        }

        verifyUser();
        getAllGames();
    },[]);
    
    return (
        <Box m={2}>
            <Header></Header>
            <GameTable games={games}></GameTable>
        </Box>
    );
}
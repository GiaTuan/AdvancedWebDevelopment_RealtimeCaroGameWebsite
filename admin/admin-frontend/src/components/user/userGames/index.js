import { Box } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import GameTable from '../../games/gameTable';
import Header from '../../header';
import url from '../../url';

export default function UserGames(props){
    const [games,setGames] = useState([]);
    const history = useHistory();
    const {id} = useParams();
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
            console.log(url.getUrl() + "account/" + id + "/games");
            const respond = await fetch(url.getUrl() + "account/" + id + "/games",{
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }});
            const data = await respond.json();
            setGames(data);
        }

        verifyUser();
        getAllGames();
    },[]);

    return(
        <Box m={2}>
            <Header></Header>
            <GameTable games={games}></GameTable>
        </Box>
    );
}
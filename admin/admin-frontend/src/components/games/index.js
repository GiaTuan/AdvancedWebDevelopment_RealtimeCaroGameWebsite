import { Box} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Header from '../header';
import url from '../url';
import GameTable from './gameTable';
import SquareLoader from "react-spinners/SquareLoader";
import Pagination from '@material-ui/lab/Pagination';


export default function Games(props){
    const [games,setGames] = useState([]);
    const [gamesToShow,setGamesToShow] = useState([]);
    const [itemsPerPage,setItemsPerPage] = useState(10);
    const [pages,setPages] = useState(0);
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
            setPages(Math.floor(data.length / itemsPerPage + (data.length % itemsPerPage === 0 ? 0 : 1)));
            setGames(data);
            setGamesToShow(data.slice(0,itemsPerPage));
        }

        verifyUser();
        getAllGames();
    },[]);

    const handleClickPage = (event,page) => {
        setGamesToShow(games.slice(itemsPerPage*(page-1),(page-1)*itemsPerPage+itemsPerPage));
    }
    
    return (
        <Box m={2}>
            <Header></Header>
                {
                    gamesToShow.length === 0 ? 
                    <SquareLoader css={{display: 'block', margin: '0 auto'}} color={'#0575FC'} loading={true} size={50}></SquareLoader>
                    :
                    <GameTable games={gamesToShow}></GameTable>
                }
                <br></br>
            <Box display="flex" justifyContent="center">
                <Pagination onChange={handleClickPage} count={pages} showFirstButton showLastButton />
            </Box>
        </Box>
    );
}
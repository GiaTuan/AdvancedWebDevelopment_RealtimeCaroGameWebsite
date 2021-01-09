import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import Header from '../header';
import url from '../url';
import SquareLoader from "react-spinners/SquareLoader";
import Pagination from '@material-ui/lab/Pagination';


export default function Users(props){
    const [users,setUsers] = useState([]);
    const [usersClone,setUsersClone] = useState([]);
    const [usersToShow,setUsersToShow] = useState([]);
    const [itemsPerPage,setItemsPerPage] = useState(5);
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
        async function getAllUsers(){
            const respond = await fetch(url.getUrl() + "account",{
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }});
            const data = await respond.json();
            setPages(Math.floor(data.length / itemsPerPage + (data.length % itemsPerPage === 0 ? 0 : 1)));
            setUsers(data);
            setUsersClone(data);
            setUsersToShow(data.slice(0,itemsPerPage));
        }

        verifyUser();
        getAllUsers();
    },[]);

    const handleChangeSearch = (e) => {
        const filter = e.target.value;
        const newList = users.filter(u => u.name.toLowerCase().includes(filter) || u.email.toLowerCase().includes(filter));
        setUsersClone(newList);
        setPages(Math.floor(newList.length / itemsPerPage + (newList.length % itemsPerPage === 0 ? 0 : 1)));
        setUsersToShow(newList.slice(0,itemsPerPage));
    }

    const handleClickPage = (event,page) => {
        setUsersToShow(usersClone.slice(itemsPerPage*(page-1),(page-1)*itemsPerPage+itemsPerPage));
    }

    return (
        <Box m={2}>
            <Header></Header>
            <TextField onChange={handleChangeSearch} label="Search user"></TextField>
            {
                usersToShow.length === 0 ? 
                <SquareLoader css={{display: 'block', margin: '0 auto'}} color={'#0575FC'} loading={true} size={50}></SquareLoader>
                :
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    <b>ID USER</b>
                                </TableCell>
                                <TableCell align="right;">
                                    <b>USERNAME</b>
                                </TableCell>
                                <TableCell align="right;">
                                    <b>NAME</b>
                                </TableCell>
                                <TableCell align="right;">
                                    <b>EMAIL</b>
                                </TableCell>
                                <TableCell align="right;">
                                    <b>PHONE</b>
                                </TableCell>
                                <TableCell align="right;">
                                    <b>BLOCKED</b>
                                </TableCell>
                                <TableCell align="right;">
                                    <b>#</b>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                usersToShow.map((value,key)=>(
                                    <TableRow>
                                        <TableCell>
                                            {value.id}
                                        </TableCell>
                                        <TableCell align="right;">
                                            {value.username}
                                        </TableCell>
                                        <TableCell align="right;">
                                            {value.name}
                                        </TableCell>
                                        <TableCell align="right;">
                                            {value.email}
                                        </TableCell>
                                        <TableCell align="right;">
                                            {value.phone}
                                        </TableCell>
                                        <TableCell align="right;">
                                            {value.isblocked ? 'True' : 'False'}
                                        </TableCell>
                                        <TableCell align="right;">
                                            <Link to={'users/'+ value.id}><Button>Detail</Button></Link>
                                        </TableCell>
                                    </TableRow>
                                ))
                            }
            
                        </TableBody>
                    </Table>
                </TableContainer>
            }<br></br>
            <Box display="flex" justifyContent="center">
                <Pagination onChange={handleClickPage} count={pages} showFirstButton showLastButton />
            </Box>
        </Box>
    );
}
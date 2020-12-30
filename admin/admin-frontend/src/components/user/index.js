import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import Header from '../header';
import url from '../url';

export default function Users(props){
    const [users,setUsers] = useState([]);
    const [usersToShow,setUsersToShow] = useState([]);
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
            setUsers(data);
            setUsersToShow(data);
        }

        verifyUser();
        getAllUsers();
    },[]);

    const handleChangeSearch = (e) => {
        const filter = e.target.value;
        const newList = users.filter(u => u.name.toLowerCase().includes(filter) || u.email.toLowerCase().includes(filter));
        setUsersToShow(newList);
    }

    return (
        <Box m={2}>
            <Header></Header>
            <Box>
                <TextField onChange={handleChangeSearch} label="Search user"></TextField>
            </Box>
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
                                        <Link to={'users/'+ value.id}><Button>Detail</Button></Link>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
          
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}
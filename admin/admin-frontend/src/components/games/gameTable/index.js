import React from 'react';
import {Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { useHistory } from 'react-router';


export default function GameTable({games})
{
    const history = useHistory();
    const handleClickDetail = async (i) => {
        history.push('/games/'+i);
    }

    return(<TableContainer>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>
                        <b>ID GAME</b>
                    </TableCell>
                    <TableCell align="right;">
                        <b>WINNER</b>
                    </TableCell>
                    <TableCell align="right;">
                        <b>#</b>
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    games.map((value,key)=>(
                        <TableRow>
                            <TableCell>
                                {value.id}
                            </TableCell>
                            <TableCell align="right;">
                                {value.winner}
                            </TableCell>
                            <TableCell align="right;">
                                <Button onClick={() => handleClickDetail(value.id)}>Detail</Button>
                            </TableCell>
                        </TableRow>
                    ))
                }
  
            </TableBody>
        </Table>
    </TableContainer>);
}
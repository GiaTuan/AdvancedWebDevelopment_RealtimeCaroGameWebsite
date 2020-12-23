import { Box, Button, List, ListItem, ListItemText } from '@material-ui/core';
import React from 'react';
import { joinGame } from '../socket';

export default function ListGames({games,handleJoin}){
    return (
        <List>
            {games.map((value,key) =>(
                <div key={key}>
                    <Box boxShadow={2} m={2}>
                        <ListItem>
                            <ListItemText>
                                {value.id}
                            </ListItemText>
                            <Button onClick={() => handleJoin(value.id)}>Join</Button>
                        </ListItem>
                    </Box>    
                </div>
            ))}
        </List>)
}
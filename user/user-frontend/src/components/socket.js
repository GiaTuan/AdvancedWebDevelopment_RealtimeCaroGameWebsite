import io  from 'socket.io-client';
import URL from './url';
const socket = io(URL.getUrl());

export const initializeSocket = (idUser) => {
    socket.emit("connect-to-server",idUser);
}
export const getUsetsOnline = (cb) => {
    socket.on("online", data => {
        return cb(data);    
    })
}

export const startGame = (idGame,idUser,cb) => {
    socket.emit("start",{idGame: idGame, idUser: idUser});
    return cb();
}

export const joinGame = (idGame,idUser,cb) => {
    socket.emit("join", {idGame: idGame, idUser: idUser});
    socket.on("join-respond",data=>{
        return cb(data);
    })
}

export const leaveGame = (idGame,idUser) => {
    socket.emit("leave", {idGame: idGame, idUser: idUser});
}

export const sendText = (idGame,idUser,text) => {
    socket.emit("chat",{idGame: idGame, idUser: idUser, text: text});
}

export const sendPosition = (idGame,idUser, row, col) => {
    socket.emit("play-game", {idGame:idGame,idUser: idUser ,row: row, col: col})
}

export const getBoard = (cb) => {
    socket.on("board-respond", data=> {
        return cb(data)
    })
}

export const getText = (cb)=>{
    socket.on("chat", data => {
        return cb(data);
    })
}


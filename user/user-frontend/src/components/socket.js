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

export const getText = (cb)=>{
    socket.on("chat-respond", data => {
        return cb(data);
    })
}
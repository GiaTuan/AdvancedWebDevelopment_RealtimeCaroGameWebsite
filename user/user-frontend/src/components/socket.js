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


export const playGame = (idGame,idUser) => {
    socket.emit("play-game",{idGame:idGame,idUser: idUser})
}

export const playGameResponse = (cb) => {
    socket.on("play-game", data => {
        return cb(data);
    })
}

export const getPlayers = (cb) => {
    socket.on("players",data=>{
        return cb(data);
    })
}


export const sendPosition = (idGame,idUser, row, col) => {
    socket.emit("send-position", {idGame:idGame,idUser: idUser ,row: row, col: col})
}

export const getBoard = (cb) => {
    socket.on("board-respond", data=> {
        return cb(data)
    })
}

export const getChatHistory = (cb) => {
    socket.on("chat", data => {
        return cb(data);
    })
}

export const matchRandom = (idUser) => {
    socket.emit("match-random", {idUser: idUser});
}

export const getMatchRandomResult = (cb) => {
    socket.on("match-random", data => {
        return cb(data);
    })
}

export const cancelMatchRandom = (idUser) => {
    socket.emit("cancel-match-random", {idUser: idUser});
}

export const giveIn = (idGame,idUser) => {
    socket.emit("give-in",{idGame: idGame, idUser: idUser});
}

export const giveInResponse = (cb) => {
    socket.on("give-in", data => {
        console.log(data);
        return cb(data);
    })
}



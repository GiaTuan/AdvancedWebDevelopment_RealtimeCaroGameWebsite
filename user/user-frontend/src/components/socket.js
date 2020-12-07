import io  from 'socket.io-client';
import URL from './url';
const socket = io(URL.getUrl());

export const initializeSocket = () => {
    const idUser = localStorage.getItem("id");
    socket.emit("connect-to-server",idUser);
}
export const getUsetsOnline = (cb) => {
    socket.on("online", data => {
        return cb(data);    
    })
}

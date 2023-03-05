import http from 'http';
import express from "express";
import cors from "cors";
import {Server} from "socket.io";
import dotenv from "dotenv";

const PORT = process.env.PORT || 4000;
const users = [{}];

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use( cors() );
app.use( express.json() );

app.get( '/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Api working'
    });
});

io.on( 'connection', (socket) => {
    console.log('New Connection Started');
    
    socket.on( 'joined', ( data ) => {
        users[socket.id] = data;

        socket.broadcast.emit( 'userJoined', {
            user: 'Admin',
            message: `${users[socket.id]} has join`
        } )

        socket.emit( 'welcome', {
            user: 'Admin',
            message: `Welcome to the chat. ${users[socket.id]}!`
        } )

    } );

    socket.on( 'message', ( data ) => {
        io.emit( 'newmessage', {
            id: data.id,
            user: users[data.id],
            message: data.message
        });
    } );

    socket.on('logout',()=>{
        console.log(`user left`);
        socket.broadcast.emit( 'userleft', {
            user: 'Admin',
            message: `${users[socket.id]} has left`
        } )
    })

} );


server.listen( PORT, (err) => {
    if(err)
        console.log(err);

    console.log(`Server is running at http://localhost:${PORT}`);
} );
const io = require('socket.io')(3000, {
    cors: {
        origin: "http://localhost:3001",
        methods: ["GET", "POST", "PATCH"]
    }
})

io.on("connection", (socket) => {
    console.log("A user connected")
    socket.on('joinRoom', ({username, roomId, quizzId}) => {
        if (!roomId)
            roomId = crypto.randomUUID();
        const message = joinRoom(rooms,username,roomId,quizzId)
        console.log(message)
    })
    socket.on('disconnect', () => {
        console.log('user deco')
    })
})


// import { Server } from "socket.io";
//
// const ioHandler = (req,res) => {
//
//     if (res.socket.server.io) {
//         console.log('Socket is already running')
//     } else {
//         console.log('Socket is initializing')
//         const io = new Server(res.socket.server)
//         res.socket.server.io = io
//     }

// if (res.socket.server.io) {
//     console.log("Socket est déjà initialisé.");
// }
//
// if (!res.socket.server) {
//     console.error('The server is not available');
//     return res.status(500).end();
// }
//
// if (!res.socket.server.io) {
//     const path = "/socket_api/socket/io";
//     const httpServer = createServer();
//     const io = new Server(httpServer, {
//         path:path,
//     });
//     res.socket.server.io = io;
//
//     io.on('connection', socket => {
//         console.log('user co')
//         socket.on('joinRoom', ({username, roomId, quizzId}) => {
//             if (!roomId)
//                 roomId = crypto.randomUUID();
//             const message = joinRoom(rooms,username,roomId,quizzId)
//             console.log("joinRoom")
//         })
//         socket.on('disconnect', () => {
//             console.log('user deco')
//         })
//     })
// }
//     res.end()
// }
//
// export default ioHandler


const rooms = []
const joinRoom = (rooms, username, roomid, quizzId = null) => {
    let room = rooms.find(room => room.id === roomid)

    let userInroom = rooms.find(username => room.users.username === username)
    if (userInroom) {
        return 'l\'utilisateur existe déja dans la room';
    }

    if (!room && !quizzId) {
        // je crée la room
        room = {
            id:roomid,
            quizzId:quizzId,
            users: [username],
            state: 'waiting'
        }
        rooms.push(room)
        console.log(rooms)
        return 'la room a bien été crée'
    }

    // j'entre dans la room
    room.users.push(username);
    return 'vous avez rejoint la room'
}


const io = require('socket.io')(3000, {
    cors: {
        origin: "http://localhost:3001",
        methods: ["GET", "POST", "PATCH"]
    }
})
const { Client } = require('pg');


// Database connection configuration
const dbConfig = {
  user: 'root',
  password: 'root',
  host: 'localhost',
  port: 5432,
  database: 'database',
};

// Create a new PostgreSQL client
const client = new Client(dbConfig);

// Connect to the database
client.connect()
  .then(() => {
    console.log('Connected to PostgreSQL database');

    // Execute SQL queries here

    client.query('SELECT * FROM employees', (err, result) => {
      if (err) {
        console.error('Error executing query', err);
      } else {
        console.log('Query result:', result.rows);
      }

      // Close the connection when done
      client.end()
        .then(() => {
          console.log('Connection to PostgreSQL closed');
        })
        .catch((err) => {
          console.error('Error closing connection', err);
        });
    });
  })
  .catch((err) => {
    console.error('Error connecting to PostgreSQL database', err);
  });


io.on("connection", (socket) => {
    console.log("A user connected")

    socket.on('createRoom', (username) => {
        const roomId = crypto.randomUUID();
        const result = createRoom(rooms,username,roomId)
        if (result === 0)
            socket.emit('roomCreated', (roomId))
        else {
            socket.emit('error')
        }
    })

    socket.on('joinRoom', ({username, roomId}) => {
        const result = joinRoom(rooms,username,roomId)
        if (result === 0)
        {
            const quizzId = getQuizzId(roomId)
            socket.emit('roomJoined', ({roomId, username, quizzId}))
        }
        else {
            socket.emit('error')
        }
    })

    socket.on('setQuizzId', ({quizzId, roomId}) => {
        let room = rooms.find(room => room => room.id === roomId)
        room.quizzId = quizzId;
        room.state = 'waiting'
        console.log(room)
        socket.emit('quizzIdSet')
    })

    socket.on('getRoomUser', (roomId) => {
        let room = rooms.find(room => room.id === roomId)
        socket.emit('getRoomUser', (room.users))
    })

    socket.on('startQuizz', (roomId) => {
        const eventName = 'quizzStarted'+roomId
        console.log('aze')
        socket.emit(eventName)
    })

    socket.on('disconnect', () => {
        console.log('user deco')
    })
})

const createRoom = (rooms, username, roomId) => {
    room = {
        id: roomId,
        quizzId: "",
        users: [username],
        state: 'selectQuizz'
    }
    rooms.push(room)
    console.log(rooms)
    return 0
}

const joinRoom = (rooms, username, roomId) => {
    let room = rooms.find(room => room.id === roomId)

    if (room.state !== 'waiting' && room.state !== 'selectQuizz')
        return 1

    let userInroom = rooms.find(username => room.users.username === username)
    if (userInroom) {
        return 2;
    }

    // j'entre dans la room
    room.users.push(username);
    return 0
}

const getQuizzId = (roomId) => {
    let room = rooms.find(room => room.id === roomId)
    return room.quizzId
}


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



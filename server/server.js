const io = require('socket.io')(3000, {
    cors: {
        origin: "http://localhost:3001",
        methods: ["GET", "POST", "PATCH"]
    }
})
const { Client } = require('pg');
const rooms = []

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

        const dropTableQuestion = `
            DROP TABLE IF EXISTS question;
        `;
        const dropTableQuizz = `
            DROP TABLE IF EXISTS quizz;
        `;
        const dropTableQuizzQuestion = `
            DROP TABLE IF EXISTS quizzquestion;
        `;

        const createTableQuestion = `
            CREATE TABLE question(
                id serial PRIMARY KEY,
                type int,
                questions text, 
                reponse text,
                choix JSONB
            );
        `;
        const createTableQuizz = `
            CREATE TABLE quizz(
                id serial PRIMARY KEY,
                libelle text
            );
        `;
        const createTableQuizzQuestion = `
            CREATE TABLE quizzquestion (
                quizz_id INT REFERENCES Quizz(id),
                question_id INT REFERENCES Question(id),
                PRIMARY KEY (quizz_id, question_id)
            );
        `;
        const insertIntoTableQuizz = `
            INSERT INTO quizz (libelle) VALUES 
            (
                
                'Questionnaire culture G'
            ),
            (
                 
                'Questionnaire culture Histoire'
            ),
            (
                 
                'Questionnaire culture Math'
            )
             ;
        `;
        const insertIntoTableQuestion = `
            INSERT INTO question (questions, type, reponse) VALUES ( 
            
                    '1+1',
                    1,
                    '2'
                ),
                (
                    '1+2',
                    1,
                    '3'
                ),
                (
                    '1+3',
                    1,
                    '4'
                ),
                (
                    '1+4',
                    1,
                    '5'
                ),
                (
                    '1+5',
                    1,
                    '6'
                ),
                (
                    '1+6',
                    1,
                    '7'
                ),
                (
                    'Quelle est la nationnalité de Napoleon ?',
                    2,
                    'Corse'
                )
            ;
        `;

        const insertIntoTableQuestionJson = `
            INSERT INTO question (questions, type, reponse, choix) VALUES 
                (
                    '1+2',
                    2,
                    '1',
                    '[
                        {"1": "3"},
                        {"2": "15"},
                        {"3": "16"},
                        {"4": "Une belle réponse"} 
                    ]'
                ),
                (
                    '1+15',
                    2,
                    '3',
                    '[
                        {"1": "3"},
                        {"2": "15"},
                        {"3": "16"},
                        {"4": "Une belle réponse"} 
                    ]'
                ),
                (
                    '1+14',
                    2,
                    '2',
                    '[
                        {"1": "3"},
                        {"2": "15"},
                        {"3": "16"},
                        {"4": "Une belle réponse"} 
                    ]'
                )
            ;
        `;


/*
*/
        client.query(dropTableQuizzQuestion, (err, result) => {
            if (err) {
                console.error('Error removing table QuizzQuestion', err);
            } else {
                console.log('Table QuizzQuestion removed successfully ');
            }
        });
        client.query(dropTableQuestion, (err, result) => {
            if (err) {
                console.error('Error removing table Question', err);
            } else {
                console.log('Table Question removed successfully ');
            }
        });
        client.query(dropTableQuizz, (err, result) => {
            if (err) {
                console.error('Error removing table Quizz', err);
            } else {
                console.log('Table Quizz removed successfully');
            }

        });

        client.query(createTableQuestion, (err, result) => {
            if (err) {
                console.error('Error creating table Question', err);
            } else {
                console.log('Table Question created successfully');
            }

        });
        client.query(createTableQuizz, (err, result) => {
            if (err) {
                console.error('Error creating table Quizz', err);
            } else {
                console.log('Table Quizz created successfully');
            }

        });
        client.query(createTableQuizzQuestion, (err, result) => {
            if (err) {
                console.error('Error inserting into table QuizzQuestion ', err);
            } else {
                console.log('insert into QuizzQuestion successfulled');
            }
        });

        client.query(insertIntoTableQuizz, (err, result) => {
            if (err) {
                console.error('Error inserting into table Quizz', err);
            } else {
                console.log('insert into Quizz successfulled');
            }
        });
        client.query(insertIntoTableQuestionJson, (err, result) => {
            if (err) {
                console.error('Error inserting into table Question JSON', err);
            } else {
                console.log('insert into Question JSON successfulled');
            }
        });
        client.query(insertIntoTableQuestion, (err, result) => {
            if (err) {
                console.error('Error inserting into table Question', err);
            } else {
                console.log('insert into Question successfulled');
            }
            client.end();
        });

       //insertIntoTableQuestionJson

    })
    .catch((err) => {
        console.error('Error connecting to PostgreSQL database', err);
    });


io.on("connection", (socket) => {
    console.log("A user connected")

    socket.on('createRoom', (username) => {
        const roomId = crypto.randomUUID();
        const result = createRoom(rooms, username, roomId)
        if (result === 0) {
            socket.join(roomId)
            socket.emit('roomCreated', (roomId))
        }
        else {
            socket.emit('error')
        }
    })

    socket.on('joinRoom', ({ username, roomId }) => {
        const result = joinRoom(rooms, username, roomId)
        if (result === 0) {
            const quizzId = getQuizzId(roomId)
            socket.join(roomId)
            socket.emit('roomJoined', ({ roomId, username, quizzId }))
        }
        else {
            socket.emit('error')
        }
    })

    socket.on('setQuizzId', ({ quizzId, roomId }) => {
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
        let room = rooms.find(room => room.id === roomId)
        room.state = 'inGame'
        io.to(roomId).emit('quizzStarted')
    })

    socket.on('currentQuestion', (roomId, username) => {
        let room = rooms.find(room => room.id === roomId)
        console.log(room.users[0])
        if (room.users[0] === username)
            setTimeout(() => {
                io.to(roomId).emit('nextQuestion')
                console.log('lauched')
            }, 2000)
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



const express = require('express');
const mongoose = require('mongoose');
const cors = require ('cors');
const path = require('path');



const app = express();

const server = require ('http').Server(app);
const io = require('socket.io')(server,{
    cors: {
    origin: "*",
    methods: ["GET", "POST"]
}

});



mongoose.connect(`mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@goweek-backend.0toen.mongodb.net/instagramClone?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
    }
);

app.use((req, res, next)=>{
    req.io = io;

    return next();
});

app.use(cors());

app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized')));


app.use(require('./routes'));

server.listen(process.env.PORT || 3333);
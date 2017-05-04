const express = require('express');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

server.listen(3000, () => console.log('Server started'));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', './views');
app.get('/', (req, res) => res.render('home'));
io.on('connection', socket => {
    socket.on('CLIENT_SEND_MSG', msg => {
        io.emit('SERVER_SEND_MSG', msg);
    });
});

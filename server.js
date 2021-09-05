const server = require('http').createServer();
const options = { cors:true,
    origins:["https://laughing-wiles-65014c.netlify.app/"], };
const io = require('socket.io')(server, options);
io.on('connection', socket => { /* ... */ });

const users = {}

io.on('connection', socket => {
  socket.on('new-user', name => {
    users[socket.id] = name
    socket.broadcast.emit('user-connected', name)
  })
  socket.on('send-chat-message', message => {
    socket.broadcast.emit('chat-message', { message: message, name: users[socket.id] })
  })
  socket.on('disconnect', () => {
    socket.broadcast.emit('user-disconnected', users[socket.id])
    delete users[socket.id]
  })
})

server.listen(3000);
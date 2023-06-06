//Node server to handle socket io connections
const io = require('socket.io')(8000, {
    cors: {
      origin: 'http://127.0.0.1:5500',
      methods: ['GET', 'POST']
    }
  });

const users={};
 
io.on('connection',socket=>{

  //if any new user joined , let other user know
    socket.on('new-user-joined',name=>{ 
        users[socket.id] = name; 
        socket.broadcast.emit('user-joined',name);
    })

    //if someone sends a message then broadcast it to other user
    socket.on('send', message => {
        socket.broadcast.emit('receive',{message:message , name: users[socket.id]});
    });

    //if someone leaves the socket then broadcast
    socket.on('disconnect',message => {
      socket.broadcast.emit('left',users[socket.id]);
      delete users[socket.id];
  });

})
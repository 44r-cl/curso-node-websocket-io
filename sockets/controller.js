const socketController = (socket) => {
    console.log('Cliente conectado', socket.id);

    socket.on('disconnect', () => {
        console.log('Cliente desconectado', socket.id);
    });

    socket.on('enviar-mensaje', (payload, callback) => {
        const id = '123ABC';
        console.log('callback');
        callback(id);
        // Esto no sirve pues el this tenía sentido cuando este código estaba en server.js
        // this.io.emit('enviar-mensaje', payload);
        
        // Envía emisión, el payload, al llamador
        // socket.emit('enviar-mensaje', payload);

        // Envía el mensaje a los demás y no al llamador
        socket.broadcast.emit('enviar-mensaje', payload);
    });
}

module.exports = {
    socketController
}
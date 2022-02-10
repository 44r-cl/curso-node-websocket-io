const lblonline = document.querySelector('#lblonline');
const lbloffline = document.querySelector('#lbloffline');
const txtMensaje = document.querySelector('#txtMensaje');
const btnEnviar = document.querySelector('#btnEnviar');

//console.log('Hola Mundo!!');
// Socket del cliente
const socket = io();

socket.on('connect', () => {
    console.log('Conectado!');
    lblonline.style.display = '';
    lbloffline.style.display = 'none';
});

socket.on('disconnect', () => {
    console.log('Desconectado!');
    lblonline.style.display = 'none';
    lbloffline.style.display = '';
});

socket.on('enviar-mensaje', (payload) => {
    console.log(payload);
});

btnEnviar.addEventListener('click', () => {
    const mensaje = txtMensaje.value;
    const payload = {
        mensaje,
        id: '12345',
        fecha: new Date().getTime()
    }
    console.log('btnEnviar.addEventListener');
    // El 3er parámetro de método emit es un callback con parámetro 'id' y que es llamado desde el lado
    // del servidor por socket.on('enviar-mensaje', (payload, callback) => {
    socket.emit('enviar-mensaje', payload, (id) => {
        console.log('Desde el server XXX', id);
    });
});
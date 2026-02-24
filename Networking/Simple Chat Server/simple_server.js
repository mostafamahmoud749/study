const net = require('net');

const clients=[];

const server=net.createServer();

server.on("connection",(socket)=>{
    console.log("client connected",socket.address());

    socket.on("data",(data)=>{
        if (!clients.includes(socket)){
            clients.push(socket);
        }
        clients.forEach((client)=>{
        client.write(data)
        
    })
    
    })
    
    
})

server.listen(3000,"127.0.0.1",()=>{
    console.log("server openned in address",server.address())
})
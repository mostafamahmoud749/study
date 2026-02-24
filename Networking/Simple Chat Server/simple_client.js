const net = require('net');
const readline = require('readline/promises');

const rl=readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const clearLine=async (dir)=>{
    return new Promise((resolve)=>{
        process.stdout.clearLine(dir,()=>{
            resolve();
        })
    })
}

const moveLine=async (dx,dy)=>{
    return new Promise((resolve)=>{
        process.stdout.moveCursor(dx,dy,()=>{
            resolve();
        })
    })
}
const ask=async()=>{
        const massage = await  rl.question("Enter your message: ")
        await moveLine(0,-1);
        await clearLine(0);
        
        socket.write(massage);

    }
    
const socket=net.createConnection({port:3000,host:"127.0.0.1"}, async()=>{
    
    
    ask();
    
})

socket.on("data",async (data)=>{
    console.log()
    await moveLine(0,-1);
    await clearLine(0);
    console.log(data.toString());
    ask();
})
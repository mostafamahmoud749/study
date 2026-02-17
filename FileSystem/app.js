const {Buffer}=require("buffer");
const fs=require("fs/promises");

(async()=>{
    const fileHandler=await fs.open("./a.text","r");
    const watcher=fs.watch("./a.text");
    for await (const event of watcher) {
        if (event.eventType==="change") {
            const size=(await fileHandler.stat()).size
            const data=await fileHandler.read(Buffer.alloc(size),0,size,0);
            console.log(data.buffer.toString("ascii"));
        }
    }
})()
const {Buffer}=require("buffer");
const fs=require("fs/promises");

const CREATE_FILE = "create a file";
const DELETE_FILE = "delete the file";
const RENAME_FILE = "rename the file";
const ADD_TO_FILE = "add to the file";

(async()=>{
    

    const fileHandler=await fs.open("./a.text","r");
    const watcher=fs.watch("./a.text");

    fileHandler.on("create",async(path)=>{
        try {
            const ExistFileHandler=await fs.open(path,"r");
            ExistFileHandler.close();
            return console.log("file exist");
        } catch (error) {
            const newFileHandler=await fs.open(path,"w");
            newFileHandler.close();
            return console.log("file created");
        }
    })

    fileHandler.on("delete",async(path)=>{
        try {
            await fs.rm(path);
            return console.log("file deleted");
        } catch (error) {
            return console.log("file does not exist");
        }
    })

    fileHandler.on("rename",async(oldpath,newpath)=>{
        try {
            await fs.rename(oldpath,newpath);
            console.log("file renamed");
        } catch (error){
            console.log("file does not exist");
        }
    })

    fileHandler.on("add",async(path,content)=>{
        try {
            await fs.appendFile(path,"\n"+content);
            return console.log("content added to file");
        } catch (error) {
            return console.log("file does not exist");
        }
    })

    for await (const event of watcher) {
        if (event.eventType==="change") {
            const size=(await fileHandler.stat()).size
            const data=await fileHandler.read(Buffer.alloc(size),0,size,0);
            const content=data.buffer.toString("ascii");
            
            if (content.includes(CREATE_FILE)) {
                const path=content.substring(CREATE_FILE.length+1);
                fileHandler.emit("create",path);
            }   
            if (content.includes(DELETE_FILE)) {
                const path=content.substring(DELETE_FILE.length+1);
                fileHandler.emit("delete",path);
            }
            if (content.includes(RENAME_FILE)) {
                const _index=content.indexOf(" to ");
                const oldpath=content.substring(RENAME_FILE.length+1,_index);
                const newpath=content.substring(_index+4);
                fileHandler.emit("rename",oldpath,newpath);
            }
            if (content.includes(ADD_TO_FILE)) {
                const _index=content.indexOf(" with ");
                const path=content.substring(ADD_TO_FILE.length+1,_index);
                const addContent=content.substring(_index+6);
                fileHandler.emit("add",path,addContent);
            }
    }}
})()
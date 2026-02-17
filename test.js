const eventEmitter= require('events');

class Emitter extends eventEmitter {}

const myE=new Emitter();

myE.on("aha",(x)=>{
    console.log("aha event triggered with data: "+x);
})

myE.emit("aha","Hello World!");
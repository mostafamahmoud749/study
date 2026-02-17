// 0100 1000 0110 1001 0010 0001

const {Buffer} = require('buffer')

const myMemory = Buffer.from("mostafa","ascii")

console.log(myMemory.toString("hex"))
console.log(myMemory.toString("ascii"))
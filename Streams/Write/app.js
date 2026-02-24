const fs = require('fs');
const {Buffer} = require('buffer');

(async () => {
    const fileHandle=await fs.promises.open('text.txt', 'a');
    const stream=fileHandle.createWriteStream();

    stream.on('drain',()=>{
        console.log('drain',writeMany());
    })
    console.time('writeFile');

    let i=0
    function writeMany(){
        while (i < 1000000) {
            const buff = Buffer.from(`${i}\n`, 'utf-8');
            i++;
            if (!stream.write(buff)) {
                return;
            }
        }
        stream.end();
    }
    writeMany();
    stream.on('finish', async () => {
        console.timeEnd('writeFile');
        await fileHandle.close();
    });
})()
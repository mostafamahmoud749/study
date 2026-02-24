const fs = require('fs/promises');

(async () => {
    const srcFileHandle = await fs.open('src.txt', 'r');
    const destFileHandle = await fs.open('dest.txt', 'w');
    const srcStream = srcFileHandle.createReadStream();
    const destStream = destFileHandle.createWriteStream();
    console.time('File copy time');
    srcStream.on('data', (chunk) => {
        if (!destStream.write(chunk)) srcStream.pause();
    });
    destStream.on('drain', () => {
        srcStream.resume();
    });
    srcStream.on('end', () => {
        console.timeEnd('File copy time');
        destStream.end();
        console.log('File copy completed.');
    });
})();
const http = require('http');
const { open, mkdir } = require('fs/promises');

const server = http.createServer();

server.on('request', async (req, res) => {
    if (req.url === '/upload') {
        if (req.method === 'OPTIONS') {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Headers', '*');
            res.setHeader('Access-Control-Allow-Methods', '*');
            res.statusCode = 200;
            res.end();
        } else if (req.method === 'POST') {
            await mkdir('./uploaded-files', { recursive: true });
            const fileHandler = await open(`./uploaded-files/${req.headers['x-filename']}`, 'w');
            const ws = fileHandler.createWriteStream();

            ws.on('drain', () => {
                req.resume();
            })

            req.on('end', async () => {
                await fileHandler.close();
                res.statusCode = 200;
                res.end();
            })

            req.on('data', (chunk) => {
                if (!ws.write(chunk)) {
                    req.pause();
                }
            });
        }
    }
})

server.listen(8080, '127.0.0.1', () => {
    console.log('server started...');
})
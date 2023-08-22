require('dotenv').config();
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const port = parseInt(process.env.PORT || '3000', 10);
const hostname = 'localhost';
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    createServer(async (req, res) => {
        try {
            const parsedUrl = parse(req.url, true);
            if (parsedUrl.pathname.startsWith('/admin')) {
                await app.render(req, res, '/admin', parsedUrl.query);
            } else {
                await handle(req, res, parsedUrl);
            }
        } catch (e) {
            console.error(e);
            res.statusCode = 500;
            res.end('Internal server error');
        }
    })
        .once('error', (e) => {
            console.error(e);
            process.exit(1);
        })
        .listen(port, () => {
            console.log(
                `> Server listening at http://${hostname}:${port} as ${dev ? 'development' : process.env.NODE_ENV}`
            )
        });
});

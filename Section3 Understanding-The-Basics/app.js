// this package is already shipped with node
const http = require('http')

// create the server
const server = http.createServer((req, res) => {
    console.log(req.method, req.url);

    res.setHeader('content-type', 'text/plain')
    res.write("Hello express");
    console.log(res.getHeaders())
    console.log(res.statusCode);
    return res.end();
});

// listen on port 3000
const port = 3000;

server.listen(port);

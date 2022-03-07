const http = require('http');
const app = require ('./app'); //adding app.js to server.js

const port = process.env.PORT || 3000; //port to be used

const server = http.createServer(app);

server.listen(port, () =>{
  console.log(`Server and database started on PORT ${port}`)
}); 
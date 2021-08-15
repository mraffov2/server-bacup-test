const express = require("express");
const path = require("path");
const { dbConection } = require("./database/config");
require("dotenv").config();

//APP de express
const app = express();
app.use( express.json() );
dbConection();




// NODE server
const server = require("http").createServer(app);
//module.exports.io = require("socket.io")(server);

//require("./sockets/sockets");

//PATH publico
const publicPath = path.resolve(__dirname, "public");

//Routes
app.use('/api', require('./routes/auth'));
app.use('/api', require('./routes/users'));
// app.use('/api', require('./routes/message'));

//Routes No found
app.use('/api', require('./routes/routeNoFound'));


app.use(express.static(publicPath));

server.listen(process.env.PORT, (err) => {
  if (err) throw new Error(err);

  console.log(`App listening on por ${process.env.PORT} `);
});



const { io } = require("../index");
const { checkJWT } = require('../helpers/jsonwebtoken')
const {userConected, userDisconected, saveMessage} = require('../controllers/socket')

//Mensajes Socket
io.on("connection",  (client) => {
  
  console.log("Client Conect");

  token = client.handshake.headers['x-token'];
  const [value, id] = checkJWT(token)

  if(!value) {return client.disconnect()}

  userConected(id);
  
  client.join(id)

  client.on('person-message', async (payload) => {
    
    await saveMessage(payload)
    io.to(payload.to).emit('person-message', payload)
  })

  

  client.on("disconnect", () => {
    userDisconected(id)
  });

  
});

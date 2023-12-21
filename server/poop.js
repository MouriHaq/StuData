const {client} = require("pg")
const pool = new Pool({
  user: 'your_username',
  host: 'localhost',
  database: 'LINKAPI',
  password: 'hussain',
  port: 3002,
});

client.connect((err)=>{
 if(err){
  console.log('connection error', err.stack)
 }
else {
  console.log("connected")
}
})

module.exports = client;
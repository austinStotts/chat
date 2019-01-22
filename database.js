const pg = require('pg');
const redis = require('ioredis');
const Redis = new redis();

const client = new pg.Client({
  user: 'Austin',
  host: '127.0.0.1',
  database: 'Austin',
  password: '00000000',
  port: 5432
})


const addMessage = (username, roomname, type, data, created) => {
  client.connect()
  .then(() => {
    client.query(`INSERT INTO messages (
      username, roomname, type, data, created
      ) VALUES (
      ${username},${roomname},${type},${data},${created})`
    ).then(() => {
      if(roomname === 'home') {
        setRoom(home) // not done !!¡¡!!¡¡!! set up 'setroom' to be  a redis list and give it the data to 'RPUSH'
      }
    })
    .catch(err => console.log(err))
  })
  .catch(err => {
    console.log('\n 01 connection err \n',err);
  })
}

const getMessagesByRoom = (roomname, callback) => {
  if(roomname === 'home') {
    getRoom(roomname, callback);
  } else {
    client.connect()
    .then(() => {
      client.query(`SELECT * FROM messages WHERE roomname = ${roomname}`)
      .then(data => callback(null, data))
      .catch(err => callback(err));
    })
  }
}

const getRoom = (roomname, callback) => {
  Redis.get(roomname).then(data => callback(null, data)).catch(err => callback(err))
}

const setRoom = (roomname, data, callback) => {
  Redis.set(roomname, data).then(() => callback('all good :)')).catch(err => callback(err))
}

module.exports = {
  addMessage, getMessagesByRoom, getRoom, setRoom
}

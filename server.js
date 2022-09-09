const Websocket = require('ws')
const clients = new Set()
const messages = []
const ws = new Websocket.Server({ port:8080 },()=> {
  console.log('Server started')
})

ws.on('connection',ws => {
  if (!clients.has(ws)) {
    console.log('New User connected')
    for (const message of messages) {
      ws.send(JSON.stringify(message))
    }
    clients.add(ws)
  }

  ws.on('message', data => {
    const jsonMessage = data.toString()
    messages.push(jsonMessage)
    console.log('jsonMessage',jsonMessage)
    console.log(messages)
    for(const client of clients) {
      client.send(JSON.stringify(jsonMessage))
    }
  })
})

ws.on('close', ws => {
  clients.delete(ws)
  console.log('User disconnected')
})

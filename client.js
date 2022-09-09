
const sendBtn = document.querySelector('button[id="send"]')
const chatBox = document.querySelector('#chatbox')
const status = document.querySelector('#status')
const socket = new WebSocket('ws://localhost:8080')
const textBox = document.querySelector('#textbox')


socket.onopen = function () {

  console.log('User connected')
  status.innerHTML = 'Online'
  document.getElementById("status").style.color = 'green'

}

sendBtn.addEventListener('click',()=> {
  if (status.innerHTML === 'Online') {
    const text = textBox.value
    if (!text.length) {
      console.log('Введите сообщение')
    } else {

      const textObject = text

      socket.send(JSON.stringify(textObject))
    }
  } else {
    alert('Нет связи с сервером')
  }
  textBox.value = ''
})

socket.onmessage = function (message) {
  const incomingMessage = JSON.parse(message.data)
  const newP = document.createElement('p')
  console.log(JSON.parse(incomingMessage))
  newP.innerHTML = JSON.parse(incomingMessage)
  chatBox.appendChild(newP)
  newP.scrollIntoView(top)
}

socket.onclose = function () {
  status.innerHTML = 'Offline'
  document.getElementById("status").style.color = 'red'
  console.log('User disconnected')
}

socket.onerror = event => console.log(`Error ${event.code}`)

/*
class Client {
  constructor () {
    this.sendBtn = document.querySelector('button[id="send"]')
    this.chatBox = document.querySelector('#chatbox')
    this.status = document.querySelector('#status')
    this.socket = null
    this.textBox = document.querySelector('#textbox')
  }
  start() {
    this.socket =  new WebSocket('ws://localhost:8080')
    this.socket.onopen = async function () {
      console.log('User connected')
      this.status.innerHTML = 'Online'
      document.getElementById("status").style.color = 'green'
    }
    this.socket.onmessage =  function (message) {
      const incomingMessage = JSON.parse(message.data)
      const newP = document.createElement('p')
      console.log(JSON.parse(incomingMessage))
      newP.innerHTML = JSON.parse(incomingMessage)
      this.chatBox.appendChild(newP)
      newP.scrollIntoView(top)
    }

    this.socket.onclose = async function () {
      this.status.innerHTML = 'Offline'
      document.getElementById("status").style.color = 'red'
      console.log('User disconnected')
    }

    this.socket.onerror = event => console.log(`Error ${event.code}`)

    this.sendBtn.addEventListener('click',()=> {
      if (this.status.innerHTML === 'Online') {
        const text = this.textBox.value
        if (!text.length) {
          console.log('Введите сообщение')
        } else {

          const textObject = text

          this.socket.send(JSON.stringify(textObject))
        }
      } else {
        alert('Нет связи с сервером')
      }
      this.textBox.value = ''
    })
  }
  // async sendMessage (){
  //
  // }
}

client.start()
*/



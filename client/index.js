const status = document.querySelector('.user-status');
const messages = document.querySelector('.message-field');
const form = document.querySelector('.form');
const input = document.querySelector('.userInput');
var el = document.getElementById('server-time');


var ws = new WebSocket('ws://localhost:3000');

function setStatus(value) {
    status.innerHTML = value;
}

function printMessage(message) {
    const li = document.createElement('li');
    li.innerHTML = message;
    console.log(message)
    messages.appendChild(li);
} 

function sendData(event) {
    event.preventDefault();
    console.log(input.value)
    ws.send(input.value);
}

form.addEventListener('submit', sendData)
ws.onopen = () => setStatus('Online');
ws.onclose = () => setStatus('Disсonnected');

ws.onmessage = response => {
    console.log(response)
    printMessage(response.data);
}



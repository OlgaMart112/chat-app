const status = document.querySelector('.user-status');
const messages = document.querySelector('.message-field');
const form = document.querySelector('.form');
const input = document.querySelector('.userInput');

var HOST = location.origin.replace(/^http/, 'ws');
var ws = new WebSocket(HOST);

function setStatus(value) {
    status.innerHTML = value;
}

function printMessage(message) {
    const li = document.createElement('li');
    li.innerHTML = message;
    messages.appendChild(li);
} 

function sendData(event) {
    event.preventDefault();
    ws.send(input.value);
    input.value = "";
}

form.addEventListener('submit', sendData)
ws.onopen = () => setStatus('Online');
ws.onclose = () => setStatus('Disсonnected');

ws.onmessage = response => {
    printMessage(response.data);
}



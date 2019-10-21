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
    const item = document.createElement('p');
    item.innerHTML = message;
    messages.appendChild(item);
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

# Basic WebSocket server

## Set up

Have Node.js installed on your system, this application has been tested with Node.js version 16.15<br><br>

Install node modules with the command "npm install"<br><br>

Start application with the command "node websocket-server"<br><br>

## How this application works

Detects DTMF events received from Vonage Voice API platform<br><br>

Receives audio from the PSTN legs connected to this WebSocket (set up by the Voice APi application named pstn-websocket.js)<br>
from repository https://github.com/nexmo-se/two-outbound-pstn-one-websocket
<br>

Your actual application can send audio in the other direction to those PSTN legs via the established WebSocket<br><br>

# Basic WebSocket server

## Set up

Have Node.js installed on your system, this application has been tested with Node.js version 16.15
Install node modules with the command "npm install"
Start application with the command "node websocket-server"

## How this application works

Detects DTMF events received from Vonage Voice API platform

Receives audio from the PSTN legs connected to this WebSocket (set up by the Voice APi application named pstn-websocket.js)

Your actual application can send audio in the other direction to those PSTN legs via the established WebSocket
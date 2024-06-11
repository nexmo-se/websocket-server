# Basic WebSocket server

You may use this sample code as a basic middleware to handle WebSockets connections and receive audio over those WebSokets.

Of course, in real reployment, your middleware application is an intermediary platform to connect to ASR engines, TTS engines, Voice bots, and more, and may send back audio to the Vonage platform.

## About this sample server code

This basic middleware server makes use of the [WebSockets feature](https://developer.vonage.com/en/voice/voice-api/concepts/websockets) of Vonage Voice API. When a voice call is established, a Voice API application triggers a WebSocket connection to this server and streams the audio from the voice call(s) in real time.

See https://github.com/nexmo-se/pstn-websocket-app for a **sample Voice API application** using this basic middleware server code to connect voice calls.

## Set up

### Set up this server code - Host server public hostname and port

First set up this server from https://github.com/nexmo-se/websocket-server.

Default local (not public!) reference connection code `port` is: 6000.

If you plan to test using `Local deployment` with ngrok (Internet tunneling service) for both this server code and the sample Voice API application, you may set up [multiple ngrok tunnels](https://ngrok.com/docs/agent/config/#tunnel-configurations).

For the next steps, you will need:
- This server's public hostname and if necessary public port,</br>
e.g. `xxxxxxxx.ngrok.io`, `xxxxxxxx.herokuapp.com`, `myserver.mycompany.com:32000` (will be needed when setting up the sample Voice API application side) ,</br>
no `port` is necessary with ngrok or heroku as public hostname.</br>

Have Node.js installed on your system, this application has been tested with Node.js version 18.19.1<br>

Install node modules with the command:<br>
 ```bash
npm install
```

Launch the application:<br>
```bash
node websocket-server
```

There is no environment variable (no .env file) needed to be set for this sample server code.<br>

## How this application works

Receives audio from the PSTN legs connected to this WebSocket (set up by the Voice API application named pstn-websocket-app.js).<br>

Your actual middleware application can send audio in the other direction to those PSTN legs via the established WebSocket.<br><br>



## Some capabilities handled by this sample application code

Detects DTMF events received from Vonage Voice API platform.<br>

That capability is also used for when connecting a WebSocket with an outbound PSTN call, near the beginning of the session, the first received DTMF '#' (as sent by the Voice API application for that purpose) signals that non silence inbound audio packets start to flow in, as corresponding outbound PSTN call just got answered.<br><br>
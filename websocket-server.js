'use strict'

//-------------

require('dotenv').config();

//--- for Neru installation ----
const neruHost = process.env.NERU_HOST;
console.log('neruHost:', neruHost);

//--
const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const expressWs = require('express-ws')(app);
app.use(bodyParser.json());
 
// const moment = require('moment');
// const { v4: uuidv4 } = require('uuid');

// const WebSocket = require("ws");

//---- CORS policy - Update this section as needed ----

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "OPTIONS,GET,POST,PUT,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
  next();
});

//-----------------------------------------------------------

app.ws('/socket', async (ws, req) => {

  let pstnCallDirection;
  let pstnAudioStarted = false;

  ws.on('message', async (msg) => {
    
    if (typeof msg === "string") {

      if (JSON.parse(msg).digit == "#" && pstnCallDirection == "outbound" && !pstnAudioStarted) {
        // this event indicates this middleware that inbound audio has started on the outbound PSTN call
        pstnAudioStarted = true;
        console.log("\n--- At time stamp", Date.now(), "inbound audio from answered outbound PSTN call has started");
      } else {
        console.log("\n--- Websocket settings:", msg);
        pstnCallDirection = JSON.parse(msg).pstn_call_direction;
      }
    
    } else {

      // here the binary audio payload is received by this WebSocket server application
      
      process.stdout.write(">"); // just to indicate WebSocket is receiving audio packets from Vonage platform

    } 

  });

  //--

  ws.on('close', async () => {

    console.log("\n--- WebSocket closed");

  });

});

//-------------------------------------------------------------------------------------------

//--- If this application is hosted on Vonage serverless infrastructure
//--- VCR - Vonage Code Runtime, aka Neru

app.get('/_/health', async (req, res) => {
    res.sendStatus(200);
});

//==================================================

const port = process.env.NERU_APP_PORT || process.env.PORT || 6000;

app.listen(port, () => console.log(`WebSocket server code running on port ${port}.`));

//------------

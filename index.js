const { dialogflow } = require('actions-on-google');
const express = require('express');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 5000;

const app = dialogflow();

app.intent('Default Welcome Intent', conv => {
    conv.ask('Hi, how is it going?');
})

const expressApp = express().use(bodyParser.json());

expressApp.post('/fulfillment', app);

expressApp.listen(PORT);
const { actionssdk } = require('actions-on-google');
const express = require('express');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 5000;

const app = actionssdk();

app.intent('input.welcome', conv => {
    conv.ask('Hi, how is it going?');
})

const expressApp = express().use(bodyParser.json());

expressApp.post('/fulfillment', app);

expressApp.listen(PORT);
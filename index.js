const { dialogflow } = require('actions-on-google');
const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 5000;

const app = dialogflow();

app.intent('Default Welcome Intent', conv => {
    conv.ask('Hi, how is it going?');
})

app.intent('weather intent', conv => {
    const city = 'Kosice';
    const APPID = '20408cb2ac4925b573f7ab56e4042863';
    const apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APPID}`;
    return new Promise((resolve, reject) => {
        request(apiUrl, {method: 'GET'} ,(err, body, resp) => {
            if (err) {
                conv.ask('Sorry, I dod not get that')
                reject(err);
            } else {
                const weatherResult = JSON.parse(resp);
                conv.close(`The weather in ${weatherResult.name} is ${weatherResult.main.temp}`);
                resolve();
            }
        });
    })
    
})

const expressApp = express().use(bodyParser.json());

expressApp.post('/fulfillment', app);

// expressApp.get('/fulfillment', function (req, res) {
//     res.send(JSON.stringify({ Hello: 'World'}));
//    });

const getWeatherInfo = (location) => {
    const APPID = '20408cb2ac4925b573f7ab56e4042863';
    const apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${APPID}`;
    return request(apiUrl);
}

expressApp.listen(PORT);
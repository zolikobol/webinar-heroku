const { dialogflow } = require('actions-on-google');
const express = require('express');
const rp = require('request-promise');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 5000;

const app = dialogflow();

app.intent('Default Welcome Intent', conv => {
    conv.ask('Hi, how is it going?');
})

app.intent('weather intent', conv => {
    const city = 'kosice;'
    console.log('====================================');
    console.log(city);
    console.log('====================================');
    getWeatherInfo(city)
    .then(response => {
        console.log('====================================');
        console.log(response);
        console.log('====================================');
        conv.tell(`The weather in ${response.name} is ${response.main.temp} C`);
    })
    .catch(error => {
        conv.ask('Sorry, I did not get that!')
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
    return rp(apiUrl);
}

expressApp.listen(PORT);
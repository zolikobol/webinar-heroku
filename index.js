const { DialogflowApp } = require('actions-on-google');

const http = require('http');
const PORT = process.env.PORT || 5000;

const server = http.createServer((req, res) => {
    const app = new DialogflowApp({ request: request, response: response });
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   console.log('=======================');
//   console.log(req);
//   console.log('=======================');
    const welcomeIntent = (app) => {
        app.ask('Hello how are you?');
    }
    const actionMap = new Map();
    actionMap.set('input.welcome', welcomeIntent);
    app.handleRequest(actionMap);
});
server.listen(PORT, () => {
  console.log(`Server running on ${PORT}/`);
});
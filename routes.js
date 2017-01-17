'use strict';

const http = require('http');
const fs = require('fs');
const helpers = require('./includes/Helpers.js');

const PORT = process.env.PORT | 3000

http.createServer((request, response) => {
  try {
    response.setHeader('Access-Controll-Allow-Origin', '*');
    //Resolvendo o bug do favicon.ico
    if (request.url === '/favicon.ico') {
      response.writeHead(200, {
        'Content-Type': 'image/x-icon'
      });
      response.end( /* icon content here */ );
    } else {
      switch (request['method']) {
        case "GET":
          helpers.methodGet(request, response);
          break;
        case "POST":
          helpers.methodPost(request, response);
          break;
        default:
          helpers.methodGet(request, response);
          break;
      }
    }
  } catch (error) {
    console.log(error);
    response.write(error);
    response.end();
  }
}).listen(PORT);

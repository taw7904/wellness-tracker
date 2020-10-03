const http = require('http');
const url = require('url');
const query = require('querystring');
const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
  GET: {
    '/': htmlHandler.getIndex,
    '/style.css': htmlHandler.getStyle,
    '/edit.png': htmlHandler.getEditIcon,
    '/sleep.gif': htmlHandler.getSleepIcon,
    '/food.gif': htmlHandler.getFoodIcon,
    '/exercise.gif': htmlHandler.getExerciseIcon,
    '/water.gif': htmlHandler.getWaterIcon,
    '/getFoods': jsonHandler.getFoods,
    '/getExercise': jsonHandler.getExercise,
    '/getRest': jsonHandler.getRest,
    notFound: jsonHandler.notFound,
  },
  HEAD: {
    '/getFoods': jsonHandler.getFoodsMeta,
    '/getExercise': jsonHandler.getExerciseMeta,
    '/getRest': jsonHandler.getRestMeta,
    notFound: jsonHandler.notFoundMeta,
  },
};

// handle POST requests
const handlePost = (request, response, parsedUrl) => {
  const body = [];
  request.on('error', (err) => {
    console.dir(err);
    response.statusCode = 400;
    response.end();
  });
  request.on('data', (chunk) => {
    body.push(chunk);
  });

  // on end of upload stream
  request.on('end', () => {
    const bodyString = Buffer.concat(body).toString();
    const bodyParams = query.parse(bodyString);
    if (parsedUrl.pathname === '/addFood') {
      jsonHandler.addFood(request, response, bodyParams);
    } else if (parsedUrl.pathname === '/addExercise') {
      jsonHandler.addExercise(request, response, bodyParams);
    } else if (parsedUrl.pathname === '/addRest') {
      jsonHandler.addRest(request, response, bodyParams);
    }
  });
};

const onRequest = (request, response) => {
  // returns an object of url parts by name
  const parsedUrl = url.parse(request.url);
  console.dir(parsedUrl.pathname);
  console.dir(request.method);

  if (request.method === 'POST') {
    handlePost(request, response, parsedUrl);
  } else if (urlStruct[request.method][parsedUrl.pathname]) {
    urlStruct[request.method][parsedUrl.pathname](request, response);
  } else {
    // if the request isn't a proper method for our program, not found
    urlStruct[request.method].notFound(request, response);
  }
};

http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);

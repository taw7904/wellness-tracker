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
    '/getUsers': jsonHandler.getUsers,
    notFound: jsonHandler.notFound,
  },
  HEAD: {
    '/getUsers': jsonHandler.getUsersMeta,
    notFound: jsonHandler.notFoundMeta,
  },
};

// handle POST requests
const handlePost = (request, response, parsedUrl) => {
  // if post is to /addUser (our only POST url)
  if (parsedUrl.pathname === '/addUser') {
    // uploads come in as a byte stream that we need
    // to reassemble once it's all arrived
    const body = [];
    // if upload stream errors out, throw a bad request and send it back
    request.on('error', (err) => {
      console.dir(err);
      response.statusCode = 400;
      response.end();
    });

    // on 'data' is for each byte of data that comes in
    // from the upload. We will add it to our byte array.
    // anytime new packet of info comes in, add it to the body array
    request.on('data', (chunk) => {
      body.push(chunk);
    });

    // on end of upload stream
    request.on('end', () => {
      // combine our byte array into single item
      const bodyString = Buffer.concat(body).toString();
      // since we are getting x-www-form-urlencoded data
      // the format will be the same as querystrings
      // Parse the string into an object by field name
      const bodyParams = query.parse(bodyString);
      // pass to our addUser function
      jsonHandler.addUser(request, response, bodyParams);
    });
  }
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

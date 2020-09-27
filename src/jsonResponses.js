const users = {};
const foods = {};
const glasses = {};
const exercises = {};
// const rest = {};

// function to respond with a json object
// takes request, response, status code and object to send
const respondJSON = (request, response, status, object) => {
  // can also make header object with multiple headers if needed
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(object));
  response.end();
};

// function to respond without json body
// same as head request without .write
// takes request, response and status code
const respondJSONMeta = (request, response, status) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.end();
};

// return food object as JSON
const getFoods = (request, response) => {
  const responseJSON = {
    foods,
  };
  return respondJSON(request, response, 200, responseJSON);
};

const getFoodsMeta = (request, response) => respondJSONMeta(request, response, 200);

// function to add a user from a POST body
// body contains information from the user
const addFood = (request, response, body) => {
  // default json message -> assume the user sent an improper request
  const responseJSON = {
    message: 'Please enter the name, calories, and quantity.',
  };

  // check to make sure we have both fields
  // if either are missing, send back an error message as a 400 badRequest
  if (!body.foodName || !body.calories || !body.quantity) {
    responseJSON.id = 'missingParams';
    return respondJSON(request, response, 400, responseJSON);
  }

  // default status code - assuming item is not yet created
  let responseCode = 201;

  // if already exists, switch to a 204 updated status
  if (foods[body.foodName]) {
    responseCode = 204;
  } else {
    // otherwise create an empty object with that name
    foods[body.foodName] = {};
    foods[body.foodName].foodName = body.foodName;
  }

  foods[body.foodName].calories = body.calories;
  foods[body.foodName].quantity = body.quantity;

  // if response is created, then set our created message
  // and sent response with a message
  if (responseCode === 201) {
    responseJSON.message = 'Created Successfully';
    return respondJSON(request, response, responseCode, responseJSON);
  }
  return respondJSONMeta(request, response, responseCode);
};

// return exercise object as JSON
const getExercise = (request, response) => {
  const responseJSON = {
    exercises,
  };
  return respondJSON(request, response, 200, responseJSON);
};

const getExerciseMeta = (request, response) => respondJSONMeta(request, response, 200);

// function to add a user from a POST body
// body contains information from the user
const addExercise = (request, response, body) => {
  // default json message -> assume the user sent an improper request
  const responseJSON = {
    message: 'Please enter the exercise type and duration.',
  };

  // check to make sure we have both fields
  // if either are missing, send back an error message as a 400 badRequest
  if (!body.exerciseType || !body.duration) {
    responseJSON.id = 'missingParams';
    return respondJSON(request, response, 400, responseJSON);
  }

  // default status code - assuming item is not yet created
  let responseCode = 201;

  // if already exists, switch to a 204 updated status
  if (exercises[body.exerciseType]) {
    responseCode = 204;
  } else {
    // otherwise create an empty object with that name
    exercises[body.exerciseType] = {};
    exercises[body.exerciseType].exerciseType = body.exerciseType;
  }

  exercises[body.exerciseType].duration = body.duration;

  // if response is created, then set our created message
  // and sent response with a message
  if (responseCode === 201) {
    responseJSON.message = 'Created Successfully';
    return respondJSON(request, response, responseCode, responseJSON);
  }
  return respondJSONMeta(request, response, responseCode);
};


const notFound = (request, response) => {
  const responseJSON = {
    message: 'Page not found.',
    id: 'notFound',
  };
  return respondJSON(request, response, 404, responseJSON);
};

// function for 404 not found without message
const notFoundMeta = (request, response) => respondJSONMeta(request, response, 404);

// public exports
module.exports = {
  getFoods,
  getFoodsMeta,
  addFood,
  getExercise,
  getExerciseMeta,
  addExercise,
  notFound,
  notFoundMeta,
};

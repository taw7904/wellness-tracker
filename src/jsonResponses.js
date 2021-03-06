const foods = {};
const exercises = {};
const rest = {};
const totals = {
  foodTotal: 0, waterTotal: 0, exerciseTotal: 0, restTotal: 0,
};
const goals = {
  foodGoal: 2000, waterGoal: 8, exerciseGoal: 60, restGoal: 8,
};

// function to respond with a json object
// takes request, response, status code and object to send
const respondJSON = (request, response, status, object) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(object));
  response.end();
};

// function to respond without json body
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

// return food metadata
const getFoodsMeta = (request, response) => respondJSONMeta(request, response, 200);

// function to add food from a POST body
const addFood = (request, response, body) => {
  // default json message, assume the user sent an improper request
  const responseJSON = {
    message: 'Please enter the name, calories, and quantity.',
  };

  // if any fields are missing, send a bad request
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

  const calcCalories = parseInt(foods[body.foodName].calories, 10);
  const calcQuantity = parseInt(foods[body.foodName].quantity, 10);
  // calculate the total calories and add it to the goal
  const calculation = calcCalories * calcQuantity;
  totals.foodTotal += calculation;

  // if response is created, then set our created message
  // and sent response with a message
  if (responseCode === 201) {
    responseJSON.message = 'Created Successfully';
    responseJSON.foodTotal = totals.foodTotal;
    responseJSON.exerciseTotal = totals.exerciseTotal;
    responseJSON.waterTotal = totals.waterTotal;
    responseJSON.restTotal = totals.restTotal;
    responseJSON.foodGoal = goals.foodGoal;
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

// return exercise meta data
const getExerciseMeta = (request, response) => respondJSONMeta(request, response, 200);

// function to add exercise from a POST body
const addExercise = (request, response, body) => {
  // default json message -> assume the user sent an improper request
  const responseJSON = {
    message: 'Please enter the exercise type and duration.',
  };

  // if any fields are missing, send a bad request
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

  // add amount of workout time to the total
  totals.exerciseTotal += parseInt(exercises[body.exerciseType].duration, 10);

  // if response is created, then set our created message
  // and sent response with a message
  if (responseCode === 201) {
    responseJSON.message = 'Created Successfully';
    responseJSON.foodTotal = totals.foodTotal;
    responseJSON.exerciseTotal = totals.exerciseTotal;
    responseJSON.waterTotal = totals.waterTotal;
    responseJSON.restTotal = totals.restTotal;
    responseJSON.exerciseGoal = goals.exerciseGoal;
    return respondJSON(request, response, responseCode, responseJSON);
  }
  return respondJSONMeta(request, response, responseCode);
};

// return rest object as JSON
const getRest = (request, response) => {
  const responseJSON = {
    rest,
  };
  return respondJSON(request, response, 200, responseJSON);
};

// return rest metadata
const getRestMeta = (request, response) => respondJSONMeta(request, response, 200);

// add rest info from the user!
const addRest = (request, response, body) => {
  // default json message -> assume the user sent an improper request
  const responseJSON = {
    message: 'Please enter sleep duration, relaxation time, and your mood.',
  };

  // if any fields are missing, send a bad request
  if (!body.sleep || !body.relaxation || !body.mood) {
    responseJSON.id = 'missingParams';
    return respondJSON(request, response, 400, responseJSON);
  }

  // default status code - assuming item is not yet created
  let responseCode = 201;

  // if already exists, switch to a 204 updated status
  if (rest[body.sleep]) {
    responseCode = 204;
  } else {
    // otherwise create an empty object with that name
    rest[body.sleep] = {};
    rest[body.sleep].sleep = body.sleep;
  }

  rest[body.sleep].relaxation = body.relaxation;
  rest[body.sleep].mood = body.mood;

  // add amount of sleep to the total
  totals.restTotal += parseInt(rest[body.sleep].sleep, 10);

  // if response is created, then set our created message
  // and sent response with a message
  if (responseCode === 201) {
    responseJSON.message = 'Created Successfully';
    responseJSON.foodTotal = totals.foodTotal;
    responseJSON.exerciseTotal = totals.exerciseTotal;
    responseJSON.waterTotal = totals.waterTotal;
    responseJSON.restTotal = totals.restTotal;
    responseJSON.restGoal = goals.restGoal;
    return respondJSON(request, response, responseCode, responseJSON);
  }
  return respondJSONMeta(request, response, responseCode);
};

// add goal info when goals are edited
const addGoal = (request, response, body) => {
  // default json message -> assume the user sent an improper request
  const responseJSON = {
    // shouldn't happen as all the goal fields have default values
    message: 'Please enter a goal for each category.',
  };

  // check to make sure we have all fields
  if (!body.foodGoal || !body.waterGoal || !body.exerciseGoal || !body.restGoal) {
    responseJSON.id = 'missingParams';
    return respondJSON(request, response, 400, responseJSON);
  }

  // default status code - only one response code
  // there's already default values, so it will always have something
  const responseCode = 201;

  goals.foodGoal = body.foodGoal;
  goals.waterGoal = body.waterGoal;
  goals.exerciseGoal = body.exerciseGoal;
  goals.restGoal = body.restGoal;

  // if response is created, then set our created message
  // and sent response with a message
  if (responseCode === 201) {
    responseJSON.message = 'Goals Updated Successfully';
    responseJSON.foodGoal = goals.foodGoal;
    responseJSON.exerciseGoal = goals.exerciseGoal;
    responseJSON.waterGoal = goals.waterGoal;
    responseJSON.restGoal = goals.restGoal;
    return respondJSON(request, response, responseCode, responseJSON);
  }
  return respondJSONMeta(request, response, responseCode);
};

// add water info from the user!
const addWater = (request, response) => {
  const responseJSON = {
    // no improper request possible here as it's just a button click
    message: '',
  };

  // default status code - assuming item is not yet created
  const responseCode = 201;

  // add one water
  totals.waterTotal += 1;

  // if response is created, then set our created message
  // and sent response with a message
  if (responseCode === 201) {
    responseJSON.message = 'Created Successfully';
    responseJSON.foodTotal = totals.foodTotal;
    responseJSON.exerciseTotal = totals.exerciseTotal;
    responseJSON.waterTotal = totals.waterTotal;
    responseJSON.restTotal = totals.restTotal;
    responseJSON.waterGoal = goals.waterGoal;
    return respondJSON(request, response, responseCode, responseJSON);
  }
  return respondJSONMeta(request, response, responseCode);
};

// not found response object, message and id
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
  getRest,
  getRestMeta,
  addRest,
  addWater,
  addGoal,
  notFound,
  notFoundMeta,
};

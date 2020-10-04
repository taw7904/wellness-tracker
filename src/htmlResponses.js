const fs = require('fs');
// set up all the files
const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const style = fs.readFileSync(`${__dirname}/../client/style.css`);
const editIcon = fs.readFileSync(`${__dirname}/../images/edit.png`);
const sleepIcon = fs.readFileSync(`${__dirname}/../images/sleep.gif`);
const waterIcon = fs.readFileSync(`${__dirname}/../images/water.gif`);
const foodIcon = fs.readFileSync(`${__dirname}/../images/food.gif`);
const exerciseIcon = fs.readFileSync(`${__dirname}/../images/exercise.gif`);

// connect index page
const getIndex = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(index);
  response.end();
};

// connect the style sheet
const getStyle = (request, response) => {
  response.writeHead(200, { 'Content-Tpye': 'text/css' });
  response.write(style);
  response.end();
};

// connect edit icon, this will open edit goals
const getEditIcon = (request, response) => {
  response.writeHead(200, { 'Content-Tpye': 'image/png' });
  response.write(editIcon);
  response.end();
};

// connect sleep gif to appear on screen
const getSleepIcon = (request, response) => {
  response.writeHead(200, { 'Content-Tpye': 'image/gif' });
  response.write(sleepIcon);
  response.end();
};

// connect food gif to appear on screen
const getFoodIcon = (request, response) => {
  response.writeHead(200, { 'Content-Tpye': 'image/gif' });
  response.write(foodIcon);
  response.end();
};

// connect exercise gif to appear on screen
const getExerciseIcon = (request, response) => {
  response.writeHead(200, { 'Content-Tpye': 'image/gif' });
  response.write(exerciseIcon);
  response.end();
};

// connect water gif to appear on screen
const getWaterIcon = (request, response) => {
  response.writeHead(200, { 'Content-Tpye': 'image/gif' });
  response.write(waterIcon);
  response.end();
};

module.exports = {
  getIndex,
  getStyle,
  getEditIcon,
  getSleepIcon,
  getFoodIcon,
  getExerciseIcon,
  getWaterIcon,
};

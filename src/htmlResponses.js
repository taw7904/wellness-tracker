const fs = require('fs');

const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const style = fs.readFileSync(`${__dirname}/../client/style.css`);
const editIcon = fs.readFileSync(`${__dirname}/../images/edit.png`);
const sleepIcon = fs.readFileSync(`${__dirname}/../images/sleep.gif`);
const waterIcon = fs.readFileSync(`${__dirname}/../images/water.gif`);
const foodIcon = fs.readFileSync(`${__dirname}/../images/food.gif`);
const exerciseIcon = fs.readFileSync(`${__dirname}/../images/exercise.gif`);

const getIndex = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(index);
  response.end();
};

const getStyle = (request, response) => {
  response.writeHead(200, { 'Content-Tpye': 'text/css' });
  response.write(style);
  response.end();
};

const getEditIcon = (request, response) => {
  response.writeHead(200, { 'Content-Tpye': 'image/png' });
  response.write(editIcon);
  response.end();
};

const getSleepIcon = (request, response) => {
  response.writeHead(200, { 'Content-Tpye': 'image/gif' });
  response.write(sleepIcon);
  response.end();
};

const getFoodIcon = (request, response) => {
  response.writeHead(200, { 'Content-Tpye': 'image/gif' });
  response.write(foodIcon);
  response.end();
};

const getExerciseIcon = (request, response) => {
  response.writeHead(200, { 'Content-Tpye': 'image/gif' });
  response.write(exerciseIcon);
  response.end();
};

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

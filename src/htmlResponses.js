const fs = require('fs');

const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const style = fs.readFileSync(`${__dirname}/../client/style.css`);
const editIcon = fs.readFileSync(`${__dirname}/../images/edit.png`);

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

module.exports.getIndex = getIndex;
module.exports.getStyle = getStyle;
module.exports.getEditIcon = getEditIcon;

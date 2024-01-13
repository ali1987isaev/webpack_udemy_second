const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

app.use('/', express.static(path.resolve(__dirname, '../dist')));

app.get('/', function (req, res) {
  const htmlFilePath = path.resolve(__dirname, '../dist/image.html');
  const htmlContent = fs.readFileSync(htmlFilePath, 'utf-8');
  res.send(htmlContent);
});

app.listen(9002, function () {
  console.log('Application is running on http://localhost:9002/');
});
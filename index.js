const mqtt = require('mqtt');
const fs = require('fs');
const path = require('path');

const client = mqtt.connect('mqtt://localhost');

client.on('connect', function () {
  client.subscribe('topic');
});

client.on('message', function (topic, message) {
  const data = JSON.parse(message.toString());
  const fileName = data.name;
  const fileContent = data.binary;
  const filePath = path.join(__dirname, fileName);

  fs.writeFile(filePath, fileContent, function (err) {
    if (err) throw err;
    console.log('File saved!');
  });
});

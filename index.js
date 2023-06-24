const mqtt = require('mqtt');
const fs = require('fs');
const crypto = require('crypto');
const dotenv = require('dotenv');
const debug = require('debug')('mqtt-to-binary');

dotenv.config();

const client = mqtt.connect(process.env.MQTT_BROKER_URL);

client.on('connect', () => {
  client.subscribe(process.env.MQTT_TOPIC);
});

client.on('message', (topic, message) => {
  const hash = crypto.createHash('md5').update(message).digest('hex');
  const fileName = `${hash}.uf2`;
  fs.writeFile(fileName, message, (err) => {
    if (err) throw err;
    debug(`File ${fileName} created successfully`);
  });
});

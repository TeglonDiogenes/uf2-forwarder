const mqtt = require('mqtt');
const fs = require('fs');
const crypto = require('crypto');
const dotenv = require('dotenv');
const debug = require('debug')('mqtt-to-binary');

dotenv.config();

const {MQTT_BROKER_URL, MQTT_TOPIC, UPLOAD_DIRECTORY} = process.env;
const client = mqtt.connect(process.env.MQTT_BROKER_URL);

client.on('connect', () => {
  client.subscribe(process.env.MQTT_TOPIC);
});

client.on('message', (topic, message) => {
  const hash = crypto.createHash('md5').update(message).digest('hex');
  const ts = Date.now()l
  const fileName = `${UPLOAD_DIRECTORY}/${ts}-${hash}.uf2`;
  fs.writeFile(, message, (err) => {
    if (err) throw err;
    debug(`File ${fileName} created successfully`);
  });
});

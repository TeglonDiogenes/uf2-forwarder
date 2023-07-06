require('./get-config')
const mqtt = require('mqtt')
const fs = require('fs')
const crypto = require('crypto')
const debug = require('debug')('mqtt-to-binary')

const {
  MQTT_BROKER_URL,
  MQTT_BROADCAST_TOPIC,
  MQTT_TOPIC,
  UPLOAD_DIRECTORY
} = process.env

const client = mqtt.connect(MQTT_BROKER_URL)

client.on('connect', () => {
  client.subscribe(MQTT_TOPIC)
  client.subscribe(MQTT_BROADCAST_TOPIC)
})
function storeuf2 (topic, message) {
  const hash = crypto.createHash('md5').update(message).digest('hex')
  const ts = Date.now()
  const pathToFile = `${UPLOAD_DIRECTORY}/${ts}-${hash}.uf2`
  fs.writeFile(pathToFile, message, (err) => {
    if (err) throw err
    debug(`File ${pathToFile} created successfully`)
  })
}
function broadcast (topic, message) {
  debug(topic, message)
}
function what (topic, message) {
  debug('What?'.topic, message)
}
client.on('message', (topic, message) => {
  switch (topic) {
    case MQTT_TOPIC:
      storeuf2(topic, message)
      break
    case MQTT_BROADCAST_TOPIC:
      broadcast(topic, message)
      break
    default:
      what(topic, message)
      break
  }
})

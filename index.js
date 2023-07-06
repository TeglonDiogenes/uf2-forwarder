require('./get-config')
const mqtt = require('mqtt')
const fs = require('fs')
const crypto = require('crypto')
const debug = require('debug')('mqtt-to-binary')

const { MQTT_BROKER_URL, MQTT_BROADCAST_TOPIC, MQTT_TOPIC, UPLOAD_DIRECTORY } = process.env
const client = mqtt.connect(MQTT_BROKER_URL)

client.on('connect', () => {
  client.subscribe(MQTT_TOPIC)
  client.subscribe(MQTT_BROADCAST_TOPIC)
})

client.on('message', (topic, message) => {
  const hash = crypto.createHash('md5').update(message).digest('hex')
  const ts = Date.now()
  const pathToFile = `${UPLOAD_DIRECTORY}/${ts}-${hash}.uf2`
  fs.writeFile(pathToFile, message, (err) => {
    if (err) throw err
    debug(`File ${pathToFile} created successfully`)
  })
})

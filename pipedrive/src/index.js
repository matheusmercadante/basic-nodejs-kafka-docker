import express from 'express'
import { Kafka, logLevel } from 'kafkajs'

import routes from './routes.js'

const app = express()

const kafka = new Kafka({
    clientId: 'pipedrive-service',
    brokers: ['localhost:9092'],
    logLevel: logLevel.INFO
})

const producer = kafka.producer()

app.use((req, res, next) => {
    req.producer = producer

    return next()
})

app.use(routes)

async function run() {
    await producer.connect()

    app.listen(3001)
}

run().catch(console.error)
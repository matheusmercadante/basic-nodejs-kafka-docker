import { Kafka } from 'kafkajs'

const kafka = new Kafka({
    clientId: 'mongo-service',
    brokers: ['localhost:9092']
})

const consumer = kafka.consumer({ groupId: 'data-sales-mongodb-group' })

async function run() {
    await consumer.connect()
    await consumer.subscribe({ topic: 'bling-infos' })

    await consumer.run({
        partitionsConsumedConcurrently: 1,
        eachMessage: async ({ topic, partition, message }) => {
            const prefix = `${topic}[${partition} | ${message.offset}] / ${message.timestamp}`
            console.log(`- ${prefix} ${message.key}#${message.value}`)
        }
    })
}

run().catch(console.error)
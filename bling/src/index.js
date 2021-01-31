import { Kafka, logLevel, CompressionTypes } from 'kafkajs'
import axios from 'axios'

import { convertJsonToXml } from './convertXml.js'

const kafka = new Kafka({
    clientId: 'bling-service',
    brokers: ['localhost:9092']
})

const consumer = kafka.consumer({ groupId: 'data-sales-group' })

const producer = kafka.producer()

async function run() {
    await consumer.connect()
    await consumer.subscribe({ topic: 'pipedrive-infos', fromBeginning: true })

    await producer.connect()

    await consumer.run({
        eachMessage: async ({ topic: topicPrev, partition, message }) => {
            const prefix = `${topicPrev}[${partition} | ${message.offset}] / ${message.timestamp}`
            console.log(`- ${prefix} ${message.key}#${message.value}`)

            const xmlInfos = convertJsonToXml(message.value)

            try {
                const { status, data } = await axios.post(`https://bling.com.br/Api/v2/pedido/?apikey=25955d7024180c4150055e3d222eff001a225f8f9c838b1190ce91b013a88ff9a34677d7&xml=${xmlInfos}`)

                console.log(data)

                if (status == 200 || status == 201) {
                    const { data } = await axios.get('https://bling.com.br/Api/v2/pedidos/json?apikey=25955d7024180c4150055e3d222eff001a225f8f9c838b1190ce91b013a88ff9a34677d7')

                    // console.log(data.retorno.pedidos)

                    data.retorno.pedidos.forEach(async pedido => {
                        // console.log(pedido)
                        await producer.send({
                            topic: 'bling-infos',
                            compression: CompressionTypes.GZIP,
                            messages: [
                                { key: message.key, value: JSON.stringify(pedido), partition: 1 }
                            ]
                        })
                    })
                }
            } catch (error) {
                console.log(error)
            }
        }
    })
}

run().catch(console.error)
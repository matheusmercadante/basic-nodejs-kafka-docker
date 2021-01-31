import express from 'express'
import axios from 'axios'
import { CompressionTypes } from 'kafkajs'

const routes = express.Router()

routes.post('/pipedrive', async (req, res) => {
    const { data: leads } = await axios.get('https://api.pipedrive.com/v1/deals?status=won&start=0&api_token=80078f81b6ac1073001462c2c32a02f1d708809b')

    const message = leads.data.map(lead => {
        return {
            id: lead.id,
            nPedidos: 3,
            dataCompra: lead.won_time.substr(0, 10),
            fornecedor: lead.org_name,
            descricaoItem: 'some description',
            quantidadeItem: 5,
            numeroDias: '01/01/2020',
            valor: lead.weighted_value,
            formaPagamento: 'dinheiro'
        }
    })

    await req.producer.send({
        topic: 'pipedrive-infos',
        compression: CompressionTypes.GZIP,
        messages: [
            { key: `${Math.random(1) * 10}`, value: JSON.stringify(message) }
        ]
    })

    return res.json({ ok: true })
})

export default routes
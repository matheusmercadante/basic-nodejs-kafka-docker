import express from 'express'
import httpProxy from 'express-http-proxy'

const pipeDriveProxy = httpProxy('http://localhost:3001')

const app = express()

app.post('/pipedrive', (req, res) => {
    pipeDriveProxy(req, res)
})

app.listen(3000)
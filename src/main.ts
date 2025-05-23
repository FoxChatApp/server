import * as jsoncParser from 'jsonc-parser';
import * as fs from 'fs';
import express from 'express'
const config = jsoncParser.parse(fs.readFileSync('config.jsonc').toString());

import WebSocket from 'ws';
import { createClient } from '@redis/client';
import createWSClient from './handlers/createClient';

import { createServer } from 'http';
import { accountsRouter } from './routes/users/accounts';

const app = express();

app.use('/assets', express.static('assets'))
app.use('/uploads', express.static('uploads'))
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(accountsRouter)

const server = createServer(app)

const redisClient = createClient({
    "url": config.redisURL
});
redisClient.connect().then(()=>{
    console.log('Redis client connected :3')
}).catch(console.error)

const subscriber = redisClient.duplicate()
subscriber.connect().then(()=>{
    console.log('Redis subscriber connected :3')
}).catch(console.error)

const wss = new WebSocket.Server({ server });

wss.on('connection', createWSClient);

console.log('WS server running on ws://localhost:8080');

app.get('/',(req,res)=>{
    res.redirect('/assets/index.html')
})

server.listen(8080)

export {redisClient, subscriber}
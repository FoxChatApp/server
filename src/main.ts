import * as jsoncParser from 'jsonc-parser';
import * as fs from 'fs';

const config = jsoncParser.parse(fs.readFileSync('config.jsonc').toString());

import WebSocket from 'ws';
import { createClient } from '@redis/client';
import createWSClient from './handlers/createClient';

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

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', createWSClient);

console.log('WS server running on ws://localhost:8080');

export {redisClient, subscriber}
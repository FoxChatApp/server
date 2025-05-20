import ws from 'ws';
import { subscriber, redisClient } from '../main';

export default function (client: ws.WebSocket) {
    console.log("New WS client connected :3");

    subscriber.subscribe("chat", (message) => {
        client.send(message);
    });

    client.on("message", async (msg) => {
        console.log(`Received WS message: ${msg}`);
        try {
            await redisClient.publish("chat", msg.toString());
        } catch (err) {
            console.error("Publish error:", err);
        }
    });

    client.on("close", () => {
        console.log("WS client disconnected :(");
    });
};

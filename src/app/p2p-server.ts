import * as WebSocket from 'ws';
import {Block, Blockchain} from "../blockchain";

const P2P_PORT = process.env.P2P_PORT || 5001;
const peers = process.env.PEERS ? process.env.PEERS.split(','): [];

export class P2pServer {
    sockets: WebSocket[] = [];
    constructor(public blockchain: Blockchain) {}

    listen() {
        const server = new WebSocket.Server({port: +P2P_PORT});

        server.on('connection', (socket) => {
            this.connectSocket(socket)
        });

        this.connectToPeers();
        console.log(`listening peer-2-peer on port ${P2P_PORT}`)
    }

    private connectSocket(socket: WebSocket) {
        this.sockets.push(socket);
        console.log('socket connected');

        this.sendChain(socket);
    }

    private connectToPeers() {
        peers.forEach((peer) => {
            // ws://localhost:5001
            const socket = new WebSocket(peer);
            socket.on('open', () => {
                this.connectSocket(socket);
            });

            this.messageHandler(socket);
        });
    }

    messageHandler(socket: WebSocket)  {
        socket.on('message', (message: string) => {
            const data:Block[] = JSON.parse(message);
            this.blockchain.replaceChain(data);
        })
    }

    private sendChain(socket: WebSocket) {
        socket.send(JSON.stringify(this.blockchain.chain));
    }
    syncChains() {
        this.sockets.forEach((socket) => {
            this.sendChain(socket);
        })
    }
}
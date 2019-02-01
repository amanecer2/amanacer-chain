import * as express from "express";
import * as bodyParser from 'body-parser';
import {Blockchain} from "../blockchain";
import {P2pServer} from "./p2p-server";

const HTTP_PORT = process.env.HTTP_PORT || 3001;

const app = express();

app.use(bodyParser.json());

const blockchain = new Blockchain();
const p2pServer = new P2pServer(blockchain);


app.get('/blocks', (req, res) => {
    return res.json(blockchain.chain)
});

app.post('/mine', (req, res) => {
    const block = blockchain.addBlock(req.body.data);
    console.log('new block set', block.toString());

    p2pServer.syncChains();

    res.redirect('/blocks')
});

app.listen(HTTP_PORT, () => {
    console.log('listening on port', HTTP_PORT)
});

p2pServer.listen();
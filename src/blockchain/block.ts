import {SHA256} from 'crypto-js';
import {DIFFICULTY} from "../app/config";

export class Block {
    constructor(public timestamp: number | string,
                public lastHash: string,
                public hash: string,
                public data: any,
                public nonce: number) {
    }

    toString() {
        return `
        Block
        Timestamp: ${this.timestamp}
        Lasthash: ${this.lastHash.substring(0, 10)}
        Hash: ${this.hash.substring(0, 10)}
        Nonce: ${this.nonce}
        Data: ${this.data.toString()}
        `;
    }

    static genesis() {
        return new this('Gensis time', '------', 'f1r57-h45h', [], 0)
    }

    static mineBlock(lastBlock: Block, data: any) {
        let nonce = 0;
        let hash, now;
        const lastHash = lastBlock.hash;

        do {
            now = Date.now();
            nonce++;
            hash = Block.hash(now, lastHash, data, nonce);
        }while (hash.substring(0, DIFFICULTY) !== '0'.repeat(DIFFICULTY));

        return new this(now, lastHash, hash, data, nonce);
    }

    static hash(timestamp: number | string, lastHAsh: string, data: any, nonce: number) {
        return SHA256(`${timestamp}${lastHAsh}${data}${nonce}`).toString();
    }

    static blockHash(block: Block) {
      const {hash, lastHash, data,timestamp, nonce} = block;
      return Block.hash(timestamp, lastHash, data, nonce);
    }
}

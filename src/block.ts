import {SHA256} from 'crypto-js';

export class Block {
    constructor(public timestamp: string | number,
                public lastHash: string,
                public hash: string,
                public data: any) {
    }

    toString() {
        return `
        Block
        Timestamp: ${this.timestamp}
        Lasthash: ${this.lastHash.substring(0, 10)}
        Hash: ${this.hash.substring(0, 10)}
        Data: ${this.data.toString()}
        `;
    }

    static genesis() {
        return new this('Gensis time', '------', 'f1r57-h45h', [])
    }

    static mineBlock(lastBlock: Block, data: any) {
        const now = Date.now();
        const lastHash = lastBlock.hash;
        const hash = Block.hash(now, lastHash, data);

        return new this(now, lastHash, hash, data);
    }

    static hash(timestamp: number, lastHAsh: string, data: any) {
        return SHA256(`${timestamp}${lastHAsh}${data}`).toString();
    }
}
import {SHA256} from 'crypto-js';
import {DIFFICULTY, MINE_RATE} from "../app/config";

export class Block {
    constructor(public timestamp: number,
                public lastHash: string,
                public hash: string,
                public data: any,
                public nonce: number,
                public difficulty = DIFFICULTY) {
    }

    toString() {
        return `
        Block
        Timestamp: ${this.timestamp}
        Lasthash: ${this.lastHash.substring(0, 10)}
        Hash: ${this.hash.substring(0, 10)}
        Nonce: ${this.nonce}
        Difficulty: ${this.difficulty}
        Data: ${this.data.toString()}
        `;
    }

    static genesis() {
        return new this(0, '------', 'f1r57-h45h', [], 0, DIFFICULTY)
    }

    static mineBlock(lastBlock: Block, data: any) {
        let nonce = 0;
        let hash, now;
        const lastHash = lastBlock.hash;
        let {difficulty} = lastBlock;
        do {
            now = Date.now();
            nonce++;
            difficulty = Block.adjustDifficulty(lastBlock, now);
            hash = Block.hash(now, lastHash, data, nonce, difficulty);
        }while (hash.substring(0, difficulty) !== '0'.repeat(difficulty));

        return new this(now, lastHash, hash, data, nonce, difficulty);
    }

    static hash(timestamp: number | string, lastHAsh: string, data: any, nonce: number, difficulty: number) {
        return SHA256(`${timestamp}${lastHAsh}${data}${nonce}${difficulty}`).toString();
    }

    static blockHash(block: Block) {
      const {hash, lastHash, data,timestamp, nonce, difficulty} = block;
      return Block.hash(timestamp, lastHash, data, nonce, difficulty);
    }

    static adjustDifficulty(lastBlock: Block, currentTime: number) {
        let {difficulty} = lastBlock;
        difficulty = lastBlock.timestamp + MINE_RATE > currentTime
            ? difficulty + 1
            : difficulty - 1;

        return difficulty < 0 ? 0 : difficulty;
    }
}

import {Block} from "./block";

export class Blockchain {
    chain = [Block.genesis()];
    constructor() {}

    addBlock(data: any): Block {
        const block = Block.mineBlock(this.lastBlock, data);
        this.chain.push(block);
        return block;
    }

    public get lastIndex() {
        return this.chain.length - 1;
    }

    public get lastBlock() {
        return this.chain[this.lastIndex];
    }
}
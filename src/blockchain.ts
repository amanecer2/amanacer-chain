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

    isValidChain(chain: Block[]) {
      if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) {return false}

     for (let i = 1; i < chain.length; i++) {
        const block = chain[i];
        const lastBlock = chain[i - 1];

        if (block.hash !== lastBlock.lastHash || block.hash !== Block.blockHash(block)) { return false; }
     }

     return true;
    }

    replaceChain(newChain: Block[]) {
      if (newChain.length <= this.chain.length) {
        console.log('the leangth is lower than the current one');
        return;
      }
      if (!this.isValidChain(newChain)) {
        console.log('the received chain is invalid');
        return;
      }

      console.log('replacing the old chain with the new one chain');
      this.chain = newChain;
    }
}

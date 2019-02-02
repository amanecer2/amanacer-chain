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
      if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) {
          console.log('the stringify is not good');
          console.log('JSON.stringify(chain[0])', JSON.stringify(chain[0]))
          console.log('JSON.stringify(Block.genesis())', JSON.stringify(Block.genesis()))
          return false
      }

     for (let i = 1; i < chain.length; i++) {
        const block = chain[i];
        const lastBlock = chain[i - 1];

        if (block.lastHash !== lastBlock.hash) { console.log('isValidChain -> block.hash !== lastBlock.lastHash '); return false; }
        if (block.hash !== Block.blockHash(block)) {

            console.log('isValidChain -> block.hash !== Block.blockHash(block)');
            console.log('block.hash', block.hash)
            console.log('Block.blockHash(block)', Block.blockHash(block))
            return false;
        }
     }

     return true;
    }

    replaceChain(newChain: Block[]) {
      if (newChain.length <= this.chain.length) {
        console.log('the leangth is lower than the current one');
        return false;
      }
      if (!this.isValidChain(newChain)) {
        console.log('the received chain is invalid');
        return false;
      }

      console.log('replacing the old chain with the new one chain');
      this.chain = newChain;
      return true
    }
}

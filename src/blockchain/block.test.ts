
import {Block} from "./block";
import {MINE_RATE} from "../app/config";

describe('Block', () => {
    let data: any, lastBlock: Block, block: Block;
    beforeEach(() => {
        data = 'foo';
        lastBlock = Block.genesis();
        block = Block.mineBlock(lastBlock, data);
    });

    it('set the `data` to match the input', () =>{
        expect(block.data).toEqual(data)
    });

    it('set the `lastHash` to match the last hash', () =>{
        expect(block.lastHash).toEqual(lastBlock.hash)
    });

    it('lower the difficulty for slowly mine rate', () =>{
        expect(Block.adjustDifficulty(block, block.timestamp + 2 * MINE_RATE)).toEqual(block.difficulty - 1)
    });
    it('higher the difficulty for high mine rate', () =>{
        expect(Block.adjustDifficulty(block, block.timestamp +  MINE_RATE / 2)).toEqual(block.difficulty + 1)
    });

});
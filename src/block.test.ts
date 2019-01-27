
import {Block} from "./block";

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

});
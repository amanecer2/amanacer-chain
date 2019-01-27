import {Block} from "./block";

const tryBlock = Block.mineBlock(Block.genesis(), 'test');

console.log(tryBlock.toString());
import {Block} from "./block";
import {Blockchain} from "./blockchain";

describe('Block chain', () => {
  let blockchain: Blockchain;
  let blockchain2: Blockchain;

  beforeEach(() => {
    blockchain = new Blockchain();
    blockchain2 = new Blockchain();
  });

  it('start with genesis', () => {
      expect(blockchain.chain[0]).toEqual(Block.genesis())
  });

  it('add block to the last', () => {
    const data = 'shahar';
    blockchain.addBlock(data);

    expect(blockchain.lastBlock.data).toEqual(data);
  });

  it('valid the bplock chain', () => {
    blockchain.addBlock('shahar');

    const isValid = blockchain.isValidChain(blockchain2.chain);

    expect(isValid).toBe(true);
  });

  it('INVALID GENESIS', () => {
    blockchain2.chain[0].data = 'vad genesis!';
    //blockchain.addBlock('shahar');

    const isValid = blockchain.isValidChain(blockchain2.chain);

    expect(isValid).toBe(false);
  });

  it('invalidated corrupt chain', () => {
    blockchain2.addBlock('shahar');
    blockchain2.chain[1].data = 'vad genesis!';

    const isValid = blockchain.isValidChain(blockchain2.chain);

    expect(isValid).toBe(false);
  });

});

import {INITINAL_BALANCE} from "../app/config";
import {ChainUtills} from "../chain.utills";

export class Wallet {
    keyPair = ChainUtills.genKeyPair();
    balance = INITINAL_BALANCE;
    publicKey = this.keyPair.getPublic().encode('hex');

    constructor(){}

    toString() {
        return `
        Wallet -
        balance - ${this.balance};
        public key: ${this.publicKey};
        `
    }
}
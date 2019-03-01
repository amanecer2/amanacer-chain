import * as EC from 'elliptic';
import {v1} from "uuid";

const ec = new EC.ec('secp256k1');
export class ChainUtills {
    static genKeyPair() {
        return ec.genKeyPair();
    }
    static id() {
        return v1();
    }
}
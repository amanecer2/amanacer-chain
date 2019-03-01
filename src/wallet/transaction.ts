import {ChainUtills} from "../chain.utills";
import {Wallet} from "./index";

export class Transaction {
    id = ChainUtills.id();
    input = null;
    output = [] as { address: string, amount: number }[];

    static newTransaction(senderWallet: Wallet, recipient: string, amount: number)
        : Transaction | void {
        const transaction = new this();

        if (amount > senderWallet.balance) {
            console.log(`the amount ${amount} is heigher the current balnace`)
            return;
        }

        transaction.output.push(
            ...[
                {
                    amount: senderWallet.balance - amount,
                    address: senderWallet.publicKey
                },
                {
                    amount,
                    address: recipient
                }
            ]
        );
        return transaction;
    }

    constructor() {
    }
}
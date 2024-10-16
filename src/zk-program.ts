import {
    ZkProgram,
    Crypto,
    createEcdsaV2,
    Bool,
    createForeignCurveV2
} from 'o1js';
import { Bytes32 } from './transgate-zkApp-sdk';

class Secp256k1 extends createForeignCurveV2(Crypto.CurveParams.Secp256k1) { }
class Ecdsa extends createEcdsaV2(Secp256k1) { }

const ZkPassVerifyZkProgram = ZkProgram({
    name: 'zk-pass-ethers',
    publicInput: Bytes32,
    publicOutput: Bool,

    methods: {
        verifyEthers: {
            privateInputs: [Ecdsa, Secp256k1],
            async method(message: Bytes32, signature: Ecdsa, publicKey: Secp256k1) {
                return signature.verifyEthers(message, publicKey);
            },
        },
    },
});

export { Secp256k1, Ecdsa, Bytes32, ZkPassVerifyZkProgram };
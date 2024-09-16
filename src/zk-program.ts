import {
    ZkProgram,
    Crypto,
    createEcdsaV2,
    Bool,
    Bytes,
    createForeignCurveV2
} from 'o1js';

class Secp256k1 extends createForeignCurveV2(Crypto.CurveParams.Secp256k1) { }
class Ecdsa extends createEcdsaV2(Secp256k1) { }
class Bytes66 extends Bytes(66) { }

const ZkPassVerifyZkProgram = ZkProgram({
    name: 'zk-pass-ethers',
    publicInput: Bytes66,
    publicOutput: Bool,

    methods: {
        verifyEthers: {
            privateInputs: [Ecdsa, Secp256k1],
            async method(message: Bytes66, signature: Ecdsa, publicKey: Secp256k1) {
                return signature.verifyEthers(message, publicKey);
            },
        },
    },
});

export { Secp256k1, Ecdsa, Bytes66, ZkPassVerifyZkProgram };
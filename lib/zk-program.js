"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZkPassVerifyZkProgram = exports.Bytes32 = exports.Ecdsa = exports.Secp256k1 = void 0;
const o1js_1 = require("o1js");
const transgate_zkApp_sdk_1 = require("./transgate-zkApp-sdk");
Object.defineProperty(exports, "Bytes32", { enumerable: true, get: function () { return transgate_zkApp_sdk_1.Bytes32; } });
class Secp256k1 extends (0, o1js_1.createForeignCurveV2)(o1js_1.Crypto.CurveParams.Secp256k1) {
}
exports.Secp256k1 = Secp256k1;
class Ecdsa extends (0, o1js_1.createEcdsaV2)(Secp256k1) {
}
exports.Ecdsa = Ecdsa;
const ZkPassVerifyZkProgram = (0, o1js_1.ZkProgram)({
    name: 'zk-pass-ethers',
    publicInput: transgate_zkApp_sdk_1.Bytes32,
    publicOutput: o1js_1.Bool,
    methods: {
        verifyEthers: {
            privateInputs: [Ecdsa, Secp256k1],
            async method(message, signature, publicKey) {
                return signature.verifyEthers(message, publicKey);
            },
        },
    },
});
exports.ZkPassVerifyZkProgram = ZkPassVerifyZkProgram;

"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransgateZkAppSdk = exports.Bytes12 = exports.Bytes20 = exports.Bytes32 = void 0;
const transgate_js_sdk_1 = __importDefault(require("@zkpass/transgate-js-sdk"));
const ethers = __importStar(require("ethers"));
const o1js_1 = require("o1js");
class Bytes32 extends (0, o1js_1.Bytes)(32) {
}
exports.Bytes32 = Bytes32;
class Bytes20 extends (0, o1js_1.Bytes)(20) {
}
exports.Bytes20 = Bytes20;
class Bytes12 extends (0, o1js_1.Bytes)(12) {
}
exports.Bytes12 = Bytes12;
/**
 * @description TransgateZkAppSdk is the extension of TransgateConnect that allows easily integrate zkPass proofs
 * into Mina/o1js ecosystem
 */
class TransgateZkAppSdk extends transgate_js_sdk_1.default {
    constructor(appid) {
        super(appid);
        /**
         *
         * @description Extract allocator's public key based on the payload
         * @returns string
         */
        this.recoverAllocatorPublicKey = (taskId, schemaId, validator, allocatorSignature) => {
            const hashedMessage = ethers.utils.keccak256(ethers.utils.defaultAbiCoder.encode(["bytes32", "bytes32", "address"], [taskId, schemaId, validator]));
            const prefixedHash = this.prefixed(hashedMessage);
            const publicKey = ethers.utils.recoverPublicKey(prefixedHash, allocatorSignature);
            return publicKey;
        };
        /**
         *
         * @description Extract validator's public key based on the payload
         * @returns string
         */
        this.recoverValidatorPublicKey = (taskId, schemaId, uHash, publicFieldsHash, validatorSignature, recipient) => {
            // Step 1: Hash the taskId, schemaId, and validator using keccak256
            const types = ["bytes32", "bytes32", "bytes32", "bytes32"];
            const values = [taskId, schemaId, uHash, publicFieldsHash];
            if (recipient) {
                types.push("address");
                values.push(recipient);
            }
            const hashedMessage = ethers.utils.keccak256(ethers.utils.defaultAbiCoder.encode(types, values));
            const prefixedHash = this.prefixed(hashedMessage);
            const publicKey = ethers.utils.recoverPublicKey(prefixedHash, validatorSignature);
            return publicKey;
        };
        /**
         * @description alternative for ethers.utils.defaultAbiCoder.encode.
         * Returns keccak Bytes32 hash of data that should be validated
         * @returns Bytes32
         */
        this.hashAllocatorPayload = (taskId, schemaId, address) => {
            let _taskId = null;
            let _schemaId = null;
            let _address = null;
            if (taskId.length === 66)
                _taskId = taskId.slice(2);
            if (taskId.length === 64)
                _taskId = taskId;
            if (!_taskId)
                throw new Error('Wrong taskId length. It should be 32 bytes value');
            if (schemaId.length === 66)
                _schemaId = schemaId.slice(2);
            if (schemaId.length === 64)
                _schemaId = schemaId;
            if (!_schemaId)
                throw new Error('Wrong schemaId length. It should be 32 bytes value');
            if (address.length === 42)
                _address = address.slice(2);
            if (address.length === 40)
                _address = address;
            if (!_address)
                throw new Error('Wrong taskId length. It should be 20 bytes value');
            // in ethers.utils.defaultAbiCoder.encode in case of address cast to bytes32, emtpy bytes in the start of array, where in o1js Bytes empty bytes in the end
            const payloadBytes96 = o1js_1.Bytes.from(new Uint8Array([...Bytes32.fromHex(_taskId).toBytes(), ...Bytes32.fromHex(_schemaId).toBytes(), ...Bytes12.from([0]).toBytes(), ...Bytes20.fromHex(_address).toBytes()]));
            return o1js_1.Keccak.ethereum(payloadBytes96);
        };
        /**
         * @description alternative for ethers.utils.defaultAbiCoder.encode.
         * Returns keccak Bytes32 hash of data that should be validated
         * @returns Bytes32
         */
        this.hashValidatorPayload = (taskId, schemaId, uHash, publicFieldsHash, recipient) => {
            let _taskId = null;
            let _schemaId = null;
            let _uHash = null;
            let _publicFieldsHash = null;
            let _recipient = null;
            if (taskId.length === 66)
                _taskId = taskId.slice(2);
            if (taskId.length === 64)
                _taskId = taskId;
            if (!_taskId)
                throw new Error('Wrong taskId length. It should be 32 bytes value');
            if (schemaId.length === 66)
                _schemaId = schemaId.slice(2);
            if (schemaId.length === 64)
                _schemaId = schemaId;
            if (!_schemaId)
                throw new Error('Wrong schemaId length. It should be 32 bytes value');
            if (uHash.length === 66)
                _uHash = uHash.slice(2);
            if (uHash.length === 64)
                _uHash = uHash;
            if (!_uHash)
                throw new Error('Wrong uHash length. It should be 32 bytes value');
            if (publicFieldsHash.length === 66)
                _publicFieldsHash = publicFieldsHash.slice(2);
            if (publicFieldsHash.length === 64)
                _publicFieldsHash = publicFieldsHash;
            if (!_publicFieldsHash)
                throw new Error('Wrong publicFieldsHash length. It should be 32 bytes value');
            if (publicFieldsHash.length === 66)
                _publicFieldsHash = publicFieldsHash.slice(2);
            if (publicFieldsHash.length === 64)
                _publicFieldsHash = publicFieldsHash;
            if (!_publicFieldsHash)
                throw new Error('Wrong publicFieldsHash length. It should be 32 bytes value');
            if (recipient?.length === 42)
                _recipient = recipient.slice(2);
            if (recipient?.length === 40)
                _recipient = recipient;
            // in ethers.utils.defaultAbiCoder.encode in case of address cast to bytes32, emtpy bytes in the start of array, where in o1js Bytes empty bytes in the end
            let payload = o1js_1.Bytes.from(new Uint8Array([...Bytes32.fromHex(_taskId).toBytes(), ...Bytes32.fromHex(_schemaId).toBytes(), ...Bytes32.fromHex(_uHash).toBytes(), ...Bytes32.fromHex(_publicFieldsHash).toBytes()]));
            if (_recipient) {
                payload = o1js_1.Bytes.from(new Uint8Array([...payload.toBytes(), ...Bytes12.from([0]).toBytes(), ...Bytes20.fromHex(_recipient).toBytes()]));
            }
            return o1js_1.Keccak.ethereum(payload);
        };
        this.secp256k1 = (0, o1js_1.createForeignCurveV2)(o1js_1.Crypto.CurveParams.Secp256k1);
        this.ecdsa = (0, o1js_1.createEcdsaV2)(this.secp256k1);
    }
    /**
     * @description Verify if the allocator and validator signed the proof
     * @returns Bool
     */
    verifyProof(payload) {
        return (0, o1js_1.Bool)(this.verifyAllocator(payload).toBoolean() && this.verifyValidator(payload).toBoolean());
    }
    /**
     * @description Verify if the allocator signed the proof
     * @returns Bool
     */
    verifyAllocator(payload) {
        const { taskId, schemaId, validator, allocatorSignature } = payload;
        const recoveredPublicKey = this.recoverAllocatorPublicKey(taskId, schemaId, validator, allocatorSignature);
        const publicKey = this.secp256k1.fromEthers(recoveredPublicKey);
        const signature = this.ecdsa.fromHex(allocatorSignature);
        const hashedPayload = this.hashAllocatorPayload(taskId, schemaId, validator);
        return signature.verifyEthers(hashedPayload, publicKey);
    }
    /**
     * @description Verify if the validator signed the proof
     * @returns Bool
     */
    verifyValidator(payload) {
        const { taskId, schemaId, uHash, publicFieldsHash, validator, validatorSignature, recipient } = payload;
        const recoveredPublicKey = this.recoverValidatorPublicKey(taskId, schemaId, uHash, publicFieldsHash, validatorSignature, recipient);
        const publicKey = this.secp256k1.fromEthers(recoveredPublicKey);
        const signature = this.ecdsa.fromHex(validatorSignature);
        const hashedPayload = this.hashValidatorPayload(taskId, schemaId, uHash, publicFieldsHash, recipient);
        return signature.verifyEthers(hashedPayload, publicKey);
    }
    prefixed(hash) {
        return ethers.utils.keccak256(ethers.utils.solidityPack(["string", "bytes32"], ["\x19Ethereum Signed Message:\n32", hash]));
    }
}
exports.TransgateZkAppSdk = TransgateZkAppSdk;

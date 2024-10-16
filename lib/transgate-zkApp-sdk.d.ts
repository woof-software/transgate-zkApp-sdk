import TransgateConnect from '@zkpass/transgate-js-sdk';
import { Verify, VerifyAllocator, VerifyValidator } from "./types";
import { Bool } from "o1js";
declare const Bytes32_base: typeof import("o1js/dist/node/lib/provable/bytes").Bytes;
export declare class Bytes32 extends Bytes32_base {
}
declare const Bytes20_base: typeof import("o1js/dist/node/lib/provable/bytes").Bytes;
export declare class Bytes20 extends Bytes20_base {
}
declare const Bytes12_base: typeof import("o1js/dist/node/lib/provable/bytes").Bytes;
export declare class Bytes12 extends Bytes12_base {
}
/**
 * @description TransgateZkAppSdk is the extension of TransgateConnect that allows easily integrate zkPass proofs
 * into Mina/o1js ecosystem
 */
export declare class TransgateZkAppSdk extends TransgateConnect {
    private secp256k1;
    private ecdsa;
    constructor(appid: string);
    /**
     * @description Verify if the allocator and validator signed the proof
     * @returns Bool
     */
    verifyProof(payload: Verify): Bool;
    /**
     * @description Verify if the allocator signed the proof
     * @returns Bool
     */
    verifyAllocator(payload: VerifyAllocator): Bool;
    /**
     * @description Verify if the validator signed the proof
     * @returns Bool
     */
    verifyValidator(payload: VerifyValidator): Bool;
    /**
     *
     * @description Extract allocator's public key based on the payload
     * @returns string
     */
    protected recoverAllocatorPublicKey: (taskId: string, schemaId: string, validator: string, allocatorSignature: string) => string;
    private prefixed;
    /**
     *
     * @description Extract validator's public key based on the payload
     * @returns string
     */
    recoverValidatorPublicKey: (taskId: string, schemaId: string, uHash: string, publicFieldsHash: string, validatorSignature: string, recipient?: string) => string;
    /**
     * @description alternative for ethers.utils.defaultAbiCoder.encode.
     * Returns keccak Bytes32 hash of data that should be validated
     * @returns Bytes32
     */
    hashAllocatorPayload: (taskId: string, schemaId: string, address: string) => Bytes32;
    /**
     * @description alternative for ethers.utils.defaultAbiCoder.encode.
     * Returns keccak Bytes32 hash of data that should be validated
     * @returns Bytes32
     */
    hashValidatorPayload: (taskId: string, schemaId: string, uHash: string, publicFieldsHash: string, recipient?: string) => Bytes32;
}
export {};

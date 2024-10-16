import TransgateConnect from '@zkpass/transgate-js-sdk'
import { Verify, VerifyAllocator, VerifyValidator } from "./types";
import * as ethers from "ethers";
import { Bool, Bytes, Crypto, Keccak, createEcdsaV2, createForeignCurveV2 } from "o1js";

export class Bytes32 extends Bytes(32) { }
export class Bytes20 extends Bytes(20) { }
export class Bytes12 extends Bytes(12) { }

/**
 * @description TransgateZkAppSdk is the extension of TransgateConnect that allows easily integrate zkPass proofs
 * into Mina/o1js ecosystem
 */
export class TransgateZkAppSdk extends TransgateConnect {
    private secp256k1: ReturnType<typeof createForeignCurveV2>
    private ecdsa: ReturnType<typeof createEcdsaV2>

    constructor(appid: string) {
        super(appid)

        this.secp256k1 = createForeignCurveV2(Crypto.CurveParams.Secp256k1);
        this.ecdsa = createEcdsaV2(this.secp256k1);
    }

    /**
     * @description Verify if the allocator and validator signed the proof
     * @returns Bool
     */
    public verifyProof(payload: Verify): Bool {
        return Bool(this.verifyAllocator(payload).toBoolean() && this.verifyValidator(payload).toBoolean())
    }

    /**
     * @description Verify if the allocator signed the proof
     * @returns Bool
     */
    public verifyAllocator(payload: VerifyAllocator): Bool {
        const { taskId, schemaId, validator, allocatorSignature } = payload
        const recoveredPublicKey = this.recoverAllocatorPublicKey(taskId, schemaId, validator, allocatorSignature)
        const publicKey = this.secp256k1.fromEthers(recoveredPublicKey);
        const signature = this.ecdsa.fromHex(allocatorSignature);
        const hashedPayload = this.hashAllocatorPayload(taskId, schemaId, validator)

        return signature.verifyEthers(hashedPayload, publicKey);
    }

    /**
     * @description Verify if the validator signed the proof
     * @returns Bool
     */
    public verifyValidator(payload: VerifyValidator): Bool {
        const { taskId, schemaId, uHash, publicFieldsHash, validator, validatorSignature, recipient } = payload
        const recoveredPublicKey = this.recoverValidatorPublicKey(taskId, schemaId, uHash, publicFieldsHash, validatorSignature, recipient)
        const publicKey = this.secp256k1.fromEthers(recoveredPublicKey);
        const signature = this.ecdsa.fromHex(validatorSignature);
        const hashedPayload = this.hashValidatorPayload(taskId, schemaId, uHash, publicFieldsHash, recipient)

        return signature.verifyEthers(hashedPayload, publicKey);
    }

    /**
     * 
     * @description Extract allocator's public key based on the payload
     * @returns string
     */
    protected recoverAllocatorPublicKey = (
        taskId: string,
        schemaId: string,
        validator: string,
        allocatorSignature: string
    ): string => {
        const hashedMessage = ethers.utils.keccak256(
            ethers.utils.defaultAbiCoder.encode(
                ["bytes32", "bytes32", "address"],
                [taskId, schemaId, validator]
            )
        );

        const prefixedHash = this.prefixed(hashedMessage);
        const publicKey = ethers.utils.recoverPublicKey(prefixedHash, allocatorSignature);

        return publicKey;
    }

    private prefixed(hash: string): string {
        return ethers.utils.keccak256(
            ethers.utils.solidityPack(
                ["string", "bytes32"],
                ["\x19Ethereum Signed Message:\n32", hash]
            )
        );
    }

    /**
     * 
     * @description Extract validator's public key based on the payload
     * @returns string
     */
    public recoverValidatorPublicKey = (
        taskId: string,
        schemaId: string,
        uHash: string,
        publicFieldsHash: string,
        validatorSignature: string,
        recipient?: string,
    ) => {
        // Step 1: Hash the taskId, schemaId, and validator using keccak256
        const types = ["bytes32", "bytes32", "bytes32", "bytes32"]
        const values = [taskId, schemaId, uHash, publicFieldsHash]

        if (recipient) {
            types.push("address")
            values.push(recipient)
        }

        const hashedMessage = ethers.utils.keccak256(
            ethers.utils.defaultAbiCoder.encode(
                types,
                values
            )
        );

        const prefixedHash = this.prefixed(hashedMessage);
        const publicKey = ethers.utils.recoverPublicKey(prefixedHash, validatorSignature);

        return publicKey;
    }

    /**
     * @description alternative for ethers.utils.defaultAbiCoder.encode. 
     * Returns keccak Bytes32 hash of data that should be validated
     * @returns Bytes32
     */
    public hashAllocatorPayload = (taskId: string, schemaId: string, address: string): Bytes32 => {
        let _taskId = null;
        let _schemaId = null;
        let _address = null;

        if (taskId.length === 66) _taskId = taskId.slice(2)
        if (taskId.length === 64) _taskId = taskId
        if (!_taskId) throw new Error('Wrong taskId length. It should be 32 bytes value')

        if (schemaId.length === 66) _schemaId = schemaId.slice(2)
        if (schemaId.length === 64) _schemaId = schemaId
        if (!_schemaId) throw new Error('Wrong schemaId length. It should be 32 bytes value')

        if (address.length === 42) _address = address.slice(2)
        if (address.length === 40) _address = address
        if (!_address) throw new Error('Wrong taskId length. It should be 20 bytes value')

        // in ethers.utils.defaultAbiCoder.encode in case of address cast to bytes32, emtpy bytes in the start of array, where in o1js Bytes empty bytes in the end
        const payloadBytes96 = Bytes.from(new Uint8Array([...Bytes32.fromHex(_taskId).toBytes(), ...Bytes32.fromHex(_schemaId).toBytes(), ...Bytes12.from([0]).toBytes(), ...Bytes20.fromHex(_address).toBytes()]))

        return Keccak.ethereum(payloadBytes96)
    }

    /**
     * @description alternative for ethers.utils.defaultAbiCoder.encode. 
     * Returns keccak Bytes32 hash of data that should be validated
     * @returns Bytes32
     */
    public hashValidatorPayload = (taskId: string, schemaId: string, uHash: string, publicFieldsHash: string, recipient?: string): Bytes32 => {
        let _taskId = null;
        let _schemaId = null;
        let _uHash = null;
        let _publicFieldsHash = null;
        let _recipient = null;

        if (taskId.length === 66) _taskId = taskId.slice(2)
        if (taskId.length === 64) _taskId = taskId
        if (!_taskId) throw new Error('Wrong taskId length. It should be 32 bytes value')

        if (schemaId.length === 66) _schemaId = schemaId.slice(2)
        if (schemaId.length === 64) _schemaId = schemaId
        if (!_schemaId) throw new Error('Wrong schemaId length. It should be 32 bytes value')

        if (uHash.length === 66) _uHash = uHash.slice(2)
        if (uHash.length === 64) _uHash = uHash
        if (!_uHash) throw new Error('Wrong uHash length. It should be 32 bytes value')

        if (publicFieldsHash.length === 66) _publicFieldsHash = publicFieldsHash.slice(2)
        if (publicFieldsHash.length === 64) _publicFieldsHash = publicFieldsHash
        if (!_publicFieldsHash) throw new Error('Wrong publicFieldsHash length. It should be 32 bytes value')

        if (publicFieldsHash.length === 66) _publicFieldsHash = publicFieldsHash.slice(2)
        if (publicFieldsHash.length === 64) _publicFieldsHash = publicFieldsHash
        if (!_publicFieldsHash) throw new Error('Wrong publicFieldsHash length. It should be 32 bytes value')

        if (recipient?.length === 42) _recipient = recipient.slice(2)
        if (recipient?.length === 40) _recipient = recipient

        // in ethers.utils.defaultAbiCoder.encode in case of address cast to bytes32, emtpy bytes in the start of array, where in o1js Bytes empty bytes in the end
        let payload = Bytes.from(new Uint8Array([...Bytes32.fromHex(_taskId).toBytes(), ...Bytes32.fromHex(_schemaId).toBytes(), ...Bytes32.fromHex(_uHash).toBytes(), ...Bytes32.fromHex(_publicFieldsHash).toBytes()]))

        if (_recipient) {
            payload = Bytes.from(new Uint8Array([...payload.toBytes(), ...Bytes12.from([0]).toBytes(), ...Bytes20.fromHex(_recipient).toBytes()]))
        }

        return Keccak.ethereum(payload)
    }
}

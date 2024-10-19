import { EcdsaSignatureV2, ForeignCurveV2 } from "o1js";
import { Bytes32 } from "./zk-program";

export type ZkPassMockPayload = {
    signature: EcdsaSignatureV2;
    publicKey: ForeignCurveV2;
    message: Bytes32;
    zkPassData: Verify;
}

export interface Result {
    allocatorAddress: string;
    allocatorSignature: string;
    publicFields: any[];
    publicFieldsHash: string;
    taskId: string;
    uHash: string;
    validatorAddress: string;
    validatorSignature: string;
    recipient?: string;
}

export type VerifyAllocator = {
    taskId: string,
    schemaId: string,
    validator: string,
    allocatorSignature: string,
}

export type VerifyValidator = {
    taskId: string,
    schemaId: string,
    validatorSignature: string,
    uHash: string,
    recipient?: string,
    publicFieldsHash: string,
    validator: string,
}

export type Verify = VerifyAllocator & VerifyValidator 
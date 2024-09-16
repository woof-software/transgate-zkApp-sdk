import { EcdsaSignature, ForeignCurve } from "o1js";
import { Bytes66 } from "./zk-program";

export type ZkPassPayloadToVerify = {
    signature: EcdsaSignature;
    publicKey: ForeignCurve;
    message: Bytes66;
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

export type VerifySignatureZkAppPayload = {
    taskId: string,
    schemaId: string
    uHash: string
    publicFieldsHash: string
    validatorSignature: string
    validatorAddress: string
}

export type VerifySignatureZkAppPayloadWithPublicKey = VerifySignatureZkAppPayload & {
    publicKey: string;
}
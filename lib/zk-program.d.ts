import { Bytes32 } from './transgate-zkApp-sdk';
declare const Secp256k1_base: typeof import("o1js").ForeignCurveV2;
declare class Secp256k1 extends Secp256k1_base {
}
declare const Ecdsa_base: typeof import("o1js").EcdsaSignatureV2;
declare class Ecdsa extends Ecdsa_base {
}
declare const ZkPassVerifyZkProgram: {
    name: string;
    compile: (options?: {
        cache?: import("o1js").Cache;
        forceRecompile?: boolean;
        proofsEnabled?: boolean;
    }) => Promise<{
        verificationKey: {
            data: string;
            hash: import("o1js").Field;
        };
    }>;
    verify: (proof: import("o1js").Proof<import("o1js/dist/node/lib/provable/bytes").Bytes, import("o1js/dist/node/lib/provable/bool").Bool>) => Promise<boolean>;
    digest: () => Promise<string>;
    analyzeMethods: () => Promise<{
        verifyEthers: {
            rows: number;
            digest: string;
            gates: import("o1js/dist/node/snarky").Gate[];
            publicInputSize: number;
            print(): void;
            summary(): Partial<Record<import("o1js/dist/node/snarky").GateType | "Total rows", number>>;
        };
    }>;
    publicInputType: import("o1js/dist/node/lib/provable/types/struct").ProvablePureExtended<import("o1js/dist/node/lib/provable/bytes").Bytes, {
        bytes: {
            value: bigint;
        }[];
    }, {
        bytes: {
            value: string;
        }[];
    }>;
    publicOutputType: typeof import("o1js/dist/node/lib/provable/bool").Bool & ((x: boolean | import("o1js/dist/node/lib/provable/core/fieldvar").FieldVar | import("o1js/dist/node/lib/provable/bool").Bool) => import("o1js/dist/node/lib/provable/bool").Bool);
    privateInputTypes: {
        verifyEthers: [typeof Ecdsa, typeof Secp256k1];
    };
    rawMethods: {
        verifyEthers: (publicInput: import("o1js/dist/node/lib/provable/bytes").Bytes, ...args: [import("o1js").EcdsaSignature, import("o1js").ForeignCurve] & any[]) => Promise<import("o1js/dist/node/lib/provable/bool").Bool>;
    };
    proofsEnabled: boolean;
    setProofsEnabled(proofsEnabled: boolean): void;
} & {
    verifyEthers: (publicInput: import("o1js/dist/node/lib/provable/bytes").Bytes, ...args: [import("o1js").EcdsaSignature, import("o1js").ForeignCurve] & any[]) => Promise<import("o1js").Proof<import("o1js/dist/node/lib/provable/bytes").Bytes, import("o1js/dist/node/lib/provable/bool").Bool>>;
};
export { Secp256k1, Ecdsa, Bytes32, ZkPassVerifyZkProgram };

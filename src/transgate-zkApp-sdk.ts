
import { ZkPassVerifyZkProgram } from "./zk-program";
import TransgateConnect from '@zkpass/transgate-js-sdk'
import { createMockData } from "./example/mock-data";
import { VerifySignatureZkAppPayload, VerifySignatureZkAppPayloadWithPublicKey } from "./types";

export class TransgateZkAppSdk extends TransgateConnect {
    async verifyZkAppOracle(data: VerifySignatureZkAppPayload) {
        // Will we receive publicKey, or should we source it from data ?
        // const pubKey = this.getPublicKey(data)

        // compile off-chain zkApp
        await ZkPassVerifyZkProgram.compile();

        // transform input data into o1js data
        const { message, signature, publicKey } = await createMockData()

        let proofE = await ZkPassVerifyZkProgram.verifyEthers(message, signature, publicKey);

        return ZkPassVerifyZkProgram.verify(proofE)
    }

    async verifyZkAppOracleWithPublicKey(
        data: VerifySignatureZkAppPayloadWithPublicKey
    ) {
        // transform input data into o1js data
        const { message, signature, publicKey } = await createMockData()

        let proofE = await ZkPassVerifyZkProgram.verifyEthers(message, signature, publicKey);

        return ZkPassVerifyZkProgram.verify(proofE)
    }
}

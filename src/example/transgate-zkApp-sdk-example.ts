import { Result } from "ethers/lib/utils"
import { TransgateZkAppSdk } from "../transgate-zkApp-sdk"

const app = async () => {
    const appid = 'appid'
    const schemaId = 'schemaId'

    const connector = new TransgateZkAppSdk(appid)

    const isAvailable = await connector.isTransgateAvailable()
    if (!isAvailable) {
        return alert("Please install zkPass TransGate")
    }

    const res = await connector.launch(schemaId) as Result

    const isVerified = await connector.verifyZkAppOracle({
        taskId: res.taskId,
        schemaId: schemaId,
        uHash: res.uHash,
        publicFieldsHash: res.publicFieldsHash,
        validatorSignature: res.validatorSignature,
        validatorAddress: res.validatorAddress
    })

    return isVerified
}

(async () => await app())()


// import { Result } from "ethers/lib/utils"
import { TransgateZkAppSdk } from "../transgate-zkApp-sdk"
import { createMockData } from "./mock-data"

const app = async () => {
    const appid = 'appid'
    // const schemaId = 'schemaId'

    const connector = new TransgateZkAppSdk(appid)
    // const isAvailable = await connector.isTransgateAvailable()
    // if (!isAvailable) {
    //     return alert("Please install zkPass TransGate")
    // }

    // const res = await connector.launch(schemaId) as Result
    const res = createMockData()

    const isVerified = connector.verifyProof(res.zkPassData)

    console.log({ isVerified: isVerified.toBoolean() })
}

(async () => await app())()


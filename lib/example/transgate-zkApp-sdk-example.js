"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import { Result } from "ethers/lib/utils"
const transgate_zkApp_sdk_1 = require("../transgate-zkApp-sdk");
const mock_data_1 = require("./mock-data");
const app = async () => {
    const appid = 'appid';
    // const schemaId = 'schemaId'
    const connector = new transgate_zkApp_sdk_1.TransgateZkAppSdk(appid);
    // const isAvailable = await connector.isTransgateAvailable()
    // if (!isAvailable) {
    //     return alert("Please install zkPass TransGate")
    // }
    // const res = await connector.launch(schemaId) as Result
    const res = (0, mock_data_1.createMockData)();
    const isVerified = connector.verifyProof(res.zkPassData);
    console.log({ isVerified: isVerified.toBoolean() });
};
(async () => await app())();

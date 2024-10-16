import { Bytes32, Ecdsa, Secp256k1 } from "../zk-program";
import { Verify, ZkPassMockPayload } from "../types";

export const createMockData = (sig?: string, pubKey?: string, msg?: string): ZkPassMockPayload => {
    const m = msg || '0x63b06c6b5ae8b07808026c5defeca8986e4308776939b0e2c06da7a9b694bfa3'

    const s = sig || "0x627978221160b879a4aae32225a977e0bcef5e6a9ef39104c320668d8d6ef9423258609fdb5f624f248cc613c32b8724c0ee112684a049528d2d03e1bc586f6a1c"
    const p = pubKey || '0x0420d784a7ff57ee063ff3357f22f9215595107bf1037898e420440d0affa2a372bae9842c6311f817e915acb72bca92397c3ccd8644fba09e10120950249fa4c1'

    const publicKey = Secp256k1.fromEthers(p)
    const signature = Ecdsa.fromHex(s)
    const message = Bytes32.fromHex(m.slice(2))

    const zkPassData: Verify = {
        allocatorSignature: "0x627978221160b879a4aae32225a977e0bcef5e6a9ef39104c320668d8d6ef9423258609fdb5f624f248cc613c32b8724c0ee112684a049528d2d03e1bc586f6a1c",
        taskId: "0x6236383764316638356330303435626561393436313435376564393731666339",
        schemaId: "0x3737336238623466663462633438313262363931613532336231363461336630",
        validatorSignature: "0x6d175cacf63017999169cc343d6cfb8961196409209f9f325f8faebf80fb2b8d16e289d2ed75ffdaa39eed17c472f5c8e222fca911615e1659a61d1f3a8ec9181c",
        uHash: "0x55b75182ef20ef3789ba2f89fd8209a1e78218757bdec977ad11eae99a976622",
        recipient: "0x2501713A67a3dEdde090E42759088A7eF37D4EAb",
        publicFieldsHash: "0xc89efdaa54c0f20c7adf612882df0950f5a951637e0307cdcb4c672f298b8bc6",
        validator: "0xb1C4C1E1Cdd5Cf69E27A3A08C8f51145c2E12C6a",
    }

    return { signature, publicKey, message, zkPassData: zkPassData }
}
import { Bytes66, Ecdsa, Secp256k1 } from "../zk-program";
import { ZkPassPayloadToVerify } from "../types";

export const createMockData = async (s?: string, p?: string, m?: string): Promise<ZkPassPayloadToVerify> => {
    const message = m || 'Hello. this is zkPass proof. it has string of 66 characters. GL!!!'
    const pk = "0xbf8908b56d9d6a8823d819bff373fbac14d56ac737bb77fdf15ac732049ee7c6"

    // const wallet = new Wallet(pk)
    // const signature = await wallet.signMessage(message);
    const signature = s || "0x4fbfd655c1cd4632f1b1dea8c344f1160342f062caf897d1a60213f1c87786f45c299c313971fc6f5edfed0fcef628973e68185c71e07d83a2eed288b50814271b"

    // const publicKey = utils.computePublicKey(
    //     utils.arrayify(wallet.publicKey),
    //     true
    // );
    const publicKey = p || "0x033523ddadfbacc4fc63e746c2132b520c97ba62228ef46abedab2e002982faf0c"

    return { signature: Ecdsa.fromHex(signature), publicKey: Secp256k1.fromEthers(publicKey), message: Bytes66.fromString(message) }
}

// TODO: remove
export const createCommonMockData = (): { signature: string, publicKey: string, message: string } => {
    const message = 'Hello. this is zkPass proof. it has string of 66 characters. GL!!!';
    const pk = "0xbf8908b56d9d6a8823d819bff373fbac14d56ac737bb77fdf15ac732049ee7c6"
    const signature = "0x4fbfd655c1cd4632f1b1dea8c344f1160342f062caf897d1a60213f1c87786f45c299c313971fc6f5edfed0fcef628973e68185c71e07d83a2eed288b50814271b"
    const publicKey = "0x033523ddadfbacc4fc63e746c2132b520c97ba62228ef46abedab2e002982faf0c"

    return { signature, publicKey, message }
}

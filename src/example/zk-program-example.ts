import { assert } from 'console';
import { ZkPassVerifyZkProgram } from '../zk-program';
import { createMockData } from './mock-data';

const main = async () => {
    // compile and prove zk
    console.time('ecdsa / ethers verify (compile)');
    await ZkPassVerifyZkProgram.compile();
    console.timeEnd('ecdsa / ethers verify (compile)');
    const { message, signature, publicKey } = await createMockData()

    console.time('ecdsa / ethers verify (prove)');
    let proofE = await ZkPassVerifyZkProgram.verifyEthers(message, signature, publicKey);
    console.timeEnd('ecdsa / ethers verify (prove)');

    proofE.publicOutput.assertTrue('signature verifies');
    assert(await ZkPassVerifyZkProgram.verify(proofE), 'proof verifies');
}

main().then().catch(console.error)
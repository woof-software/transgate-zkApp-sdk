# Transgate o1js SDK

The Transgate o1js-SDK is a utility package for [Transgate](https://chromewebstore.google.com/detail/zkpass-transgate/afkoofjocpbclhnldmmaphappihehpma) and [Transage-SDD](https://github.com/zkPassOfficial/Transgate-JS-SDK/blob/master/README.md) that enables developers to easily launch Transgate and compatible with o1js.

## Register an develop account

Please register an account on the [zkPass Dev Center](https://dev.zkpass.org) and create a project. Then you can add schemas for your project.

## Installation

You can install the package either using [NPM]TODO or using [Yarn]TODO

### Using NPM

TODO

### Using Yarn

TODO

### Example
```bash
import TransgateConnect from '@zkpass/transgate-js-sdk'

const requestVerifyMessage = async () =>{
  try{
    const appid = "8fb9d43c-2f24-424e-a98d-7ba34a5532f5" //Locate this form on the development platform

    const connector = new TransgateConnect(appid)
    const isAvailable = await connector.isTransgateAvailable()

    if(isAvailable){
      //The schema ID that you add for the project
      const schemaId = "516a720e-29a4-4307-ae7b-5aec286e446e"

      const res = await connector.launch(schemaId)// This method can be invoked in a loop when dealing with multiple schemas

      // Verification via o1js
      const isVerified = connector.verifyProof(res)

      //You have the flexibility to handle the validation results based on your requirements.        

    }else{
      console.log('Please install zkPass Transgate from https://chromewebstore.google.com/detail/zkpass-transgate/afkoofjocpbclhnldmmaphappihehpma')
    }
  }catch(error){
    console.log('transgate error', error)
  }
}
  
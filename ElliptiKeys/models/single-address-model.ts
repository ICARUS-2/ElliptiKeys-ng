import { ADDRESS_TYPES } from 'lib/address-types';
import Keys from 'lib/keys/Keys';

export default class SingleAddressModel
{
    privateKey: string = "";
    address: string = "";

    static create(isTestnet: boolean, selectedAddressType: string) : SingleAddressModel
    {
        let privateKey: string = "";
        let address: string = "";

        switch(selectedAddressType)
        {
          case ADDRESS_TYPES.legacy:
            
            if (isTestnet)
            {
              privateKey = Keys.GenerateRandomTestnetPrivateKey();
              address = Keys.TestnetPrivateKeyToLegacyAddress(privateKey);
            }
            else
            {
              privateKey = Keys.GenerateRandomPrivateKey();
              address = Keys.PrivateKeyToLegacyAddress(privateKey)
            }
    
            break;
    
          case ADDRESS_TYPES.legacyCompressed:
          
            if (isTestnet)
            {
              privateKey = Keys.GenerateRandomCompressedTestnetPrivateKey();
              address = Keys.TestnetCompressedPrivateKeyToLegacyAddress(privateKey);
            }
            else
            {
              privateKey = Keys.GenerateRandomCompressedPrivateKey();
              address = Keys.CompressedPrivateKeyToLegacyAddress(privateKey)
            }
    
            break;
    
          case ADDRESS_TYPES.segwit:
          
            if (isTestnet)
            {
              privateKey = Keys.GenerateRandomCompressedTestnetPrivateKey();
              address = Keys.TestnetCompressedPrivateKeyToSegwitAddress(privateKey);
            }
            else
            {
              privateKey = Keys.GenerateRandomCompressedPrivateKey();
              address = Keys.CompressedPrivateKeyToSegwitAddress(privateKey)
            }
    
            break;
    
          case ADDRESS_TYPES.bech32:
          
            if (isTestnet)
            {
              privateKey = Keys.GenerateRandomCompressedTestnetPrivateKey();
              address = Keys.TestnetCompressedPrivateKeyToBech32Address(privateKey);
            }
            else
            {
              privateKey = Keys.GenerateRandomCompressedPrivateKey();
              address = Keys.CompressedPrivateKeyToBech32Address(privateKey)
            }
    
            break;
    
        }

        let model = new SingleAddressModel();
        model.address = address;
        model.privateKey = privateKey;

        return model;
    }
}
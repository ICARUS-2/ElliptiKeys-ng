import Keys from './keys/Keys';
import { ADDRESS_TYPES } from './dictionaries/address-types';

export default class KeysHelper
{
    static GetAddressFormat(addr: string)
    {
        if (!Keys.ValidateBitcoinAddress(addr))
        {
            return ""
        }

        if (addr.startsWith('1') || addr.startsWith('m') || addr.startsWith('n'))
            return ADDRESS_TYPES.legacy;

        if (addr.startsWith('2') || addr.startsWith('3'))
            return ADDRESS_TYPES.segwit;

        if (addr.startsWith('bc1q') || addr.startsWith('tb1q'))
            return ADDRESS_TYPES.bech32;

        return ""
    }

    static IsAddressTestnet(addr: string)
    {
        if (!Keys.ValidateBitcoinAddress(addr))
        {
            return false;
        }
        return addr.startsWith("m") || addr.startsWith('n') || addr.startsWith('2') || addr.startsWith('tb1q')
    }

    static IsPrivateKeyTestnet(key: string)
    {
        if (!Keys.ValidatePrivateKey(key))
        {
            return false;
        }

        return key.startsWith("c") || key.startsWith("9")
    }

    static IsPrivateKeyCompressed(key: string)
    {
        if (!Keys.ValidatePrivateKey(key))
        {
            return false;
        }

        return key.startsWith("c") || key.startsWith("L") || key.startsWith("K")
    }
}
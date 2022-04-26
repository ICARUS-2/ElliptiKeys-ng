import CryptoJS from "./crypto-js.js";
import { Point } from "./noble-secp256k1.js";

export default class Keys
{
    static HEX_LENGTH = 64;
    static MAX_PRIVATE_KEY = BigInt("115792089237316195423570985008687907852837564279074904382605163141518161494336")
    static BECH32_CHARS = "qpzry9x8gf2tvdw0s3jn54khce6mua7l"

    static SHA256HexToByteArray(a)
    {
        return CryptoJS.SHA256(CryptoJS.enc.Hex.parse(a)).toString()
    }

    static RIPEMD160HexToByteArray(a)
    {
        return CryptoJS.RIPEMD160(CryptoJS.enc.Hex.parse(a)).toString()
    }

    static BytesToHex(byteArray) {
        return Array.from(byteArray, function(byte) 
        {
            return ('0' + (byte & 0xFF).toString(16)).slice(-2);
        }).join('')
    }

    static HexToBytes(hexString) {
    if (hexString.length % 2 !== 0) {
        throw "Must have an even number of hex digits to convert to bytes";
    }/* w w w.  jav  a2 s .  c o  m*/
    var numBytes = hexString.length / 2;
    var byteArray = new Uint8Array(numBytes);
    for (var i=0; i<numBytes; i++) {
        byteArray[i] = parseInt(hexString.substr(i*2, 2), 16);
    }
    return byteArray;
}

    static Base58Encode(hex_number) {
    const base58 = [1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H','J','K','L','M','N','P','Q','R','S','T','U','V','W','X','Y','Z','a','b','c','d','e','f','g','h','i','j','k','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
    var num = BigInt('0x' + hex_number);
    const fifty8 = BigInt(58);
    var remainder;
    var b58_encoded_buffer = '';
    while (num > 0) {
        remainder = num % fifty8;
        b58_encoded_buffer = base58[remainder] + b58_encoded_buffer;
        num = num/BigInt(58);
    }
    while ( hex_number.match(/^00/) ){
        b58_encoded_buffer = '1' + b58_encoded_buffer;
        hex_number = hex_number.substring(2);
    }
    return b58_encoded_buffer;
}

static Base58DecodeToHex(
    S,            //Base58 encoded string input
    A="123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"             //Base58 characters (i.e. "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz")
) {
    var d = [],   //the array for storing the stream of decoded bytes
        b = [],   //the result byte array that will be returned
        i,        //the iterator variable for the base58 string
        j,        //the iterator variable for the byte array (d)
        c,        //the carry amount variable that is used to overflow from the current byte to the next byte
        n;        //a temporary placeholder variable for the current byte
    for(i in S) { //loop through each base58 character in the input string
        j = 0,                             //reset the byte iterator
        c = A.indexOf( S[i] );             //set the initial carry amount equal to the current base58 digit
        if(c < 0)                          //see if the base58 digit lookup is invalid (-1)
            return undefined;              //if invalid base58 digit, bail out and return undefined
        c || b.length ^ i ? i : b.push(0); //prepend the result array with a zero if the base58 digit is zero and non-zero characters haven't been seen yet (to ensure correct decode length)
        while(j in d || c) {               //start looping through the bytes until there are no more bytes and no carry amount
            n = d[j];                      //set the placeholder for the current byte
            n = n ? n * 58 + c : c;        //shift the current byte 58 units and add the carry amount (or just add the carry amount if this is a new byte)
            c = n >> 8;                    //find the new carry amount (1-byte shift of current byte value)
            d[j] = n % 256;                //reset the current byte to the remainder (the carry amount will pass on the overflow)
            j++                            //iterate to the next byte
        }
    }
    while(j--)               //since the byte array is backwards, loop through it in reverse order
        b.push( d[j] );      //append each byte to the result
    return Keys.BytesToHex(new Uint8Array(b))
}
    static FourBitHexToBinary(hex){
        let s =  ("" + (parseInt(hex, 16)).toString(2)).substr(-8);

        while (s.length != 4)
        {
            s = "0" + s
        }
        return s;
    }

    static BinaryToHex(s) {
    var i, k, part, accum, ret = '';
    for (i = s.length-1; i >= 3; i -= 4) {
        // extract out in substrings of 4 and convert to hex
        part = s.substr(i+1-4, 4);
        accum = 0;
        for (k = 0; k < 4; k += 1) {
            if (part[k] !== '0' && part[k] !== '1') {
                // invalid character
                return { valid: false };
            }
            // compute the length 4 substring
            accum = accum * 2 + parseInt(part[k], 10);
        }
        if (accum >= 10) {
            // 'A' to 'F'
            ret = String.fromCharCode(accum - 10 + 'A'.charCodeAt(0)) + ret;
        } else {
            // '0' to '9'
            ret = String(accum) + ret;
        }
    }
    // remaining characters, i = 0, 1, or 2
    if (i >= 0) {
        accum = 0;
        // convert from front
        for (k = 0; k <= i; k += 1) {
            if (s[k] !== '0' && s[k] !== '1') {
                return { valid: false };
            }
            accum = accum * 2 + parseInt(s[k], 10);
        }
        // 3 bits, value cannot exceed 2^3 - 1 = 7, just convert
        ret = String(accum) + ret;
    }
    return { valid: true, result: ret };
}

    static BinaryToDecimal(bin)
    {
        return parseInt(bin, 2)
    }

    static _GetHexFromPrivateKey(key)
    {
        let decoded = Keys.Base58DecodeToHex(key)
        let hexWithoutChecksum = decoded.substr(0, decoded.length-8)
        let hexWithoutPrefix = hexWithoutChecksum.substr(2, hexWithoutChecksum.length-1)

        let formattedHex = Keys._FormatHexStringLength(hexWithoutPrefix)
        return formattedHex;
    }

    static _MapBech32Char(byte)
    {
        return Keys.BECH32_CHARS[byte];
    }

    static _FormatHexStringLength(s)
    {
        if (s.length == Keys.HEX_LENGTH)
            return s

        let trailingZeroes = '';
        let diff = Keys.HEX_LENGTH - s.length;

        while (trailingZeroes.length < diff)
        {
            trailingZeroes += '0';
        }
        
        return trailingZeroes + s;
    }

    static _PrivateKeyAndVersionToBitcoinKey(privateKeyAndVersion)
    {
        var firstSHA = Keys.SHA256HexToByteArray(privateKeyAndVersion)
        var secondSHA = Keys.SHA256HexToByteArray(firstSHA)
        var checksum = secondSHA.substr(0, 8).toUpperCase()

        var keyWithChecksum = privateKeyAndVersion + checksum

        let bitcoinPrivateKey = Keys.Base58Encode(keyWithChecksum)

        return bitcoinPrivateKey;
    }

    //kimbatt bitcoin generator bech32 library
    static Bech32HrpExpand(hrp) {
        var ret = [];
        for (var i = 0; i < hrp.length; ++i)
            ret.push(hrp.charCodeAt(i) >> 5);
        ret.push(0);
        for (var i = 0; i < hrp.length; ++i)
            ret.push(hrp.charCodeAt(i) & 0x1f);
        return ret;
    }
    static Bech32Polymod(values) {
      var GEN = [0x3b6a57b2, 0x26508e6d, 0x1ea119fa, 0x3d4233dd, 0x2a1462b3];
        var chk = 1;
        for (var i = 0; i < values.length; ++i) {
            var b = chk >> 25;
            chk = ((chk & 0x1ffffff) << 5) ^ values[i];
            for (var j = 0; j < 5; ++j) {
                if ((b >> j) & 1)
                    chk ^= GEN[j];
            }
        }
        return chk;
    }
    static Bech32CreateChecksum(hrp, data) {
      var hrpExpanded = Keys.Bech32HrpExpand(hrp);
        hrpExpanded.push.apply(hrpExpanded, data);
        hrpExpanded.push.apply(hrpExpanded, [0, 0, 0, 0, 0, 0]);
        var polymod = Keys.Bech32Polymod(hrpExpanded) ^ 1;
        var ret = [];
        for (var i = 0; i < 6; ++i)
            ret.push((polymod >> 5 * (5 - i)) & 31);
        return ret;
    }

    static HexToDecimal(hex)
    {
        return parseInt(hexString, 16);
    }

    static BnToHex(bn) {
        var base = 16;
        var hex = BigInt(bn).toString(base);
        if (hex.length % 2) {
            hex = '0' + hex;
        }
        return hex;
    }

    static GenerateRandomPrivateKey()
    {
        var randArr = new Uint8Array(32) 
        window.crypto.getRandomValues(randArr)

        var privateKeyBytes = []
        for (var i = 0; i < randArr.length; ++i)
            privateKeyBytes[i] = randArr[i]

        var privateKeyHex = Keys.BytesToHex(privateKeyBytes).toUpperCase()

        var privateKeyAndVersion = "80" + privateKeyHex

        return Keys._PrivateKeyAndVersionToBitcoinKey(privateKeyAndVersion);
    }

    static GenerateRandomCompressedPrivateKey()
    {
        let randomKey = Keys.GenerateRandomPrivateKey();
        let compressed = Keys.CompressWIF(randomKey)
        
        return compressed
    }

    static GeneratePrivateKeyFromNumber(numStr)
    {
        let num = BigInt(numStr)

        let privateKeyHex = Keys._FormatHexStringLength(BnToHex(num))
        let privateKeyHexAndPrefix = "80" + privateKeyHex;

        return Keys._PrivateKeyAndVersionToBitcoinKey(privateKeyHexAndPrefix);
    }

    static GenerateCompressedPrivateKeyFromNumber(numStr)
    {
        let num = BigInt(numStr)

        let privateKeyHex = _FormatHexStringLength(BnToHex(num))
        let privateKeyHexAndPrefix = "80" + privateKeyHex + "01";

        return Keys._PrivateKeyAndVersionToBitcoinKey(privateKeyHexAndPrefix);
    }

    static GetNumberFromPrivateKey(key)
    {
        let formattedHex = Keys._GetHexFromPrivateKey(key)
        
        return BigInt('0x'+formattedHex)
    }

    static DecompressWIF(compressedKey)
    {
        if (compressedKey.startsWith('5'))
            return compressedKey

        let formattedHex = Keys._GetHexFromPrivateKey(compressedKey);
        formattedHex = formattedHex.substr(0, formattedHex.length -2)
        let k = "80" + formattedHex;
        return Keys._PrivateKeyAndVersionToBitcoinKey(k);
    }

    static CompressWIF(key)
    {
        if (key.startsWith('L') || key.startsWith('K'))
            return key;

        let formattedHex = Keys._GetHexFromPrivateKey(key)
        let k = "80" + formattedHex + "01"
        return Keys._PrivateKeyAndVersionToBitcoinKey(k)
    }

    static PrivateKeyToLegacyAddress(privateKey)
    {
        let formattedHex = Keys._GetHexFromPrivateKey(privateKey);

        let point = Point.fromPrivateKey(formattedHex);
        let xHex = Keys.BnToHex(point.x);
        let yHex = Keys.BnToHex(point.y);

        let concat = "04"+xHex+yHex;
        let sha256Result = Keys.SHA256HexToByteArray(concat);
        let ripemd160Result = Keys.RIPEMD160HexToByteArray(sha256Result)
        
        let publicKeyWithVersion = "00" + ripemd160Result;

        let checksum = Keys.SHA256HexToByteArray(Keys.SHA256HexToByteArray(publicKeyWithVersion)).substr(0,8)

        let publicKeyWithChecksum = publicKeyWithVersion + checksum
        return (Keys.Base58Encode(publicKeyWithChecksum))
    }

    static CompressedPrivateKeyToLegacyAddress(key)
    {
        if (!key.startsWith('K') && !key.startsWith('L'))
            throw new Error("Only compressed keys are supported");

        let formattedHex = Keys._GetHexFromPrivateKey(key)
        formattedHex = formattedHex.substr(0, formattedHex.length - 2)

        let point = Point.fromPrivateKey(formattedHex);
        let xHex = Keys.BnToHex(point.x);
        let yHex = Keys.BnToHex(point.y);

        if (point.y % BigInt('2') == BigInt('0'))
        {
            xHex = "02" + xHex;
        }
        else
        {
            xHex = "03" + xHex
        }

        let sha256Result = Keys.SHA256HexToByteArray(xHex);
        let ripemd160Result = Keys.RIPEMD160HexToByteArray(sha256Result);

        let publicKeyWithVersion = "00" + ripemd160Result;

        let checksum = Keys.SHA256HexToByteArray(Keys.SHA256HexToByteArray(publicKeyWithVersion)).substr(0,8)
    
        let publicKeyWithChecksum = publicKeyWithVersion + checksum;

        return (Keys.Base58Encode(publicKeyWithChecksum));
    }

    static CompressedPrivateKeyToSegwitAddress(key)
    {
        if (!key.startsWith('K') && !key.startsWith('L'))
            throw new Error("Only compressed keys are supported");

        let formattedHex = Keys._GetHexFromPrivateKey(key)
        formattedHex = formattedHex.substr(0, formattedHex.length - 2)

        let point = Point.fromPrivateKey(formattedHex);
        let xHex = Keys.BnToHex(point.x);

        if (point.y % BigInt('2') == BigInt('0'))
        {
            xHex = "02" + xHex;
        }
        else
        {
            xHex = "03" + xHex
        }

        let sha256Result = Keys.SHA256HexToByteArray(xHex);
        let keyHash = Keys.RIPEMD160HexToByteArray(sha256Result);

        let p2w_v0 = Keys.HexToBytes("0014"+keyHash);

        let scriptHash = Keys.RIPEMD160HexToByteArray(Keys.SHA256HexToByteArray(Keys.BytesToHex(p2w_v0)))

        //let p2sh = HexToBytes("a9"+ scriptHash + '87')
        let flaggedScripthash = Keys.HexToBytes("05"+scriptHash);

        let checksum = Keys.SHA256HexToByteArray(Keys.SHA256HexToByteArray(Keys.BytesToHex(flaggedScripthash))).substr(0,8)

        let binAddr = Keys.BytesToHex(flaggedScripthash)+checksum;

        return Keys.Base58Encode(binAddr)
    }

    static CompressedPrivateKeyToBech32Address(key)
    {
        if (!key.startsWith('K') && !key.startsWith('L'))
            throw new Error("Only compressed keys are supported");

        let formattedHex = Keys._GetHexFromPrivateKey(key)
        formattedHex = formattedHex.substr(0, formattedHex.length - 2)

        let point = Point.fromPrivateKey(formattedHex);
        let xHex = Keys.BnToHex(point.x);

        if (point.y % BigInt('2') == BigInt('0'))
        {
            xHex = "02" + xHex;
        }
        else
        {
            xHex = "03" + xHex
        }

        let sha256Result = Keys.SHA256HexToByteArray(xHex);
        let keyhash = Keys.RIPEMD160HexToByteArray(sha256Result);

        //keyhash = "751e76e8199196d454941c45d1b3a323f1433bd6"
        let toChar = Object.assign([], keyhash)
        
        let binArr = []

        for (let c of toChar)
        {
            binArr.push(Keys.FourBitHexToBinary(c))
        }

        let fullBinStr = "";
        for (let c of binArr)
        {
            fullBinStr += c
        }

        let squashedArr = [];
        let tempStr = "";
        for(let i = 0; i < fullBinStr.length; i++)
        {
            tempStr += fullBinStr[i];
            if ((i+1) % 5 == 0)
            {
                squashedArr.push(tempStr)
                tempStr=""
            }
        }

        let formattedKey = "";
        for(let c of squashedArr)
        {
            formattedKey +=Keys.BinaryToHex(c).result.toLowerCase()
        }
        formattedKey = "00" + formattedKey

        let bytes = Keys.HexToBytes(formattedKey);

        let checksum = Keys.BytesToHex(Keys.Bech32CreateChecksum("bc", bytes))

        let finalKey = Keys.HexToBytes(formattedKey + checksum);
        
        let bech32Address = "bc1";
        for(let c of finalKey)
        {
            bech32Address += Keys._MapBech32Char(c);
        }

        return bech32Address
    }
}
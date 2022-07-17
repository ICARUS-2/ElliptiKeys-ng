import CryptoJS from "./crypto-js.js";
import { Point } from "./noble-secp256k1.js";
import BIP39_WORDS from "./bip39-en.js";

export default class Keys
{
    static HEX_LENGTH = 64;
    static MAX_PRIVATE_KEY = BigInt("115792089237316195423570985008687907852837564279074904382605163141518161494336")
    static BECH32_CHARS = "qpzry9x8gf2tvdw0s3jn54khce6mua7l"
    static BITS_IN_BYTE = 8;
    static LENGTH_MULTIPLE = 32;
    static BIP39_BITSPLIT = 11;

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
    static HexToBinaryString(hex, len){
        let s =  ("" + (parseInt(hex, 16)).toString(2)).substr(-8);

        while (s.length != len)
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

    //https://stackoverflow.com/questions/9939760/how-do-i-convert-an-integer-to-binary-in-javascript
    static CreateBinaryString(nMask) {
        // nMask must be between -2147483648 and 2147483647
        if (nMask > 2**31-1) 
           throw "number too large. number shouldn't be > 2**31-1"; //added
        if (nMask < -1*(2**31))
           throw "number too far negative, number shouldn't be < 2**31" //added
        for (var nFlag = 0, nShifted = nMask, sMask = ''; nFlag < 32;
             nFlag++, sMask += String(nShifted >>> 31), nShifted <<= 1);
        sMask=sMask.replace(/\B(?=(.{8})+(?!.))/g, " ") // added
        return sMask;
      }
      

    static _GetHexFromPrivateKey(key)
    {
        //Must decode key to its hex form
        let decoded = Keys.Base58DecodeToHex(key)

        //Removes the checksum
        let hexWithoutChecksum = decoded.substr(0, decoded.length-8)
        
        //Removes the version number
        let hexWithoutPrefix = hexWithoutChecksum.substr(2, hexWithoutChecksum.length-1)

        //Adds the necessary trailing zeroes to the hex
        let formattedHex = Keys._FormatHexStringLength(hexWithoutPrefix)
        return formattedHex;
    }

    static _MapBech32Char(byte)
    {
        return Keys.BECH32_CHARS[byte];
    }

    static _UnmapBech32Char(char)
    {
        return Keys.BECH32_CHARS.indexOf(char, 0)
    }

    static _FormatHexStringLength(s)
    {
        if (s.length == Keys.HEX_LENGTH)
            return s

        //Adds trailing zeroes to the hex to ensure its length
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
        //Compute the checksum by double-SHA256, take first 8 chars (4 bytes)
        var firstSHA = Keys.SHA256HexToByteArray(privateKeyAndVersion)
        var secondSHA = Keys.SHA256HexToByteArray(firstSHA)
        var checksum = secondSHA.substr(0, 8).toUpperCase()

        //Combines the two to make the key
        var keyWithChecksum = privateKeyAndVersion + checksum

        //Base 58 encode gives us the final address
        let bitcoinPrivateKey = Keys.Base58Encode(keyWithChecksum)

        return bitcoinPrivateKey;
    }

    static _ComputeBip39Checksum(privateKeyBytes)
    {
        //Checksum length depends on how long the seed is
        let checksumLength = privateKeyBytes.length * Keys.BITS_IN_BYTE / Keys.LENGTH_MULTIPLE

        let sha256Result = Keys.SHA256HexToByteArray(Keys.BytesToHex(privateKeyBytes))

        let sha256Bytes = Keys.HexToBytes(sha256Result)

        let firstByte = Keys.CreateBinaryString(sha256Bytes[0]).split(" ")[3];

        //Checksum is gotten by verifying the first byte's characters
        let checksum = firstByte.substr(0, checksumLength)

        return checksum
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
        //Securely gets the random bytes
        var randArr = new Uint8Array(32) 
        window.crypto.getRandomValues(randArr)

        //Converts it to a normal array for compatibility
        var privateKeyBytes = []
        for (var i = 0; i < randArr.length; ++i)
            privateKeyBytes[i] = randArr[i]

        //Converts the random bytes to a hex string
        var privateKeyHex = Keys.BytesToHex(privateKeyBytes).toUpperCase()

        //Bitcoin mainnet version is 80
        var privateKeyAndVersion = "80" + privateKeyHex

        //Will compute the checksum and perform encoding
        return Keys._PrivateKeyAndVersionToBitcoinKey(privateKeyAndVersion);
    }

    static GenerateRandomCompressedPrivateKey()
    {
        //Simply generates an uncompressed key and runs it through the compress function
        let randomKey = Keys.GenerateRandomPrivateKey();
        let compressed = Keys.CompressWIF(randomKey)
        
        return compressed
    }

    static GeneratePrivateKeyFromNumber(numStr)
    {
        let num = BigInt(numStr)

        let privateKeyHex = Keys._FormatHexStringLength(Keys.BnToHex(num))
        let privateKeyHexAndPrefix = "80" + privateKeyHex;

        return Keys._PrivateKeyAndVersionToBitcoinKey(privateKeyHexAndPrefix);
    }

    static GenerateCompressedPrivateKeyFromNumber(numStr)
    {
        let num = BigInt(numStr)

        let privateKeyHex = Keys._FormatHexStringLength(Keys.BnToHex(num))
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
        //We need the hex to derive the ECC public key
        let formattedHex = Keys._GetHexFromPrivateKey(privateKey);

        //Point on the elliptic curve
        let point = Point.fromPrivateKey(formattedHex);
        let xHex = Keys.BnToHex(point.x);
        let yHex = Keys.BnToHex(point.y);

        //Concatenate 04 plus the points to make our formatted key
        let concat = "04"+xHex+yHex;
        let sha256Result = Keys.SHA256HexToByteArray(concat);
        let ripemd160Result = Keys.RIPEMD160HexToByteArray(sha256Result)
        
        //P2PKH is a hash of the public key, mainnet is 00
        let publicKeyWithVersion = "00" + ripemd160Result;

        //Checksum is the first 8 chars of the double-hashed key
        let checksum = Keys.SHA256HexToByteArray(Keys.SHA256HexToByteArray(publicKeyWithVersion)).substr(0,8)

        //Append checksum and return our address
        let publicKeyWithChecksum = publicKeyWithVersion + checksum
        return (Keys.Base58Encode(publicKeyWithChecksum))
    }

    static CompressedPrivateKeyToLegacyAddress(key)
    {
        //Compressed private key only starts with K or L
        if (!key.startsWith('K') && !key.startsWith('L'))
            throw new Error("Only compressed keys are supported");

        let formattedHex = Keys._GetHexFromPrivateKey(key)
        formattedHex = formattedHex.substr(0, formattedHex.length - 2)

        //Compressed key does not require Y since it is compressed
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

        //Generates the script hash by appending the marker and double-hashing
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
        //Perform the same steps as we did with segwit
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

        //Get the entire key hash in the form of a binary string, always 4 bits
        for (let c of toChar)
        {
            binArr.push(Keys.HexToBinaryString(c, 4))
        }

        //Concatenate all the binary into one strng
        let fullBinStr = "";
        for (let c of binArr)
        {
            fullBinStr += c
        }

        //Changes the spacing from intervals of 4 to intervals of 5 for bech32 encoding
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

        //Convert the binary to hex and append version number
        let formattedKey = "";
        for(let c of squashedArr)
        {
            formattedKey +=Keys.BinaryToHex(c).result.toLowerCase()
        }

        formattedKey = "00" + formattedKey

        //Create and append the checksum
        let bytes = Keys.HexToBytes(formattedKey);

        let checksum = Keys.BytesToHex(Keys.Bech32CreateChecksum("bc", bytes))

        let finalKey = Keys.HexToBytes(formattedKey + checksum);

        //Create HRP and map the characters
        let bech32Address = "bc1";

        for(let c of finalKey)
        {
            bech32Address += Keys._MapBech32Char(c);
        }

        return bech32Address
    }

    static ValidateBitcoinAddress(bitcoinAddress)
    {
        //Legacy/Wrapped SegWit will require verifying the double-hash checksum
        try
        {
            if (bitcoinAddress.startsWith('1') || bitcoinAddress.startsWith('3') || bitcoinAddress.startsWith('2'))
            {
                let decoded = Keys.Base58DecodeToHex(bitcoinAddress)
                
                let providedChecksum = decoded.substr(decoded.length - 8, decoded.length)

                let decodedWithoutChecksum = decoded.split(providedChecksum)[0]

                let computedChecksum = Keys.SHA256HexToByteArray(Keys.SHA256HexToByteArray(decodedWithoutChecksum)).substr(0,8)

                return computedChecksum == providedChecksum
            }

            //Bech32 encoding requires its own type of checksum
            if (bitcoinAddress.startsWith("bc1q"))
            {
                bitcoinAddress = bitcoinAddress.replace("bc1", "")

                let indexArr = []
                for(let c of bitcoinAddress)
                {
                    indexArr.push(Keys._UnmapBech32Char(c))
                }

                const CHECKSUM_LENGTH = 6;

                let bytesArr = new Uint8Array(indexArr)

                let bytesWithoutChecksum = bytesArr.slice(0, bytesArr.length-CHECKSUM_LENGTH)

                let providedChecksum = Keys.BytesToHex(bytesArr.slice(bytesArr.length - CHECKSUM_LENGTH, bytesArr.length))
                
                let computedChecksum = Keys.BytesToHex(Keys.Bech32CreateChecksum("bc", bytesWithoutChecksum))

                return providedChecksum == computedChecksum;
            }
        }
        catch(err)
        {
            console.log(err)
            //If any exception occurs it cannot be valid, return false on next line
        }
        return false
    }

    static GenerateRandomTestnetPrivateKey()
    {
        var randArr = new Uint8Array(32) 
        window.crypto.getRandomValues(randArr)

        var privateKeyBytes = []
        for (var i = 0; i < randArr.length; ++i)
            privateKeyBytes[i] = randArr[i]

        var privateKeyHex = Keys.BytesToHex(privateKeyBytes).toUpperCase()

        var privateKeyAndVersion = "EF" + privateKeyHex

        return Keys._PrivateKeyAndVersionToBitcoinKey(privateKeyAndVersion);
    }

    static GenerateRandomCompressedTestnetPrivateKey()
    {
        let randomKey = Keys.GenerateRandomTestnetPrivateKey();
        let compressed = Keys.CompressTestnetWIF(randomKey);

        return compressed
    }

    static GenerateTestnetPrivateKeyFromNumber(numStr)
    {
        let num = BigInt(numStr)

        let privateKeyHex = Keys._FormatHexStringLength(Keys.BnToHex(num))
        let privateKeyHexAndPrefix = "EF" + privateKeyHex;

        return Keys._PrivateKeyAndVersionToBitcoinKey(privateKeyHexAndPrefix);
    }

    static GenerateCompressedTestnetPrivateKeyFromNumber(numStr)
    {
        let num = BigInt(numStr)

        let privateKeyHex = Keys._FormatHexStringLength(Keys.BnToHex(num))
        let privateKeyHexAndPrefix = "EF" + privateKeyHex + "01";

        return Keys._PrivateKeyAndVersionToBitcoinKey(privateKeyHexAndPrefix);
    }

    static CompressTestnetWIF(key)
    {
        if (key.startsWith('c'))
            return key;

        let formattedHex = Keys._GetHexFromPrivateKey(key)
        let k = "EF" + formattedHex + "01"
        return Keys._PrivateKeyAndVersionToBitcoinKey(k)
    }

    static DecompressTestnetWIF(compressedKey)
    {
        if (compressedKey.startsWith('9'))
            return compressedKey

        let formattedHex = Keys._GetHexFromPrivateKey(compressedKey);
        formattedHex = formattedHex.substr(0, formattedHex.length -2)
        let k = "EF" + formattedHex;
        return Keys._PrivateKeyAndVersionToBitcoinKey(k);
    }

    static TestnetPrivateKeyToLegacyAddress(privateKey)
    {
        let formattedHex = Keys._GetHexFromPrivateKey(privateKey);

        let point = Point.fromPrivateKey(formattedHex);
        let xHex = Keys.BnToHex(point.x);
        let yHex = Keys.BnToHex(point.y);

        let concat = "04"+xHex+yHex;
        let sha256Result = Keys.SHA256HexToByteArray(concat);
        let ripemd160Result = Keys.RIPEMD160HexToByteArray(sha256Result)
        
        let publicKeyWithVersion = "6F" + ripemd160Result;

        let checksum = Keys.SHA256HexToByteArray(Keys.SHA256HexToByteArray(publicKeyWithVersion)).substr(0,8)

        let publicKeyWithChecksum = publicKeyWithVersion + checksum
        return (Keys.Base58Encode(publicKeyWithChecksum))
    }

    static TestnetCompressedPrivateKeyToLegacyAddress(key)
    {
        if (!key.startsWith('c'))
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

        let publicKeyWithVersion = "6F" + ripemd160Result;

        let checksum = Keys.SHA256HexToByteArray(Keys.SHA256HexToByteArray(publicKeyWithVersion)).substr(0,8)
    
        let publicKeyWithChecksum = publicKeyWithVersion + checksum;

        return (Keys.Base58Encode(publicKeyWithChecksum));
    }

    static TestnetCompressedPrivateKeyToSegwitAddress(key)
    {
        if (!key.startsWith('c'))
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
        let flaggedScripthash = Keys.HexToBytes("c4"+scriptHash);

        let checksum = Keys.SHA256HexToByteArray(Keys.SHA256HexToByteArray(Keys.BytesToHex(flaggedScripthash))).substr(0,8)

        let binAddr = Keys.BytesToHex(flaggedScripthash)+checksum;

        return Keys.Base58Encode(binAddr)
    }

    static TestnetCompressedPrivateKeyToBech32Address(key)
    {
        //Perform the same steps as we did with segwit
        if (!key.startsWith('c'))
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

        //Get the entire key hash in the form of a binary string, always 4 bits
        for (let c of toChar)
        {
            binArr.push(Keys.HexToBinaryString(c, 4))
        }

        //Concatenate all the binary into one strng
        let fullBinStr = "";
        for (let c of binArr)
        {
            fullBinStr += c
        }

        //Changes the spacing from intervals of 4 to intervals of 5 for bech32 encoding
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

        //Convert the binary to hex and append version number
        let formattedKey = "";
        for(let c of squashedArr)
        {
            formattedKey +=Keys.BinaryToHex(c).result.toLowerCase()
        }

        formattedKey = "00" + formattedKey

        //Create and append the checksum
        let bytes = Keys.HexToBytes(formattedKey);

        let checksum = Keys.BytesToHex(Keys.Bech32CreateChecksum("tb", bytes))

        let finalKey = Keys.HexToBytes(formattedKey + checksum);

        //Create HRP and map the characters
        let bech32Address = "tb1";

        for(let c of finalKey)
        {
            bech32Address += Keys._MapBech32Char(c);
        }

        return bech32Address
    }

    static GenerateRandomBip39Mnemonic(wordCount = 12)
    {
        let arrLength;

        switch(wordCount)
        {
            case 12:
                arrLength = 16;
                break;
            
            case 15:
                arrLength = 20;
                break;

            case 18:
                arrLength = 24;
                break;

            case 21:
                arrLength = 28;
                break;

            case 24:
                arrLength = 32;
                break;

            default:
                throw Error("Invalid word count");
        }

        var randArr = new Uint8Array(arrLength) 
        window.crypto.getRandomValues(randArr)

        var privateKeyBytes = []
        for (var i = 0; i < randArr.length; ++i)
            privateKeyBytes[i] = randArr[i]

        //TEST CASE
        //privateKeyBytes = [204, 40, 66, 180, 148, 159, 102, 152, 155, 222, 4, 35, 24, 42, 224, 14]
        //slow dragon pudding circle wait era hunt scene cart scout retreat buffalo
        //

        console.log(privateKeyBytes)

        let fullBinStr = ""
        for(let b of privateKeyBytes)
        {
            let binStr = Keys.CreateBinaryString(b).split(" ")[3];
            fullBinStr += binStr
        }

        let checksum = Keys._ComputeBip39Checksum(privateKeyBytes)

        let fullBinStrWithChecksum = fullBinStr + checksum

        let squashedArr = [];
        let tempStr = "";
        for(let i = 0; i < fullBinStrWithChecksum.length; i++)
        {
            tempStr += fullBinStrWithChecksum[i];
            if ((i+1) % Keys.BIP39_BITSPLIT == 0)
            {
                squashedArr.push(tempStr)
                tempStr=""
            }
        }

        let words = [];
        for(let i = 0; i < squashedArr.length; i++)
        {
            let idx = (Keys.BinaryToDecimal(squashedArr[i]))
            let word = BIP39_WORDS[idx]
            words.push(word)
        }
        
        return words
    }

    static VerifyBip39Mnemonic(words)
    {
        let bitCount;

        switch(words.length)
        {
            case 12:
                bitCount = 128;
                break;

            case 15: 
                bitCount = 160;
                break;

            case 18:
                bitCount = 192;
                break;

            case 21:
                bitCount = 224;
                break;

            case 24:
                bitCount = 256;
                break;

            default:
                return false;
        }

        let checksumLength = bitCount / Keys.LENGTH_MULTIPLE

        let indexes = []

        for(let i = 0; i < words.length; i++)
        {
            let w = words[i];
            for(let i = 0; i < BIP39_WORDS.length; i++)
            {
                if (w == BIP39_WORDS[i])
                {
                    indexes.push(i)
                }
            }
        }

        if (indexes.length != words.length)
            return false;

        let fullBinStrWithChecksum = "";
        let splitWithSpaceIndex = Keys.BIP39_BITSPLIT + 1; 
        for(let idx of indexes)
        {
            let binary = (Keys.CreateBinaryString(idx));
            let lastElevenBits = binary.substring(binary.length-splitWithSpaceIndex, binary.length).replace(" ", "")
            
            fullBinStrWithChecksum += lastElevenBits
        }

        let receivedChecksum = fullBinStrWithChecksum.substring(fullBinStrWithChecksum.length-checksumLength, fullBinStrWithChecksum.length)
    
        let fullBinStr = fullBinStrWithChecksum.substring(0, fullBinStrWithChecksum.length-checksumLength)

        let privateKeyBytes = [];
        let tempStr = "";
        for(let i = 0; i < fullBinStr.length; i++)
        {
            tempStr += fullBinStrWithChecksum[i];
            if ((i+1) % Keys.BITS_IN_BYTE == 0)
            {
                privateKeyBytes.push(Keys.BinaryToDecimal(tempStr))
                tempStr=""
            }
        }

        let verifiedChecksum = Keys._ComputeBip39Checksum(privateKeyBytes)
        
        return verifiedChecksum == receivedChecksum
    }

    static GetSeedFromMnemonic(words)
    {
        throw new Error("Not implemented")
        let concat ="";

        for(let i = 0; i < words.length; i++)
        {
            concat += words[i]

            if (i != words.length - 1)
                concat += " "
        }
        //console.log(concat)
        let seed = CryptoJS.PBKDF2(concat, "mnemonic", {keySize: 16, iterations: 2048, hasher: CryptoJS.algo.SHA512}).toString()

        let master = CryptoJS.HmacSHA512(CryptoJS.enc.Hex.parse(seed), "Bitcoin seed")
        //todo figure this master shit out
        //console.log("512-BIT SEED   "+ seed.toString())
        //console.log("Master key: " + master)
    
        //CryptoJS.enc.Hex.parse(a)
    }
}
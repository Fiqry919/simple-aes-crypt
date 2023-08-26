import utf8 from "utf8"
import { Block } from "../Block";

export declare type Nbits = 128 | 192 | 256

declare type BlockSize = 16

export class Aes extends Block {

    private readonly blockSize: BlockSize

    /**
     * 
     * @param blockSize 
     */
    protected constructor(blockSize?: BlockSize) {
        super()
        this.blockSize = blockSize ? blockSize : 16
    }

    /**
     * 
     * @param plaintext 
     * @param password 
     * @param nBits 
     * @returns 
     */
    protected e(plaintext: string, password: string, nBits: Nbits): string {
        plaintext = utf8.encode(plaintext);
        password = utf8.encode(password);

        var nBytes = nBits / 8;
        var pwBytes = new Array(nBytes);
        for (var i = 0; i < nBytes; i++) {
            pwBytes[i] = isNaN(password.charCodeAt(i)) ? 0 : password.charCodeAt(i);
        }
        var key = this.instance.cipher(pwBytes, this.instance.keyExpansion(pwBytes));
        key = key.concat(key.slice(0, nBytes - 16));

        var counterBlock = new Array(this.blockSize);

        var nonce = (new Date()).getTime();
        var nonceMs = nonce % 1000;
        var nonceSec = Math.floor(nonce / 1000);
        var nonceRnd = Math.floor(Math.random() * 0xffff);

        for (var i = 0; i < 2; i++) counterBlock[i] = (nonceMs >>> i * 8) & 0xff;
        for (var i = 0; i < 2; i++) counterBlock[i + 2] = (nonceRnd >>> i * 8) & 0xff;
        for (var i = 0; i < 4; i++) counterBlock[i + 4] = (nonceSec >>> i * 8) & 0xff;

        var ctrTxt = '';
        for (var i = 0; i < 8; i++) ctrTxt += String.fromCharCode(counterBlock[i]);

        var keySchedule = this.instance.keyExpansion(key);

        var blockCount = Math.ceil(plaintext.length / this.blockSize);
        var ciphertxt = new Array(blockCount);

        for (var b = 0; b < blockCount; b++) {
            for (var c = 0; c < 4; c++) counterBlock[15 - c] = (b >>> c * 8) & 0xff;
            for (var c = 0; c < 4; c++) counterBlock[15 - c - 4] = (b / 0x100000000 >>> c * 8);

            var cipherCntr = this.instance.cipher(counterBlock, keySchedule);

            var blockLength = b < blockCount - 1 ? this.blockSize : (plaintext.length - 1) % this.blockSize + 1;
            var cipherChar = new Array(blockLength);

            for (var i = 0; i < blockLength; i++) {
                cipherChar[i] = cipherCntr[i] ^ plaintext.charCodeAt(b * this.blockSize + i);
                cipherChar[i] = String.fromCharCode(cipherChar[i]);
            }
            ciphertxt[b] = cipherChar.join('');
        }

        var ciphertext = ctrTxt + ciphertxt.join('');
        ciphertext = btoa(ciphertext);

        return ciphertext;
    }


    /**
     * 
     * @param ciphertext 
     * @param password 
     * @param nBits 
     * @returns 
     */
    protected d(ciphertext: any, password: string, nBits: Nbits): string {
        ciphertext = atob(ciphertext);
        password = utf8.encode(password);

        var nBytes = nBits / 8;
        var pwBytes = new Array(nBytes);
        for (var i = 0; i < nBytes; i++) {
            pwBytes[i] = isNaN(password.charCodeAt(i)) ? 0 : password.charCodeAt(i);
        }
        var key = this.instance.cipher(pwBytes, this.instance.keyExpansion(pwBytes));
        key = key.concat(key.slice(0, nBytes - 16));

        var counterBlock = new Array(8);
        var ctrTxt = ciphertext.slice(0, 8);
        for (var i = 0; i < 8; i++) counterBlock[i] = ctrTxt.charCodeAt(i);

        var keySchedule = this.instance.keyExpansion(key);

        var nBlocks = Math.ceil((ciphertext.length - 8) / this.blockSize);
        var ct = new Array(nBlocks);
        for (var b = 0; b < nBlocks; b++) ct[b] = ciphertext.slice(8 + b * this.blockSize, 8 + b * this.blockSize + this.blockSize);
        ciphertext = ct;

        var plaintxt = new Array(ciphertext.length);

        for (var b = 0; b < nBlocks; b++) {
            for (var c = 0; c < 4; c++) counterBlock[15 - c] = ((b) >>> c * 8) & 0xff;
            for (var c = 0; c < 4; c++) counterBlock[15 - c - 4] = (((b + 1) / 0x100000000 - 1) >>> c * 8) & 0xff;

            var cipherCntr = this.instance.cipher(counterBlock, keySchedule);

            var plaintxtByte = new Array(ciphertext[b].length);
            for (var i = 0; i < ciphertext[b].length; i++) {
                plaintxtByte[i] = cipherCntr[i] ^ ciphertext[b].charCodeAt(i);
                plaintxtByte[i] = String.fromCharCode(plaintxtByte[i]);
            }
            plaintxt[b] = plaintxtByte.join('');
        }

        var plaintext = plaintxt.join('');
        try {
            plaintext = utf8.decode(plaintext);
            if (!plaintext) throw Error()
        } catch (e) {
            return JSON.stringify("Invalid continuation byte")
        }
        return plaintext;
    }
}
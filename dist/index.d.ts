import { Aes, Nbits } from "./Aes";
declare interface Options {
    /**
     * your secret key
     */
    key: string;
    /**
     * sowing salt, by default random with 16 character
     */
    salt?: string;
    /**
     * Support 192 or 256, by default is 256
     */
    bit?: Nbits;
}
/**
 * Generate random string with specific length
 * @param length
 * @returns
 */
export declare function randomString(length: number): string;
export default class SimpleAes extends Aes {
    /**
     * Key
     */
    private readonly key;
    /**
     * Salt
     */
    private readonly salt;
    /**
     * Size
     */
    private readonly size;
    /**
     * bit
     */
    private readonly nBits;
    constructor(options: Options);
    /**
     *
     * @param i any input
     * @returns encryption
     */
    encrypt(i: any): string;
    /**
     *
     * @param e encryption
     * @returns decryption
     */
    decrypt(e: string): any;
}
export {};

import { Block } from "../Block";
export declare type Nbits = 192 | 256;
declare type BlockSize = 16 | 32 | 64 | 128;
export declare class Aes extends Block {
    private readonly blockSize;
    /**
     *
     * @param blockSize
     */
    protected constructor(blockSize?: BlockSize);
    /**
     *
     * @param plaintext
     * @param password
     * @param nBits
     * @returns
     */
    protected e(plaintext: string, password: string, nBits: Nbits): string;
    /**
     *
     * @param ciphertext
     * @param password
     * @param nBits
     * @returns
     */
    protected d(ciphertext: any, password: string, nBits: Nbits): string;
}
export {};

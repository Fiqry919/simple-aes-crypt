declare type E = any | any[];
declare type Bytes = 16 | 32 | 64 | 128;
export declare class Block {
    protected readonly instance: typeof Block;
    protected constructor();
    /**
     *
     */
    private static readonly sBox;
    /**
     *
     */
    private static readonly rCon;
    /**
     *
     * @param w
     * @returns
     */
    private static rotWord;
    /**
     *
     * @param w
     * @returns
     */
    private static subWord;
    /**
     *
     * @param state
     * @param w
     * @param rnd
     * @param Nb
     * @returns
     */
    private static addRoundKey;
    /**
     *
     * @param s
     * @param Nb
     * @returns
     */
    private static mixColumns;
    /**
     *
     * @param s
     * @param Nb
     * @returns
     */
    private static shiftRows;
    /**
     *
     * @param s
     * @param Nb
     * @returns
     */
    private static subBytes;
    /**
     * instance type validation
     * @param n parameter
     * @param x type
     * @returns boolean
     */
    protected static instanceOf(n: any[], x: any): boolean;
    /**
     *
     * @param key
     * @returns
     */
    protected static keyExpansion(key: E): E;
    /**
     *
     * @param input
     * @param w
     * @returns
     */
    protected static cipher(input: E, w: E): E;
    /**
     * Spliter
     */
    protected static split(s: string): string;
    /**
     *
     * @param s size of bytes
     * @returns
     */
    protected static randomBytes(s: Bytes): string;
}
export {};

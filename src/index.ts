import { Aes, Nbits } from "./Aes"

declare type Bytes = 16 | 32 | 64 | 128

declare interface Options { key: string, size?: Bytes, bit?: Nbits }

const Tbytes = [16, 32, 64, 128]

const Tbits = [128, 192, 256]

export class SimpleAes extends Aes {

    /**
     * Key
     */
    private readonly key: string

    /**
     * Size
     */
    private readonly size: Bytes

    /**
     * bit
     */
    private readonly nBits: Nbits

    constructor(options: Options) {
        super()
        this.key = options.key
        this.size = options.size ? options.size : 16
        this.nBits = options.bit ? options.bit : 256
    }

    /**
     * instance type validation
     * @param n parameter
     * @param x type
     * @returns boolean
     */
    private instanceOf(n: any[], x: any): boolean {
        for (const l of n) {
            if (l === x) return true
        }
        return false
    }

    /**
     * 
     * @param s size of bytes
     * @returns 
     */
    private randomBytes(s: Bytes): string {
        let r: string = ""
        let c: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
        for (let i = 0; i < s; i++) {
            r += c.charAt(Math.floor(Math.random() * c.length));
        }
        return r
    }

    /**
     * 
     * @param i any input
     * @returns encryption
     */
    encrypt(i: any): string {
        var s: boolean = this.instanceOf(Tbytes, this.size)
        var b: boolean = this.instanceOf(Tbits, this.nBits)
        if (!s || !b) return `invalid of ${!s ? "size" : "bit"}`
        var p = this.randomBytes(this.size);
        var c = this.e(JSON.stringify(i), p + this.key, this.nBits);
        return p + c;
    }

    /**
     * 
     * @param e encryption
     * @returns decryption
     */
    decrypt(e: string): any {
        var s: boolean = this.instanceOf(Tbytes, this.size)
        var b: boolean = this.instanceOf(Tbits, this.nBits)
        if (!s || !b) return `invalid of ${!s ? "size" : "bit"}`
        var p = e.substring(0, this.size);
        var d = e.substring(this.size);
        return JSON.parse(this.d(d, p + this.key, this.nBits));
    }
}
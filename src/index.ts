import { Aes, Nbits } from "./Aes"

const Tbytes = [16]

const Tbits = [192, 256]

declare type Bytes = 16 | 32 | 64 | 128

declare interface Options { key: string, bit?: Nbits }

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
        this.size = Tbytes[0] as Bytes
        this.nBits = options.bit ? options.bit : 256
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
        const s: boolean = this.instance.instanceOf(Tbytes, this.size)
        const b: boolean = this.instance.instanceOf(Tbits, this.nBits)
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
        const s: boolean = this.instance.instanceOf(Tbytes, this.size)
        const b: boolean = this.instance.instanceOf(Tbits, this.nBits)
        if (!s || !b || typeof e != "string") return `invalid of ${typeof e != "string" ? "encryption" : !s ? "size" : "bit"}`
        var p = e.substring(0, this.size);
        var d = e.substring(this.size);
        return JSON.parse(this.d(d, p + this.key, this.nBits));
    }
}
import { Aes, Nbits } from "./Aes"

const Tbytes = [16]

const Tbits = [192, 256]

declare type Bytes = 16 | 32 | 64 | 128

declare interface Options {
    /**
     * your secret key
     */
    key: string,
    /**
     * sowing salt, by default random with 16 character
     */
    salt?: string,
    /**
     * Support 192 or 256, by default is 256
     */
    bit?: Nbits
}

/**
 * Generate random string with specific length
 * @param length 
 * @returns 
 */
export function randomString(length: number): string {
    let r: string = ""
    let c: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    for (let i = 0; i < length; i++) {
        r += c.charAt(Math.floor(Math.random() * c.length));
    }
    return r
}

export default class SimpleAes extends Aes {

    /**
     * Key
     */
    private readonly key: string

    /**
     * Salt
     */
    private readonly salt: string

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
        this.salt = options.salt ? this.instance.split(options.salt) : this.instance.randomBytes(this.size)
        this.nBits = options.bit ? options.bit : 256
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
        var c = this.e(JSON.stringify(i), this.salt + this.key, this.nBits);
        return this.salt + c;
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
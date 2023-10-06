"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomString = void 0;
const Aes_1 = require("./Aes");
const Tbytes = [16];
const Tbits = [192, 256];
/**
 * Generate random string with specific length
 * @param length
 * @returns
 */
function randomString(length) {
    let r = "";
    let c = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < length; i++) {
        r += c.charAt(Math.floor(Math.random() * c.length));
    }
    return r;
}
exports.randomString = randomString;
class SimpleAes extends Aes_1.Aes {
    constructor(options) {
        super();
        this.key = options.key;
        this.size = Tbytes[0];
        this.salt = options.salt ? this.instance.split(options.salt) : this.instance.randomBytes(this.size);
        this.nBits = options.bit ? options.bit : 256;
    }
    /**
     *
     * @param i any input
     * @returns encryption
     */
    encrypt(i) {
        const s = this.instance.instanceOf(Tbytes, this.size);
        const b = this.instance.instanceOf(Tbits, this.nBits);
        if (!s || !b)
            return `invalid of ${!s ? "size" : "bit"}`;
        var c = this.e(JSON.stringify(i), this.salt + this.key, this.nBits);
        return this.salt + c;
    }
    /**
     *
     * @param e encryption
     * @returns decryption
     */
    decrypt(e) {
        const s = this.instance.instanceOf(Tbytes, this.size);
        const b = this.instance.instanceOf(Tbits, this.nBits);
        if (!s || !b || typeof e != "string")
            return `invalid of ${typeof e != "string" ? "encryption" : !s ? "size" : "bit"}`;
        var p = e.substring(0, this.size);
        var d = e.substring(this.size);
        return JSON.parse(this.d(d, p + this.key, this.nBits));
    }
}
exports.default = SimpleAes;

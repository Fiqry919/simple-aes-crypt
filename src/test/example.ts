import SimpleAes, { randomString } from "..";

const aes = new SimpleAes({ key: "YOUR_SECRET_KEY", salt: randomString(16), bit: 256 });
const newAes = new SimpleAes({ key: "WRONG_SECRET_KEY", salt: randomString(16), bit: 256 });

const encrypt = aes.encrypt({ foo: ["Cat", "Dog"] });
const decrypt = aes.decrypt(encrypt);

// Define new for invalid output
const newEncrypt = aes.encrypt("Lorem Ipsum is simply dummy text");
const newDecrypt = newAes.decrypt(newEncrypt);

// Valid
console.log("encrypt:", encrypt); // encrypt: BdnqmZDSgHl8vsvingMRMcfKFmWQvIrBPO0o1t6kxAQYNaQP2XkgFow=
console.log("decrypt:", decrypt); // decrypt:  { data: [ 123, 'any', 'random', 456 ] }

// Invalid
console.log("encrypt:", newEncrypt); // encrypt: Xt5Ffpoz8I9Gbd0WYAA76ezKFmV8L5y4obexqN/h28I8HQ4bDGAxyOP20Z4zfzDjmzE+JfrD
console.log("decrypt:", newDecrypt); // decrypt: Invalid continuation byte
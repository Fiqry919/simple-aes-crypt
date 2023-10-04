import SimpleAes, { randomString } from "..";

function encrypt(data: any) {
    const aes = new SimpleAes({ key: "YOUR_SECRET_KEY" });
    return aes.encrypt(data);
}

function decrypt(encryption: string) {
    const aes = new SimpleAes({ key: "YOUR_SECRET_KEY" });
    return aes.decrypt(encryption);
}

const data = encrypt({ foo: ["Cat", "Dog"] });
const result = decrypt(data);

console.log({ encrypt: data });
console.log({ decrypt: result });
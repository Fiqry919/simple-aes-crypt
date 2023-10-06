import SimpleAes, { randomString } from "..";

const aes = () => new SimpleAes({ key: "YOUR_SECRET_KEY" })

const encrypt = (data: any) => aes().encrypt(data);

const decrypt = (encryption: string) => aes().decrypt(encryption);

const data = encrypt({ foo: ["Cat", "Dog"] });
const result = decrypt(data);

console.log({ encrypt: data });
console.log({ decrypt: result });
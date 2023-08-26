import { SimpleAes } from "../";

const aes = new SimpleAes({ key: "YOURKEY" });
const encrypt = aes.encrypt([123, "any", "random", 456]);
const decrypt = aes.decrypt(encrypt);

// new define, and also you can customize bit 192 or 256, default bit: 256
const newAes = new SimpleAes({ key: "WRONGKEY", bit: 192 });
const newEncrypt = aes.encrypt("Anything you want encrypt");
const newDecrypt = newAes.decrypt(newEncrypt);

// Valid
console.log("encrypt:", encrypt); // output: tSJ2HqMzFRlf46VfWAI1LT4R6mRKx5v9X1CSzL98QNQqBy2FQgpyNYlP+xs=
console.log("decrypt:", decrypt); // output:  [ 123, 'any', 'random', 456 ]

// Invalid
console.log("encrypt:", newEncrypt); // output: uSosDUHqfkgFWe8fXwJ2wT4R6mTKPAV5CtoCjzxd35BFGXqYhvdAeP+fIkbd2DY=
console.log("decrypt:", newDecrypt); // output: Invalid continuation byte


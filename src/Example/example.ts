import { SimpleAes, randomString } from "../";

const aes = new SimpleAes({ key: "YOURSECRETKEY", salt: randomString(16), bit: 256 });
const encrypt = aes.encrypt({ json: [123, "any", "random", 456] });
const decrypt = aes.decrypt(encrypt);

// Define new for invalid output
const newAes = new SimpleAes({ key: "WRONGSECRETKEY", salt: randomString(16), bit: 256 });
const newEncrypt = aes.encrypt("Anything you want encrypt");
const newDecrypt = newAes.decrypt(newEncrypt);

// Valid
console.log("encrypt:", encrypt); // encrypt: nE7W6IAVLHc4fLw8QgDjDhz372TbxpvIQiM2HX2Q/pqSgrXsq3xLvbAt9UY/bg7hLhgBpdw=
console.log("decrypt:", decrypt); // decrypt:  { json: [ 123, 'any', 'random', 456 ] }

// Invalid
console.log("encrypt:", newEncrypt); // encrypt: nE7W6IAVLHc4fLw8RQBRUBz372SkSsOFnhkMx+r61L3rc+X4jEABehZV3UkyOYg=
console.log("decrypt:", newDecrypt); // decrypt: Invalid continuation byte
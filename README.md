## Installation

[`NPM`](https://www.npmjs.com/):

```bash
npm install simple-aes-crypto
```

## Usage
CommonJS
```javascript
const SimpleAes = require("simple-aes-crypto").default;
```

ES module

```javascript
import SimpleAes from "simple-aes-crypto";
```

### Example

```javascript
import SimpleAes from "simple-aes-crypto";

const aes = new SimpleAes({
  key: "YOUR_SECRET_KEY",
  salt: "YOUR_SALT", // optional by default auto generate
  bit: 256 // optional by default 256
});
const encrypt = aes.encrypt({ foo: ["Cat", "Dog"] });
const decrypt = aes.decrypt(encrypt);

console.log("encrypt:", encrypt); // encrypt: nE7W6IAVLHc4fLw8QgDjDhz372TbxpvIQiM2HX2Q/pqSgrXsq3xLvbAt9UY/bg7hLhgBpdw=
console.log("decrypt:", decrypt); // decrypt:  { foo: ["Cat", "Dog"] }}
```

### Example 2

```javascript
import SimpleAes from "simple-aes-crypto";

const aes = new SimpleAes({
  key: "YOUR_SECRET_KEY",
  salt: "YOUR_SALT",
  bit: 256
});

// Define new for invalid output
const newAes = new SimpleAes({
  key: "WRONG_SECRET_KEY",
  salt: "YOUR_SALT",
  bit: 256
});

const encrypt = aes.encrypt({ foo: ["Cat", "Dog"] });
const decrypt = aes.decrypt(encrypt);

const newEncrypt = aes.encrypt("Lorem Ipsum is simply dummy text");
const newDecrypt = newAes.decrypt(newEncrypt);

// Valid
console.log({ encrypt }); // encrypt: nE7W6IAVLHc4fLw8QgDjDhz372TbxpvIQiM2HX2Q/pqSgrXsq3xLvbAt9UY/bg7hLhgBpdw=
console.log({ decrypt }); // decrypt:  { foo: ["Cat", "Dog"]} }

// Invalid
console.log({ newEncrypt }); // encrypt: nE7W6IAVLHc4fLw8RQBRUBz372SkSsOFnhkMx+r61L3rc+X4jEABehZV3UkyOYg=
console.log({ newDecrypt }); // decrypt: Invalid continuation byte
```

#### Thanks & Enjoy 😊

##
[![Downloads](https://badgen.net/npm/dt/simple-aes-crypto)](https://www.npmjs.com/package/simple-aes-crypto)


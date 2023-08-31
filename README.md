## Installation

[`NPM`](https://www.npmjs.com/):

```bash
npm install simple-aes-crypto
```

## Usage

```javascript
const SimpleAes = require("simple-aes-crypto").SimpleAes;
```

ES module

```javascript
import { SimpleAes } from "simple-aes-crypto";
```

### Example

```javascript
import { SimpleAes, randomString } from "../";

const aes = new SimpleAes({
  key: "YOURSECRETKEY",
  salt: randomString(16), // optional by default auto generate
  bit: 256 // optional by default 256
});
const encrypt = aes.encrypt({ json: [123, "any", "random", 456] });
const decrypt = aes.decrypt(encrypt);

console.log("encrypt:", encrypt); // encrypt: nE7W6IAVLHc4fLw8QgDjDhz372TbxpvIQiM2HX2Q/pqSgrXsq3xLvbAt9UY/bg7hLhgBpdw=
console.log("decrypt:", decrypt); // decrypt:  { json: [ 123, 'any', 'random', 456 ] }
```

### Example 2

```javascript
import { SimpleAes, randomString } from "../";

const aes = new SimpleAes({
  key: "YOURSECRETKEY",
  salt: randomString(16), // optional by default auto generate
  bit: 256 // optional by default 256
});
const encrypt = aes.encrypt({ json: [123, "any", "random", 456] });
const decrypt = aes.decrypt(encrypt);

// Define new for invalid output
const newAes = new SimpleAes({
  key: "WRONGSECRETKEY",
  salt: randomString(16), // optional by default auto generate
  bit: 256 // optional by default 256
});
const newEncrypt = aes.encrypt("Anything you want encrypt"); // encrypt with aes
const newDecrypt = newAes.decrypt(newEncrypt); // decrypt with newAes

// Valid
console.log("encrypt:", encrypt); // encrypt: nE7W6IAVLHc4fLw8QgDjDhz372TbxpvIQiM2HX2Q/pqSgrXsq3xLvbAt9UY/bg7hLhgBpdw=
console.log("decrypt:", decrypt); // decrypt:  { json: [ 123, 'any', 'random', 456 ] }

// Invalid
console.log("encrypt:", newEncrypt); // encrypt: nE7W6IAVLHc4fLw8RQBRUBz372SkSsOFnhkMx+r61L3rc+X4jEABehZV3UkyOYg=
console.log("decrypt:", newDecrypt); // decrypt: Invalid continuation byte
```

#### Thanks & Enjoy 😊

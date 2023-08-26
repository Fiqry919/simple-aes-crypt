## Installation

[`NPM`](https://www.npmjs.com/):

```bash
npm install simple-aes-crypt
```

## Usage

```javascript
import { SimpleAes } from "simple-aes-crypt";
```

### Example

```javascript
const aes = new SimpleAes({ key: "YOURKEY" });
const encrypt = aes.encrypt([123, "any", "random", 456]);
const decrypt = aes.decrypt(encrypt);

console.log("encrypt:", encrypt); // output: JpOx2HGJ0YJuGsp9zQLTjHgc6mTJcVcVudXhNBOAPIO/2QcxsM7ls7rAs9A=
console.log("decrypt:", decrypt); // output: [ 123, 'any', 'random', 456 ]
```

### Example 2

```javascript
const aes = new SimpleAes({ key: "YOURKEY" });
const encrypt = aes.encrypt([123, "any", "random", 456]);
const decrypt = aes.decrypt(encrypt);

// new define, and also you can customize size & bit, by default is size: 16 & bit: 256
const newAes = new SimpleAes({ key: "WRONGKEY", size: 128 });
const newEncrypt = aes.encrypt("Anything you want encrypt");
const newDecrypt = newAes.decrypt(newEncrypt);

// Valid
console.log("encrypt:", encrypt); // output: tSJ2HqMzFRlf46VfWAI1LT4R6mRKx5v9X1CSzL98QNQqBy2FQgpyNYlP+xs=
console.log("decrypt:", decrypt); // output:  [ 123, 'any', 'random', 456 ]

// Invalid
console.log("encrypt:", newEncrypt); // output: uSosDUHqfkgFWe8fXwJ2wT4R6mTKPAV5CtoCjzxd35BFGXqYhvdAeP+fIkbd2DY=
console.log("decrypt:", newDecrypt); // output: Invalid continuation byte
```

#### Thanks & Enjoy 😊

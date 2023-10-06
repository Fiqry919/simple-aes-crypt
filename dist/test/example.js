"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = __importDefault(require(".."));
const aes = () => new __1.default({ key: "YOUR_SECRET_KEY" });
const encrypt = (data) => aes().encrypt(data);
const decrypt = (encryption) => aes().decrypt(encryption);
const data = encrypt({ foo: ["Cat", "Dog"] });
const result = decrypt(data);
console.log({ encrypt: data });
console.log({ decrypt: result });

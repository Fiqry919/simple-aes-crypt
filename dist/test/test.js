"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const N = (num, str) => str;
const Str = N(64, "CbvcrFAlzZQ3m0R6swH7upXi3FvZoIeroPu8JzomtW3W8rXmNeVKRfnPyfRaOPrP");
function randomBytes(s) {
    let r = "";
    let c = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < s; i++) {
        r += c.charAt(Math.floor(Math.random() * c.length));
    }
    return r;
}
function salt(s) {
    let l = s.length;
    if (l > 16) {
        s = s.substring(0, 16);
    }
    else {
        s = s + randomBytes(16 - l);
    }
    return s;
}
const sample = randomBytes(120);
const cut = salt(sample);
console.log({ sample, l: sample.length });
console.log({ cut, l: cut.length });

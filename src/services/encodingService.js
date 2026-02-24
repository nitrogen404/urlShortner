const ALPHABET = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
const BASE = ALPHABET.length;

const encode = (num) => {
    let str = "";
    while (num > 0) {
        str = ALPHABET.charAt(num % BASE) + str;
        num = Math.floor(num / BASE);

    }
    return str;
}

const decode = (str) => {
    let num = 0;
    for (let i = 0; i < str.length; i++) {
        num = num * BASE + ALPHABET.indexOf(str.charAt(i));
    }
    return num;
}

module.exports = { encode, decode };

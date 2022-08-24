//Checking the crypto module
const crypto = require("crypto");
const algorithm = "aes-256-cbc"; //Using AES encryption
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

//Encrypting text
exports.encrypt = (text) => {
  let cipher = crypto.createCipheriv("aes-256-cbc", Buffer.from(key), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return (
    encrypted.toString("hex") +
    ":" +
    iv.toString("hex") +
    "=" +
    key.toString("hex")
  );
};

// Decrypting text
exports.decrypt = (text) => {
  let iv = Buffer.from(text.split(":")[1].split("=")[0], "hex"); //will return iv;
  let enKey = Buffer.from(text.split("=")[1], "hex"); //will return key;
  let encryptedText = Buffer.from(text.split(":")[0], "hex"); //returns encrypted Data
  let decipher = crypto.createDecipheriv("aes-256-cbc", Buffer.from(enKey), iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
};

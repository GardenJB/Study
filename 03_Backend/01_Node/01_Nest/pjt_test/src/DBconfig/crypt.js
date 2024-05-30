import crypto from 'crypto-js';
// Must be 256 bits (32 characters)
const ENCRYPTION_KEY1 = 'AaBCD12EfGHijkLmNO3Pqrst45oVWXyza';

const IV_LENGTH = 16; // For AES, this is always 16

function encrypt(text, type) {
  let iv = crypto.randomBytes(IV_LENGTH);
  let cipher;
  if (type === 1) {
    cipher = crypto.createCipheriv(
      'aes-256-cbc',
      Buffer.from(ENCRYPTION_KEY1),
      iv,
    );
  }
  let encrypted = cipher.update(text);

  encrypted = Buffer.concat([encrypted, cipher.final()]);

  return iv.toString('hex') + ':' + encrypted.toString('hex');
}

function decrypt(text, type) {
  let textParts = text.split(':');
  let iv = Buffer.from(textParts.shift(), 'hex');
  let encryptedText = Buffer.from(textParts.join(':'), 'hex');
  let decipher;
  if (type === 1) {
    decipher = crypto.createDecipheriv(
      'aes-256-cbc',
      Buffer.from(ENCRYPTION_KEY1),
      iv,
    );
  }
  let decrypted = decipher.update(encryptedText);

  decrypted = Buffer.concat([decrypted, decipher.final()]);

  return decrypted.toString();
}

module.exports = { decrypt, encrypt };

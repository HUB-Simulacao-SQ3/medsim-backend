import { createCipheriv, randomBytes, scrypt, createDecipheriv } from 'crypto';
import { promisify } from 'util';

const iv = randomBytes(16);
const password = process.env.CRYPTO_PASSWORD;

const Encryption = async () => {
	const key = (await promisify(scrypt)(password, 'salt', 32)) as Buffer;
	const enCrypt = async (textToEncrypt: any) => {
		const cipher = createCipheriv('aes-256-ctr', key, iv);
		const encryptedText = Buffer.concat([cipher.update(textToEncrypt), cipher.final()]);
		console.log('encryptedText', encryptedText);
		return encryptedText;
	};
	const deCrypt = async (textToDeCrypt: any) => {
		const decipher = createDecipheriv('aes-256-ctr', key, iv);
		const decryptedText = Buffer.concat([decipher.update(textToDeCrypt), decipher.final()]);
		return decryptedText;
	};

	return {
		enCrypt,
		deCrypt,
	};
};

export { Encryption };

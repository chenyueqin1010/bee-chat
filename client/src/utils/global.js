//SJCL 是来自斯坦福大学的 JavaScript 加密库

// 加密密钥
const secretKey = 'bee-chat@2022';

//加密方法
const encrypt = (word = '') => {
	return sjcl.encrypt(secretKey, word);
}
// 解密方法
const decrypt = (encryptedWord = '') => {
	return sjcl.decrypt(secretKey, encryptedWord);
}

localStorage.setItem = (key, val) => {
	val = typeof val === 'string' ? val : JSON.stringify(val);

	localStorage[key] = encrypt(val);
}

localStorage.getItem = (key) => {
	const text = localStorage[key];
	
	return text ? decrypt(text) : null;
}

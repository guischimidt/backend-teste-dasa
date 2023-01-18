const verifyLoginData = (email, senha) => {
	if (!email || email == '') {
		return 'O email é obrigatório';
	}
	if (!senha || senha == '') {
		return 'A senha é obrigatória';
	}
};

module.exports = verifyLoginData;
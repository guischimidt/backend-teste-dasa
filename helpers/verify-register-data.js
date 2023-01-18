const verifyRegisterData = (nome, email, senha, telefones) => {

	if (!nome || nome == '') {
		return 'O nome é obrigatório';
	}
	if (!email || email == '') {
		return 'O email é obrigatório';
	}
	if (!senha || senha == '') {
		return 'A senha é obrigatória';
	}
	if (!telefones || telefones == '') {
		return 'Adicione pelo menos um telefone';
	}
};

module.exports = verifyRegisterData;
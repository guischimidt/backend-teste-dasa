const verifyUpdateData = (nome, email, senha, telefones) => {

	if (nome == '') {
		return 'O nome não pode ser vazio';
	}
	if (email == '') {
		return 'O email não pode ser vazio';
	}
	if (senha == '') {
		return 'A senha não pode ser vazia';
	}
	if (telefones == '') {
		return 'Adicione pelo menos um telefone';
	}
};

module.exports = verifyUpdateData;
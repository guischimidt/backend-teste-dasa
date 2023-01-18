const verifySession = require('../../helpers/verify-session');
const verifyLoginData = require('../../helpers/verify-login-data');
const verifyRegisterData = require('../../helpers/verify-register-data');
const verifyUpdateData = require('../../helpers/verify-update-data');

describe('Teste de validade de sessão do usuário', () => {
	test('verifySession', () => {
		const exp_sessao = new Date(Date.now().valueOf() - (29 * 60000));
		expect(verifySession(exp_sessao)).toEqual(true);
	});
	test('verifySession', () => {
		const exp_sessao = new Date(Date.now().valueOf() - (31 * 60000));
		expect(verifySession(exp_sessao)).toEqual(false);
	});
});

describe('Teste para validar os dados para login', () => {
	test('Verificar email', () => {
		expect(verifyLoginData('', '123456')).toEqual('O email é obrigatório');
	});
	test('Verificar senha', () => {
		expect(verifyLoginData('teste@teste.com', '')).toEqual('A senha é obrigatória');
	});
});

describe('Teste para validar os dados para cadastro', () => {
	test('Verificar nome', () => {
		expect(verifyRegisterData('', 'teste@teste.com', '123456', [{ ddd: '15', numero: '123456789' }])).toEqual('O nome é obrigatório');
	});
	test('Verificar email', () => {
		expect(verifyRegisterData('Usuário Teste', '', '123456', [{ ddd: '15', numero: '123456789' }])).toEqual('O email é obrigatório');
	});
	test('Verificar senha', () => {
		expect(verifyRegisterData('Usuário Teste', 'teste@teste.com', '', [{ ddd: '15', numero: '123456789' }])).toEqual('A senha é obrigatória');
	});
	test('Verificar telefones', () => {
		expect(verifyRegisterData('Usuário Teste', 'teste@teste.com', '123456', '')).toEqual('Adicione pelo menos um telefone');
	});
});

describe('Teste para validar os dados para atualização de cadastro', () => {
	test('Verificar nome', () => {
		expect(verifyUpdateData('', 'teste@teste.com', '123456', [{ ddd: '15', numero: '123456789' }])).toEqual('O nome não pode ser vazio');
	});
	test('Verificar email', () => {
		expect(verifyUpdateData('Usuário Teste', '', '123456', [{ ddd: '15', numero: '123456789' }])).toEqual('O email não pode ser vazio');
	});
	test('Verificar senha', () => {
		expect(verifyUpdateData('Usuário Teste', 'teste@teste.com', '', [{ ddd: '15', numero: '123456789' }])).toEqual('A senha não pode ser vazia');
	});
	test('Verificar telefones', () => {
		expect(verifyUpdateData('Usuário Teste', 'teste@teste.com', '123456', '')).toEqual('Adicione pelo menos um telefone');
	});
});
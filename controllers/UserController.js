const User = require('../models/User');
const bcrypt = require('bcrypt');

require('dotenv').config();

const createUserToken = require('../helpers/create-user-token');
const verifySession = require('../helpers/verify-session');
const verifyLoginData = require('../helpers/verify-login-data');
const verifyRegisterData = require('../helpers/verify-register-data.js');
const verifyUpdateData = require('../helpers/verify-update-data');

module.exports = class UserController {

	static async sign_up(req, res) {
		const { nome, email, senha, telefones } = req.body;

		const verifiedRegister = verifyRegisterData(nome, email, senha, telefones);

		if (verifiedRegister) {
			return res.status(422).json({ mensagem: verifiedRegister });
		}

		const userExists = await User.findOne({ email: email });


		if (userExists) {
			res.status(422).json({ mensagem: 'E-mail já existente' });
			return;
		}

		const salt = await bcrypt.genSalt(12);
		const senhaHash = await bcrypt.hash(senha, salt);

		const user = new User({
			nome,
			email,
			senha: senhaHash,
			telefones
		});

		try {
			const newUser = await user.save();
			await createUserToken(newUser, req, res);
		}
		catch (error) {
			res.status(500).json({ mensagem: error });
		}
	}

	static async sign_in(req, res) {
		const { email, senha } = req.body;

		const verifiedLogin = verifyLoginData(email, senha);

		if (verifiedLogin) {
			return res.status(422).json({ mensagem: verifiedLogin });
		}

		const user = await User.findOneAndUpdate(
			{ email: email },
			{ '$set': { 'ultimo_login': Date.now() } },
			{ new: true });

		if (!user) {
			res.status(401).json({ mensagem: 'Usuário e/ou senha inválidos' });
			return;
		}

		const checkPassword = await bcrypt.compare(senha, user.senha);

		if (!checkPassword) {
			res.status(401).json({ mensagem: 'Usuário e/ou senha inválidos' });
			return;
		}

		await createUserToken(user, req, res);
	}

	static async buscar_usuario(req, res) {
		const user_id = req.params.user_id;

		const user = await User.findById(user_id).select('-senha');

		if (!user) {
			return res.status(422).json({ mensagem: 'Usuário não encontrado' });
		}

		const verified = verifySession(user.ultimo_login);

		if (verified) {
			return res.status(200).json({ user });
		} else {
			return res.status(401).json({ mensagem: 'Sessão inválida' });
		}

	}

	static async deletar_usuario(req, res) {
		const user_id = req.params.user_id;

		const user = await User.findById(user_id).select('-senha');

		if (!user) {
			return res.status(422).json({ mensagem: 'Usuário não encontrado' });
		}

		const verified = verifySession(user.ultimo_login);

		if (verified) {
			await User.findOneAndDelete({ _id: user_id });
			return res.status(200).json({ mensagem: 'Usuário deletado' });
		} else {
			return res.status(401).json({ mensagem: 'Sessão inválida' });
		}

	}

	static async atualizar_usuario(req, res) {
		const user_id = req.params.user_id;
		const { nome, email, senha, telefones } = req.body;

		const verifiedUpdate = verifyUpdateData(nome, email, senha, telefones);

		if (verifiedUpdate) {
			return res.status(422).json({ mensagem: verifiedUpdate });
		}

		const user = await User.findById(user_id).select('-senha');

		if (!user) {
			return res.status(422).json({ mensagem: 'Usuário não encontrado' });
		}

		const verified = verifySession(user.ultimo_login);

		if (verified) {
			if (nome) {
				user.nome = nome;
			}
			if (email !== user.email) {
				const userExists = await User.findOne({ email: email });

				if (userExists) {
					res.status(422).json({ mensagem: 'E-mail já existente' });
					return;
				} else {
					user.email = email;
				}
			}
			if (senha) {
				const salt = await bcrypt.genSalt(12);
				const senhaHash = await bcrypt.hash(senha, salt);

				user.senha = senhaHash;
			}
			if (telefones) {
				user.telefones = telefones;
			}

			try {
				await User.findOneAndUpdate(
					{ _id: user_id },
					{ $set: user },
					{ new: true },
				);
				res.status(200).json({ mensagem: 'Usuário atualizado com sucesso!' });

			} catch (err) {
				res.status(500).json({ mensagem: err });
				return;
			}

		} else {
			return res.status(401).json({ mensagem: 'Sessão inválida' });
		}
	}
};
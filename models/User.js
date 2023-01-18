const mongoose = require('../db/conn');
const crypto = require('crypto');
const { Schema } = mongoose;

const Users = mongoose.model(
	'Users',
	new Schema({
		_id: {
			type: String,
			default: crypto.randomUUID
		},
		nome: {
			type: String,
			required: true
		},
		email: {
			type: String,
			required: true,
		},
		senha: {
			type: String,
			required: true,
		},
		telefones: [
			{
				_id: false,
				numero: {
					type: Number
				},
				ddd: {
					type: Number
				},
			}
		],
		ultimo_login: {
			type: Date,
			default: Date.now
		}
	}, { timestamps: true },
	),
);

module.exports = Users;
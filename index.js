const express = require('express');
const app = express();
const cors = require('cors');

require('dotenv').config();

const port = process.env.PORT;

const UserRoutes = require('./routes/UserRoutes');

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'PATCH, GET, DELETE, POST');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, X-CSRF-Token');
	app.use(cors({ credentials: true, origin: '*' }));
	next();
});

app.use('/', UserRoutes);

app.use((req, res) => {
	res.status(404).json({
		mensagem: 'Endpoint inexistente, cheque a documentação de nossa API'
	});
});

app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));
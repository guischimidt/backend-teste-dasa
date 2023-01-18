const verifySession = (ultimo_login) => {
	const exp_sessao = new Date(ultimo_login.valueOf() + (30 * 60000));

	if (Date.now() >= exp_sessao) {
		return false;
	} else {
		return true;
	}

};

module.exports = verifySession;
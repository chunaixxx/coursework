module.exports = {
	async signin(req, res) {
		res.json({ msg: 'Signin' })
	},

	async signup(req, res) {
		res.json({ msg: 'Signup' })
	}
};

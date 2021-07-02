module.exports = {
	async create(req, res) {
		res.json({ msg: 'Create TODO' })
	},

	async read(req, res) {
		res.json({ msg: 'Read TODO' })
	},

	async update(req, res) {
		res.json({ msg: 'Update TODO' })
	},

	async delete(req, res) {
		res.json({ msg: 'Delete TODO' })
	},
};

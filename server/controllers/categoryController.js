module.exports = {
	async create(req, res) {
		res.json({ msg: 'Create CATEGORY' })
	},

	async read(req, res) {
		res.json({ msg: 'Read CATEGORY' })
	},

	async update(req, res) {
		res.json({ msg: 'Update' })
	},

	async delete(req, res) {
		res.json({ msg: 'Delete CATEGORY' })
	}
}
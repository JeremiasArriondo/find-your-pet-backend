module.exports = (res, status, data, errors = '') =>
	res.status(status).send({
		status: status < 400 ? true : false,
		data,
		errors,
});
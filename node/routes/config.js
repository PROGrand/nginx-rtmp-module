let express = require('express');
let fs = require('fs');
let router = express.Router();

String.prototype.isAlphaNumeric = function () {
	let regExp = /^[A-Za-z0-9]+$/;
	return (this.match(regExp));
};

/* POST config. */
router.post('/', function (req, res, next) {
	let params = req.body;

	if (!params.name.isAlphaNumeric()) {
		let err = new Error('Bad Request');
		err.status = 400;
		next(err);
		return;
	}


	let file_path = (process.env.NGINX_DIR || __dirname) + "/forward/" + params.name;

	fs.open(file_path, 'w', (err, file) => {

		params.rtmp.map((line) => {
			fs.writeSync(file, line);
			fs.writeSync(file, "\n");
		});

		fs.close(file, () => {
			res.send(params);
		});

		console.log(params);
	});

});

module.exports = router;

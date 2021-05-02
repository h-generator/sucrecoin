const {
	startStorage,
	app,
	exchange,
	encoder
} = require('./components');
const { miner } = require('./config.json');

(async () => {
	try {
		encoder.setSecret(miner.secret);
		await startStorage();
		await exchange.miner.server.setupMiner();
		app.listen(3000);
	} catch (err) {
		console.log(err);
	}
})();

var test = require('crypto').createHash('sha256').update('sucrecoin').digest('hex');
console.log(test);

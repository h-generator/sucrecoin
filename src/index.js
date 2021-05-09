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
		encoder.encrypt({ test:"test" });
	} catch (err) {
		console.log(err);
	}
})();

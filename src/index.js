const {
	startStorage,
	app,
	miner,
	encoder
} = require('./components');
const config = require('./config.json');

(async () => {
	try {
		encoder.setSecret(config.miner.secret);
		//await startStorage();
		await miner.server.setupMiner();
		app.listen(3000);
	} catch (err) {
		console.log(err);
	}
})();

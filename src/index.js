const {
	startStorage,
	blockchain,
	app,
	miner,
	encoder
} = require('./components');
const config = require('./config.json');
const genesis = require('./genesis.json');

(async () => {
	try {
		await startStorage();
		encoder.setSecret(config.miner.secret);
		await miner.server.start(config.miner.server.port);
		await blockchain.start(genesis);
		app.listen(3000);
	} catch (err) {
		console.log(err);
	}
})();

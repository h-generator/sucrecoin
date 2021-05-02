var express = require('express');

var router = express.Router()

router.get('/', (req, res) => {
  res.json({ version: '1' });
})

// router.use('/admin', admin);

module.exports = {
  router
};


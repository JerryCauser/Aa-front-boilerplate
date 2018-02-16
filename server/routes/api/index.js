const router = require('express').Router();
const statusRoutes = require('./status');

router.use('/status', statusRoutes);

module.exports = router;
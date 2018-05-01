const express = require('express');
const tokenController = require('../controllers/token');

const router = express.Router();

router.post('/verifyToken', tokenController.verifyToken);

module.exports = router;
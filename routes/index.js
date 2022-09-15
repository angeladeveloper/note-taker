const express = require('express');
const router = require('express').Router();
const path = require('path');

// Import our modular routers for /tips and /feedback
const apiRouter = require('./api');
const homeRouter = require('./home');


router.use('/api', apiRouter);
router.use('/', homeRouter);

// Wildcard route to direct users to a 404 page
router.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '../public/pages/404.html'))
);

module.exports = router;

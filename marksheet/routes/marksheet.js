var express = require('express');
var router = express.Router();

router.get('/formpage', function (req, res) {
    res.render('formpage');
});

module.exports = router;
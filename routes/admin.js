var express = require('express');
var router = express.Router();
var pool = require('./pool')
var upload = require('./multer')

router.post("/chk_company_login", function (req, res) {
    pool.query("SELECT * FROM adminlogin WHERE (adminemail=? OR adminnumber=?) AND password=? AND status='verified'", [req.body.emailaddress,req.body.emailaddress, req.body.password], function (error, result) {
      
        if (error) {
            console.log(error);
            return res.status(500).json({ status: false, message: "Server error...." });
        }
        else if (result.length === 0) {
            return res.status(200).json({ status: true, message: "Invalid email address/mobile number/password" });
        }
        else {
            return res.status(200).json({ status: true, data: result, message: "Valid login" });
        }
    });
});


module.exports = router;
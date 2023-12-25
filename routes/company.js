var express = require('express')
var router = express.Router();
var upload = require("./multer");
var pool = require("./pool");

router.post("/add_new_company", upload.single('defaultlogo'), function (req, res) {

    pool.query("insert into company ( companyname, ownername, emailaddress, mobilenumber, address, state, city, logo, password, status, createat, updateat, createby)values(?,?,?,?,?,?,?,?,?,?,?,?,?)", [req.body.companyname, req.body.ownername, req.body.emailaddress, req.body.mobilenumber, req.body.address, req.body.state, req.body.city, req.file.originalname, req.body.password, req.body.status, req.body.createat, req.body.updateat, req.body.createdby], function (error, result) {

        if (error) {
            console.log("xxxxxxx", error)
            res.status(500).json({ status: false, message: "Server error...." });
        }
        else {
            console.log(result)
            res.status(200).json({ status: true, message: "company registered succesfully" });
        }
    })
});

router.post("/edit_new_company", function (req, res) {

    pool.query("update company set companyname=?, ownername=?, emailaddress=?, mobilenumber=?, address=?, state=?, city=?,password=?, status=?,updateat=?, createby=? where companyid=?", [req.body.companyname, req.body.ownername, req.body.emailaddress, req.body.mobilenumber, req.body.address, req.body.state, req.body.city, req.body.password, req.body.status, req.body.updateat, req.body.createdby, req.body.companyid], function (error, result) {

        if (error) {
            res.status(500).json({ status: false, massage: "Server error...." });
        }
        else {
            console.log(result)
            res.status(200).json({ status: true, message: "company updated succesfully" });
        }
    })
});

router.post("/edit_company_logo", upload.single("logo"), function (req, res) {
    pool.query("update company set logo=? where companyid=?", [req.file.originalname, req.body.companyid], function (error, result) {
        if (error) {
            console.log(error)
            res.status(500).json({ status: false, massage: "Server error...." });
        }
        else {
            console.log(result)
            res.status(200).json({ status: true, message: "update logo succesfully" });
        }
    })
});

router.post("/delete_company_details", function (req, res) {
    pool.query("delete from company where companyid=?", [req.body.companyid], function (error, result) {
        if (error) {
            console.log(error)
            res.status(500).json({ status: false, massage: "Server error...." });
        }
        else {
            console.log(result)
            res.status(200).json({ status: true, message: "Delete company succesfully" });
        }
    })
});

router.get("/fetch_all_companies", function (req, res) {

    pool.query("select C.*,(select S.statename from states S  where S.stateid=C.state)as statename,(select CC.cityname from cities CC where CC.cityid=c.city)as cityname From company C", function (error, result) {

        if (error) {
            console.log(error)
            res.status(500).json({ status: false, massage: "Server error...." });
        }
        else {

            res.status(200).json({ status: true, data: result });
        }
    })
});


module.exports = router;
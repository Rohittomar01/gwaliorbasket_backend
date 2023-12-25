var express = require('express');
var router = express.Router();
var pool = require('./pool')
var upload = require('./multer');

router.post("/add_new_user",function (req, res) {

    pool.query("select * from user where usernumber=?",[req.body.number],function (error, result) {

        if (error) {
            console.log("xxxxxxx", error)
            res.status(500).json({ status: false, message:"Server error...."});
        }
        else {
            if(result.lenth==1){
                res.status(200).json({ status: 1, message: "Welcome....",data:result });
            }
            else{
                pool.query("insert into user (usernumber) value(?)",[req.body.number],function(reslt,err){
                    if(err){
                        res.status(600).json({status:false,message:'Server error....'})
                    }
                    else{
                    res.status(200).json({ status: 2, message: "Submit Data Succesfully",data:{insertId:reslt.insertId,number:req.body.number}});
                    }
                });
            }
          
        }
    })
});

router.post("/insert_userAddress", function (req, res) {

    pool.query("insert into user_address(username, usernumber, userstate, usercity, userzipcode, useraddress)value(?,?,?,?,?,?) ", [req.body.userName,req.body.userNumber,req.body.userState,req.body.userCity,req.body.userZipcode,req.body.userAddress], function (error, result) {

        if (error) {
            console.log("xxxxxxx", error)
            res.status(500).json({ status: false, message: "Server error...." });
        }
        else {
            console.log(result)
            res.status(200).json({ status: true, message: "Submitted...." });
        }
    })
});

module.exports = router;

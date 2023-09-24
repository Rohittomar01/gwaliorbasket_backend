// const { router } = require("../app");
var express = require('express')
var router = express.Router()
// var multer =require("./multer");
var pool = require("./pool");

 router.get("/fetch_all_state",function(req,res){

    pool.query("select * From states",function(error,result){

        if(error)
       
        { 
            res.status(500).json({status:false,massage:"Server error...."});
        }
        else{
            
            res.status(200).json({status:true,data:result});
        }
    })
});
router.post("/fetch_all_cities",function(req,res){

    pool.query("select * from cities where stateid=?",[req.body.stateid],function(error,result){

        if(error)
        {
            res.status(500).json({status:false,massage:"Server error...."})
        }
        else{
            res.status(200).json({status:true,data:result}) 
        }
    })
});


router.get("/fetch_all_Company",function(req,res){

    pool.query("select * From company",function(error,result){

        if(error)
       
        {  console.log(error)
            res.status(500).json({status:false,massage:"Server error...."});
        }
        else{
            
            res.status(200).json({status:true,data:result});
        }
    })
});
module.exports = router;
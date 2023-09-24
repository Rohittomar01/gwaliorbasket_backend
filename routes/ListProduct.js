var express = require('express')
var router = express.Router();
var upload = require("./multer");
var pool = require("./pool");



router.get('/fetch_catogeryid', function (req, res) {

    pool.query('select * from categories', function (error, result) {

        if (error) {
            console.log(error)
            res.status(500).json({ status: false, message: 'Server Error' })
        }
        else {
            res.status(200).json({ status: true, data: result, message: 'fetch Succesfully' })
            console.log(result)
        }

    })

});
router.get('/fetch_all_Product', function (req, res, next) {
    const categoryid = req.params.body;

    console.log("categoryid", categoryid);

    console.log("body", req.body.categoryId)

    pool.query("select * from products where categoryid=6", [req.body.categoryId], function (error, result) {
        if (error) {
            console.log(error)
            res.status(500).json({ status: false, message: 'Server error....' })
        }
        else {
            console.log(result)
            res.status(200).json({ status: true, data: result })
        }

    })
});


router.post('/submit_data', upload.any(), function (req, res, next) {

    console.log('body', req.body);
    var file_str = '';
    req.body.images.map((item) => {
        file_str += item.path + ','
    })
    pool.query("INSERT INTO listproduct ( categoryid, productid, weight, price, offerprice, description,images,companyid , updatedat, createdat, createdby) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [req.body.categoryid, req.body.productid, req.body.weight, req.body.price, req.body.offerprice, req.body.description, file_str, req.body.offerprice, req.body.createdat, req.body.updatedat, req.body.createdby, req.body.companyid], function (error, result) {
     
        console.log('file', file_str);
        if (error) {
            console.log(error)
            // console.log("1", req.body.categoryid)
            res.status(500).json({ status: false, message: 'Server error....' })
        }
        else {
            console.log(result)
            // console.log("2", req.body.categoryid)
            res.status(200).json({ status: true, message: 'Submit Successfully' })
        }
    })
});
router.post('/update_listproduct', function (req, res, next) {

    pool.query("UPDATE listproduct SET catogeryid=?, productid=?, weight=?, price=?, offerprice=?, description=?, companyid=? , updatedat=?, createdby=? WHERE productlistid=?", [req.body.category, req.body.product, req.body.weight, req.body.price, req.body.offerprice, req.body.description, req.body.companyid, req.body.updatedat, req.body.createdby, req.body.productListId], function (error, result) {

        if (error) {
            console.log(error)
            // console.log("1", req.body.categoryid)
            res.status(500).json({ status: false, message: 'Server Error....' })
        }
        else {
            console.log(result)
            // console.log("2", req.body.categoryid)
            res.status(200).json({ status: true, message: 'Updated Successfully' })
        }
    })
});


//  for Fetch list product 

router.get('/fetchlistproduct', function (req, res) {

    pool.query('select * from listproduct', function (error, result) {
        if (error) {
            res.status(500).json({ status: false, message: 'Server Error' })
        }
        else {
            res.status(200).json({ status: true, data: result, message: 'Succesfully Fetch' })
        }
    })
});
router.post('/delete_listproduct_details', function (req, res) {

    pool.query('DELETE FROM listproduct WHERE productlistid=?', [req.body.productlistid], function (error, result) {
        if (error) {
            res.status(500).json({ status: false, message: 'Server Error' })
        }
        else {
            res.status(200).json({ status: true, message: 'Succesfully Delete' })
        }
    })
})
router.get('/fetchallproducts', function (req, res, next) {
    // console.log(req.body.categoryid)
    pool.query("select * from listproduct where categoryid='6'", function (error, result) {
        if (error) {
            console.log(error)
            res.status(500).json({ status: false, message: 'Server error....' })
        }
        else {
            res.status(200).json({ status: true, data: result })
        }

    })
});


module.exports = router;
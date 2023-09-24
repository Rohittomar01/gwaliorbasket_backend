var express = require('express');
var router = express.Router();
var pool = require('./pool')
var upload = require('./multer')

router.post('/submit_banner', upload.any(), function (req, res, next) {

    var file_str = '';
    req.body.images.map((item) => {
        file_str += item.path + ','
    })
    pool.query("INSERT INTO banner (companyid, images, status, createdat, createdby, updatedat) VALUES ( ?, ?, ?, ?, ?, ?)", [req.body.companyid, file_str, req.body.status, req.body.createdat, req.body.createdby, req.body.updatedat], function (error, result) {


        console.log('body', req.body);
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

//  for Fetch list product 

router.get('/fetch_all_banner', function (req, res) {

    pool.query('SELECT * FROM banner ', function (error, result) {
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


module.exports = router;
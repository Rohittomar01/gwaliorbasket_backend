var express = require('express');
var router = express.Router();
var pool = require('./pool')
var upload = require('./multer')

/* GET users listing. */
router.post('/add_new_product', upload.single('image'), function (req, res, next) {
  console.log(req.body)
  console.log(req.file)
  pool.query("insert into products(companyid, categoryid, productname, description, pricetype, trending, deals, image, status, createdat, updatedat, createdby)values(?,?,?,?,?,?,?,?,?,?,?,?)", [req.body.companyid, req.body.categoryid, req.body.productname, req.body.description, req.body.pricetype, req.body.trending, req.body.deals, req.file.originalname, req.body.status, req.body.createdat, req.body.updateat, req.body.createdby], function (error, result) {
    if (error) {
      console.log("xxxxx" + error)
      res.status(200).json({ status: false, message: 'Server error....' })
    }
    else {
      res.status(200).json({ status: true, message: 'Product Added Successfully' })
    }

  })
});


router.post('/edit_product', function (req, res, next) {
  pool.query("update products set companyid=?, categoryid=?, productname=?, description=?, pricetype=?, trending=?, deals=?, status=?, updatedat=?, createdby=? where productid=?", [req.body.companyid, req.body.categoryid, req.body.productname, req.body.description, req.body.pricetype, req.body.trending, req.body.deals, req.body.status, req.body.updateat, req.body.createdby, req.body.productid], function (error, result) {
    if (error) {
      console.log("xxxxx" + error)
      res.status(200).json({ status: false, message: 'Server error....' })
    }
    else {
      res.status(200).json({ status: true, message: 'Product Updated Successfully' })
    }

  })
});


router.post('/edit_product_image', upload.single('image'), function (req, res, next) {
  pool.query("update products set image=? where productid=?", [req.file.originalname, req.body.productid], function (error, result) {
    if (error) {
      console.log(error)
      res.status(200).json({ status: false, message: 'Server error....' })
    }
    else {
      res.status(200).json({ status: true, message: 'Image Updated' })
    }

  })
});

router.post('/delete_product', function (req, res, next) {
  pool.query("delete from products   where productid=?", [req.body.productid], function (error, result) {
    if (error) {
      console.log(error)
      res.status(200).json({ status: false, message: 'Server error....' })
    }
    else {
      res.status(200).json({ status: true, message: 'Product Deleted Successfully' })
    }

  })
});

router.get('/fetch_all_category', function (req, res, next) {
  pool.query("select * from categories ", function (error, result) {
    if (error) {
      res.status(500).json({ status: false, message: 'Server error....' })
    }
    else {
      res.status(200).json({ status: true, data: result })
    }

  })
});


router.get('/fetch_all_pricetype', function (req, res, next) {
  pool.query("select * from price", function (error, result) {
    if (error) {
      res.status(500).json({ status: false, message: 'Server error....' })
    }
    else {
      res.status(200).json({ status: true, data: result })
    }

  })
});

router.get('/fetch_all_DealsProducts', function (req, res, next) {
  pool.query("select * from products where deals='yes'", function (error, result) {
    if (error) {
      console.log(error)
      res.status(500).json({ status: false, message: 'Server error....' })
    }
    else {
      res.status(200).json({ status: true, data: result })
    }

  })
});
// for favourate picks page in userinterface 

router.get('/fetch_all_TrendingProducts', function (req, res, next) {
  pool.query("select * from products where trending='yes'", function (error, result) {
    if (error) {
      console.log(error)
      res.status(500).json({ status: false, message: 'Server error....' })
    }
    else {
      res.status(200).json({ status: true, data: result })
    }

  })
});

// for trending products page in userinterface 



module.exports = router;
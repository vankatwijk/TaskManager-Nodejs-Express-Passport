const express = require('express');
const router = express.Router();
const mysql = require('mysql')// mysql db package
const checkAuth = require('../middleware/check-auth')

const pool = mysql.createPool({
  connectionLimit:10,
  host: 'localhost',
  user: 'root',
  password: 'pieter8883',
  database: 'testdb'
})

function getConnection(){
  return pool;
}

router.get('/',(req, res, next) => {
  res.status(200).json({
    message: '/products GET page'
  });
});

router.post('/',checkAuth,(req, res, next) => {
  const product = {
    name: req.body.name,
    price: req.body.price
  }

  res.status(201).json({
   message: '/products POST page',
   createdProduct: product
  });


});

router.get('/:productId',(req, res, next) => {
  const id = req.params.productId;
  if(id === 'special'){

    res.status(200).json({
      message: 'we got your special id',
      id: id
    });
  }else{

    res.status(200).json({
      message: 'not sure what this is id',
      id: id
    });
  }
});

router.patch('/:productId',(req, res, next) => {
  res.status(200).json({
    message: 'update product'
  });
});

router.delete('/:productId',(req, res, next) => {
  res.status(200).json({
    message: 'delete product'
  });
});

module.exports = router;

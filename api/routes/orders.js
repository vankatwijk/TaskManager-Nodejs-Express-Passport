const express = require('express');
const router = express.Router();

router.get('/',(req, res, next) => {
  res.status(200).json({
    message: '/order GET page'
  });
});

router.post('/',(req, res, next) => {
  const order = {
    productid : req.body.productId,
    quantity: req.body.quantity
  }
  res.status(201).json({
    message: '/order POST page',
    order: order
  });
});

router.get('/:orderId',(req, res, next) => {
  const id = req.params.orderId;
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

router.patch('/:orderId',(req, res, next) => {
  res.status(200).json({
    message: 'update order'
  });
});

router.delete('/:orderId',(req, res, next) => {
  res.status(200).json({
    message: 'delete order'
  });
});

module.exports = router;

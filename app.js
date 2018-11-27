const express = require('express');//framwork
const app = express();
const morgan = require('morgan');// logging request
const bodyParser = require('body-parser'); //package for getting url encodings GET POST request
//const nodeadmin = require('nodeadmin');//mysql database managment package
//app.use(nodeadmin(app)); //mysql database managment package



//const productRoutes =  require('./api/routes/products');
//const ordersRoutes =  require('./api/routes/orders');
const users =  require('./api/routes/users');
const traders =  require('./api/routes/traders');
const admins =  require('./api/routes/admin');
//const roles =  require('./api/routes/roles');

app.use(morgan('dev'));// format for morgan logging
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


//Cors error handling
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
      return res.status(200).json({});
  }
  next();
});

//routes to handle request
//app.use('/products',productRoutes);
//app.use('/orders',ordersRoutes);
app.use('/users',users);
app.use('/traders',traders);
app.use('/admin',admins);
//app.use('/admin',roles);


//error handling
app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

//handles all other error request
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error:{
      message: error.message
    }
  });
});


module.exports = app;

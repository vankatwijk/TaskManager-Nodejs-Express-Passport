
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const mysqlconnect = require('../middleware/db')


  function emailExist(email,callback){
    const queryString = "Select * From Users WHERE Email='"+email+"'";
    mysqlconnect.getConnection().query(queryString,(err,rows,fields) =>{
      return callback(rows.length,rows);
    })
  }

  exports.default = (req, res, next) => {
    res.status(200).json({
      message: '/users'
    });
  }


  exports.signup = (req, res, next) => {
    //register new user
    const newuser = {
      email: req.body.email,
      password: req.body.password
    }

    emailExist(newuser.email,(numberofusers,userArray)=>{
      console.log("number of users : "+numberofusers);
      //check if user exist
      if(numberofusers>0){
        console.log("user already exist ")
        return res.status(201).json({
          message: 'user already exist',
          createduser: newuser
        });

      }else{
        //add user

        console.log("user pass "+newuser.password);
        bcrypt.hash(newuser.password,10,(err,hash)=>{
          if(err){
            return res.status(500).json({
              error: err
            })
          }else{
            //if there was no error hashing the password then we can store this user
            const queryString = "INSERT INTO Users (Email,PasswordHash,CreatedAt) VALUES ('"+newuser.email+"','"+hash+"',NOW())"
            mysqlconnect.getConnection().query(queryString,[],(err,results,fields) =>{
              if(err){
               console.log("failed to insert new user "+err)
               return res.sendStatus(500)
             }

             res.status(201).json({
               message: '/new user added',
               createduser: newuser
             });

            })

          }
        })
      }

    })


  }

  exports.login = (req, res, next) => {
    //register new user
    const loginuser = {
      email: req.body.email,
      password: req.body.password
    }

    emailExist(loginuser.email,(numberofusers,userArray)=>{
      console.log("number of users : "+numberofusers);
      //check if user exist
      if(numberofusers>0){
        console.log("user already exist ")
        //check if password entered is the same as in the database

        console.dir(userArray[0].Email)
        bcrypt.compare(loginuser.password,userArray[0].PasswordHash,(err,result)=>{
          if(err){
            console.log("can't Auth ")
            return res.status(201).json({
              message: 'can\'t Auth'
            });
          }
          if(result){

            const token = jwt.sign({
              email:userArray[0].Email,
              userid:userArray[0].UserID
            },process.env.JWT_KEY,
            {
              expiresIn:"1h"
            }
            )

            //update last login
            const queryString = "UPDATE Users Set LastLoggedAt = NOW() WHERE UserID = '"+userArray[0].UserID+"'";
            mysqlconnect.getConnection().query(queryString,[],(err,results,fields) =>{
              if(err){
               console.log("failed: update LastLoggedAt time stamp "+err)
             }else{
               console.log("sucess: update LastLoggedAt time stamp")

             }
            })

            //update logging history
            const queryString2 = "INSERT INTO LoggingHistory (UserID,IPAddress,UserAgent,CreatedAt) VALUES ("+userArray[0].UserID+",'"+req.connection.remoteAddress+"','"+req.headers['user-agent']+"',NOW())";
            mysqlconnect.getConnection().query(queryString2,[],(err,results,fields) =>{
              if(err){
               console.log("failed: update login history "+err)
             }else{
               console.log("sucess: update login history"+req.connection.remoteAddress)

             }
            })

            console.log("you're login !!!")
            return res.status(201).json({
              message: 'you\'re login !!!',
              token: token
            });



          }
          console.log("Failed Auth ")
          return res.status(201).json({
            message: 'Failed Auth'
          });
        })
      }else{
        console.log("can't Auth ")
        return res.status(201).json({
          message: 'can\'t Auth'
        });

      }

    })


  }

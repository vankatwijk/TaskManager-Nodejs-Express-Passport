
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const models = require('../../models');




function emailExist(email,callback){
  models.Users.findAll({
      where: {Email: email}
  }).then(function(result){
    return callback(result.length,result);
  }).catch(function(error){
    //no results
    return callback(0,{});
  });
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
      bcrypt.hash(newuser.password,10,(err,hash)=>{
        if(err){
          return res.status(500).json({
            error5: err
          })

        }else{
          models.Users.build({
            Email: newuser.email,
            PasswordHash: hash
          })
          .save()
          .then(function(task){
            //add to the traders table

            res.status(201).json({
              message: '/new trader added',
              createduser: newuser
            });
          })
          .catch(function(error){
            console.log("failed to insert new user "+err)
            return res.sendStatus(500)
          });


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
        models.Users.update(
          {LastLoggedAt: Date()},
          {where: {UserID: userArray[0].UserID}}
        ).then(function(rowsUpdated) {
          console.log(rowsUpdated);
        })
        .catch(function(error){
          console.log("could not update");
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

//const mysql = require('mysql')// mysql db package
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const models = require('../models');


function userIDExist(userid, callback) {
  models.Users.findAll({
    where: {
      UserID: userid
    }
  }).then(function (result) {
    return callback(result.length, result);
  }).catch(function (error) {
    //no results
    return callback(0, {});
  });
}

function emailExist(email, callback) {
  models.Users.findAll({
    where: {
      Email: email
    }
  }).then(function (result) {
    return callback(result.length, result);
  }).catch(function (error) {
    //no results
    return callback(0, {});
  });
}


exports.getuserinfo = (req, res, next) => {

  const decoded = req.userData;
  console.log("login user information")

  // you can only update user information if you are admin or you are updating your own information
  if (!req.body.hasOwnProperty('UserID')) {
        emailExist(decoded.email, (numberofusers, userArray) => {
          if (numberofusers > 0) {
            return res.status(201).json(userArray);
          } else {
            console.log("no user")
          }
        })
  }else if ((req.userData.isadmin == true) || (req.userData.userid == req.body.UserID)) {
        userIDExist(req.body.UserID, (numberofusers, userArray) => {
          if (numberofusers > 0) {
            return res.status(201).json(userArray);
          } else {
            console.log("no user")
          }
        })
  } else {
    //you don't have permition to update this information
    console.log("invalid_grant")
    return res.status(201).json({
      message: 'invalid_grant'
    });
  }
  

  emailExist(decoded.email, (numberofusers, userArray) => {
    if (numberofusers > 0) {
      console.log("current user")
      return res.status(201).json({
        message: 'user information',
        UserID: userArray[0].UserID,
        Email: userArray[0].Email,
        IsAdmin: userArray[0].IsAdmin,
        FirstName: userArray[0].FirstName,
        LastName: userArray[0].LastName,
        Address: userArray[0].Address,
        DateofBirth: userArray[0].DateofBirth,
        PostalCode: userArray[0].PostalCode,
        KYC: userArray[0].KYC,
        LastLoggedAt: userArray[0].LastLoggedAt,
        createdAt: userArray[0].createdAt,
        updatedAt: userArray[0].updatedAt
      });
    } else {
      console.log("no user")
    }
  })


  //return res.status(201).json(decoded);
}



exports.signup = (req, res, next) => {
  //register new user

  // check input values
  req.check('email', 'Invalid email address').isEmail();
  req.check('password', 'password is invalid or to short').isLength({
    min: 6
  }).equals(req.body.password);
  var errors = req.validationErrors();
  if (errors) {
    req.session.error = errors;
    console.log("failed to insert new user ")
    return res.status(500).json(errors)
  }

  // if check is okay start inserting new user
  const newuser = {
    email: req.body.email,
    password: req.body.password,
    FirstName: (req.body.hasOwnProperty('firstname') ? req.body.firstname : ''),
    LastName: (req.body.hasOwnProperty('lastname') ? req.body.lastname : ''),
    Address: (req.body.hasOwnProperty('address') ? req.body.address : ''),
    DateofBirth: (req.body.hasOwnProperty('dateofbirth') ? req.body.dateofbirth : ''),
    PostalCode: (req.body.hasOwnProperty('postalcode') ? req.body.postalcode : ''),
    IsAdmin: (req.body.hasOwnProperty('isadmin') ? req.body.isadmin : '0'),
    KYC: '0'
  }

  emailExist(newuser.email, (numberofusers, userArray) => {
    console.log("number of users : " + numberofusers);
    //check if user exist
    if (numberofusers > 0) {
      console.log("user already exist ")
      return res.status(201).json({
        message: 'user already exist',
        createduser: newuser
      });

    } else {
      //add user
      bcrypt.hash(newuser.password, 10, (err, hash) => {
        if (err) {
          return res.status(500).json({
            error5: err
          })

        } else {
          models.Users.build({
              Email: newuser.email,
              PasswordHash: hash,
              IsAdmin: 0,
              FirstName: newuser.FirstName,
              LastName: newuser.LastName,
              Address: newuser.Address,
              DateofBirth: newuser.DateofBirth,
              PostalCode: newuser.PostalCode,
              IsAdmin: newuser.Isadmin,
              KYC: newuser.KYC
            })
            .save()
            .then(function (task) {
              //add to the traders table

              res.status(201).json({
                message: 'User added',
                createduser: newuser
              });
            })
            .catch(function (error) {
              console.log("failed to insert new user " + err)
              return res.sendStatus(500)
            });


        }


      })
    }

  })


}

exports.login = (req, res, next) => {
  // check input values
  req.check('email', 'Invalid email address').isEmail();
  req.check('password', 'password is invalid or to short').isLength({
    min: 3
  }).equals(req.body.password);
  var errors = req.validationErrors();
  if (errors) {
    req.session.error = errors;
    console.log("failed to verify user ")
    return res.status(500).json(errors)
  }

  const loginuser = {
    email: req.body.email,
    password: req.body.password
  }

  emailExist(loginuser.email, (numberofusers, userArray) => {
    console.log("number of users : " + numberofusers);
    //check if user exist
    if (numberofusers > 0) {
      console.log("user already exist ")
      //check if password entered is the same as in the database

      console.dir(userArray[0].Email)
      bcrypt.compare(loginuser.password, userArray[0].PasswordHash, (err, result) => {
        if (err) {
          console.log("invalid_grant")
          return res.status(201).json({
            message: 'invalid_grant bad pass'
          });
        }
        if (result) {

          const token = jwt.sign({
            email: userArray[0].Email,
            userid: userArray[0].UserID,
            isadmin: userArray[0].IsAdmin,
            role:'notset'
          }, process.env.JWT_KEY, {
            expiresIn: "24h"
          })
            models.Users.update({
              LastLoggedAt: Date()
            }, {
              where: {
                UserID: userArray[0].UserID
              }
            }).then(function (rowsUpdated) {
              console.log(rowsUpdated);
            })
            .catch(function (error) {
              console.log("Could not update");
            })

          if (userArray[0].IsAdmin==true) {


            models.AdminRegionRoles.hasMany(models.Regions, {
              foreignKey: 'RegionID'
            })
            models.AdminRegionRoles.hasMany(models.Roles, {
              foreignKey: 'RoleID'
            })
            models.Regions.belongsTo(models.AdminRegionRoles, {
              foreignKey: 'RegionID'
            })
            models.Roles.belongsTo(models.AdminRegionRoles, {
              foreignKey: 'RoleID'
            })

            models.AdminRegionRoles.findAll({
              where: {
                AdminID: userArray[0].UserID
              },
              include: [models.Regions, models.Roles]
            }).then(function (regionrole) {

              console.log("Access granted")
              return res.status(201).json({
                message: 'granted',
                isadmin: userArray[0].IsAdmin,
                role: 'notset',
                token: token,
                regionrole: regionrole
              });

            }).catch(function (error) {
              //no results
              console.log("failed to get region role" + error)
              return res.sendStatus(500)
            });
          } else {

            console.log("Access granted")
            return res.status(201).json({
              message: 'granted',
              isadmin: userArray[0].IsAdmin,
              role: 'notset',
              token: token
            });

          }

        } else {
          console.log("Failed Auth ")
          return res.status(201).json({
            message: 'invalid_grant'
          });
        }
      })
    } else {
      console.log("can't Auth ")
      return res.status(201).json({
        message: 'invalid_grant'
      });

    }

  })

}
exports.updateuserinfo = (req, res, next) => {
  //must be login first
  //jwt header must be set

  //console.log('---------');
  //console.log(req.userData);
  //console.log('---------');

  // you can only update user information if you are admin or you are updating your own information
  if ((req.userData.isadmin == true) || (req.userData.userid == req.body.UserID)) {
    if (req.body.hasOwnProperty('UserID')) {

      userIDExist(req.body.UserID, (numberofusers, updatingUserArray) => {

          if (numberofusers > 0) {
            console.log('we found the user');
            //if email and/or password are going to be changed  // check input values
            if (req.body.hasOwnProperty('email')) {
              req.check('email', 'Invalid email address').isEmail();
            }
            if (req.body.hasOwnProperty('password')) {
              req.check('password', 'password is invalid or to short').isLength({
                min: 6
              }).equals(req.body.password);
            }
            var errors = req.validationErrors();
            if (errors) {
              req.session.error = errors;
              console.log("failed to update user information, validation")
              return res.status(500).json(errors)
            }

            //if password needs to be reset
            if (req.body.hasOwnProperty('password')) {
              bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) {
                  return res.status(500).json({
                    error5: err
                  })

                } else {

                models.Users.update({
                    PasswordHash: hash,
                  }, {
                    where: {
                      UserID: req.body.UserID
                    }
                  }).then(function (rowsUpdated) {
                    console.log(rowsUpdated);
                  })
                  .catch(function (error) {
                    console.log("Could not update users password");
                  })

                }


              })
            }

            // if check is okay update user information
            const updateuser = {
              Email: (req.body.hasOwnProperty('email') ? req.body.email : updatingUserArray.Email),
              FirstName: (req.body.hasOwnProperty('firstname') ? req.body.firstname : updatingUserArray.FirstName),
              LastName: (req.body.hasOwnProperty('lastname') ? req.body.lastname : updatingUserArray.LastName),
              Address: (req.body.hasOwnProperty('address') ? req.body.address : updatingUserArray.Address),
              DateofBirth: (req.body.hasOwnProperty('dateofbirth') ? req.body.dateofbirth : updatingUserArray.DateofBirth),
              PostalCode: (req.body.hasOwnProperty('postalcode') ? req.body.postalcode : updatingUserArray.PostalCode),
              IsAdmin: (req.body.hasOwnProperty('isadmin') ? req.body.isadmin : updatingUserArray.IsAdmin),
              KYC: (req.body.hasOwnProperty('KYC') ? req.body.KYC : updatingUserArray.KYC)
            }

            models.Users.update(updateuser, {
              where: {
                UserID: req.body.UserID
              }
            }).then(function (rowsUpdated) {
              console.log(rowsUpdated);
              return res.status(201).json({
                message: 'Update done',
                userinfo: updateuser
              });
            })
            .catch(function (error) {
              console.log("Could not update users information");
            })


          } else {
            console.log("UserID does not exist")
            return res.status(201).json({
              message: 'UserID does not exist'
            });
          }

        })

      }
      else {
        console.log("Please provide UserID")
        return res.status(201).json({
          message: 'Please provide UserID'
        });
      }
  } else {
    //you don't have permition to update this information
    console.log("invalid_grant")
    return res.status(201).json({
      message: 'invalid_grant'
    });
  }

}


exports.setrole = (req, res, next) => {
  // you can only update user information if you are admin or you are updating your own information
  if ((req.userData.isadmin == true) || (req.userData.userid == req.body.UserID)) {
    if (req.body.hasOwnProperty('UserID') && req.body.hasOwnProperty('RegionID') && req.body.hasOwnProperty('RoleID')) {

        models.AdminRegionRoles.build({
          AdminID: req.body.UserID,
          RegionID: req.body.RegionID,
          RoleID: req.body.RoleID
        })
        .save()
        .then(function (task) {
          //add to the traders table

          res.status(201).json({
            message: 'inserted region role'
          });
        })
        .catch(function (error) {
          console.log("failed to insert region role " + err)
          return res.sendStatus(500)
        });

    }else{
      console.log("failed to insert region role")
      return res.sendStatus(500)
    }
  } else {
    //you don't have permition to update this information
    console.log("invalid_grant")
    return res.status(201).json({
      message: 'invalid_grant'
    });
  }

}

exports.getrole = (req, res, next) => {
  // you can only update user information if you are admin or you are updating your own information
  if ((req.userData.isadmin == true) || (req.userData.userid == req.body.UserID)) {
    if (req.body.hasOwnProperty('UserID')) {

      var roleregion = {};


      models.AdminRegionRoles.hasMany(models.Regions, {
        foreignKey: 'RegionID'
      })
      models.AdminRegionRoles.hasMany(models.Roles, {
        foreignKey: 'RoleID'
      })
      models.Regions.belongsTo(models.AdminRegionRoles, {
        foreignKey: 'RegionID'
      })
      models.Roles.belongsTo(models.AdminRegionRoles, {
        foreignKey: 'RoleID'
      })

      models.AdminRegionRoles.findAll({
        where: {
            AdminID: req.body.UserID
        },
        include: [models.Regions, models.Roles]
      }).then(function (result) {

        roleregion = result;
        res.status(201).json(result);

      }).catch(function (error) {
        //no results
        console.log("failed to get region role")
        return res.sendStatus(500)
      });

    } else {
      console.log("failed to get region role")
      return res.sendStatus(500)
    }
  } else {
    //you don't have permition to update this information
    console.log("invalid_grant")
    return res.status(201).json({
      message: 'invalid_grant'
    });
  }

}
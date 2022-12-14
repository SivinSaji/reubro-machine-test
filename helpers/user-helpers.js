var db = require('../config/connection')
var collection = require('../config/collections')
var objectId = require('mongodb').ObjectId
const bcrypt = require("bcrypt");
const { ObjectId } = require('mongodb');
const { response } = require('express');

module.exports = {
 /*doSignup function is used to store data of user in data base. We also check the user emaiID all ready exist or not*/
 doSignup: (userData) => { //here userData is req.body which is passed from user.js
    return new Promise(async (resolve, reject) => {
      let response = {}
      let password = userData.Password
      let emailExisit = await db.get().collection(collection.USER_COLLECTION).findOne({ Email: userData.Email })
      if (emailExisit) {
        resolve({ status: false })
      }
      else {
        userData.Password = await bcrypt.hash(userData.Password, 10);
        db.get().collection(collection.USER_COLLECTION).insertOne(userData).then((data) => {
          response.user = userData
          response.status = true
          resolve(response);
        });
      }
    });

  },

    /*doLogin is used  to check wheather user have an account or not*/
    doLogin: (userData) => {
        return new Promise(async (resolve, reject) => {
          let loginStatus = false
          let response = {}
          let user = await db.get().collection(collection.USER_COLLECTION).findOne({ Email: userData.Email })
          if (user) {
            bcrypt.compare(userData.Password, user.Password).then((status) => {
              if (status) {
                //console.log("Login success")
                response.user = user
                response.status = true
                resolve(response)
    
              } else {
                //console.log("Incorrect password")
                resolve({ status: false })
              }
            })
          } else {
            //console.log("Incorrect email")
            resolve({ status: false })
          }
        })
      },

}
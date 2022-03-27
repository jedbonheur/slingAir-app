const express = require('express');
const router = express.Router(); 
const Flight  = require('../models/flight');
const Reservation  = require('../models/reservation');
const User = require('../models/user')


  // ****************************************************************************authentications*******************

const sessionChecker = (req, res, next) => {

  if (req.session.user && req.cookies.connect_sid) {
        next();
  } else {
      res.status(401).json(
        { 
            status:401, 
            message: "Not authorized" 
      })
    
  }
};

//  check routes to redirect them 
router.get('/loggedin',  async(req,res,next) => {
    console.log('req.cookies',req.cookies)
   console.log('req.session',req.session)
  if (req.session.user && req.cookies.connect_sid) {
     return res.status(200).json(
        { 
            status:200, 
            message: "ok" 
      })
  } else {
      return res.status(401).json(
        { 
            status:401, 
            message: "Not authorized" 
      })
  }
})

  // add new endpoints here 👇

  // @method Post
  // @route signup/
  // @desc sign up
  // _______________________________________________________________________________________________________
  // *******************************************************************************************************
  // route login 
  router.post('/login', async (req,res) => {
    const email = req.body.email
    const password = req.body.password
    try {
      let user = await  User.findOne({email}).exec();
      if(!user) {
          // res.statusMessage = "Current password does not match";
          return res.status(401).json(
          { 
            status:401, 
            message: "Email don't exist" 
          })
      }
      user.comparePassword(password,(err, match) => {
        if(!match) {
          return res.status(401).json(
          { 
            status:401, 
            message: "password didn't match" 
          })
        }
      })
      // give user a session
       req.session.user = user
      
      // send response ok
        res.status(200).json(
          { 
            status:200,
            user : {
              username : user.username,
              email : user.email
            },
            message: "ok" 
          })

    } catch(error) {
      console.log(error)
    }
  })

  // route signup
router.post('/signup', async (req,res) => {
    const username = req.body.username
    const email = req.body.email
    const password = req.body.password
    try {
      let user = await  User.findOne({email}).exec();
      if(user) {
          return res.status(401).json(
          { 
            status:401, 
            message: "email already exist" 
          })
      }
      const Register = new User({username,email,password})
      Register.save((err, doc)=> {
         if(err){
            return res.status(401).json(
            { 
              status:401, 
              message: "we did not regester you, try again later" 
            })
         }
        // give user a session
         req.session.user = doc
        // send response ok
          res.status(200).json(
            { 
              status:200, 
              message: "ok" 
            })

      })
    } catch(error) {
      console.log(error)
    }
  })

  // route logout

  router.get('/logout', (req,res) =>{
      if(req.session.user && req.cookies.connect_sid) {
        res.clearCookie('connect_sid')
        res.status(200).json(
            { 
              status:200, 
              message: "logged out" 
            })
      } else {
         res.status(403).json(
            { 
              status:403, 
              message: "not logged out" 
        })
      }
  })

 




  // @method GET
  // @route flights/
  // @desc get flights and plane seats
  // _______________________________________________________________________________________________________
  // *******************************************************************************************************
  router.get('/flights', sessionChecker, (req, res) => {
   Flight.find()
      .then(flights => {
        res.status(200).json(
          { 
            status: 200, 
            data: flights, 
            message: "success" 
          });
      })
      .catch(err => {
        res.status(err).json(
          { 
            status: err,  
            message: "error" 
          });
      })
  })

  // @method post
  // @route reservation/
  // @desc  reserve flight seat & regester a passenger
  // _______________________________________________________________________________________________________
  // *******************************************************************************************************
  router.post('/reservation', (req, res) => {
   
    const _id = req.body._id
    const flight = req.body.flight
    const seat = req.body.seat
    const givenName = req.body.givenName
    const surName = req.body.surName
    const email = req.body.email
    
    // reserve flight seat
    Flight.updateOne(
        { 
            _id:flight, 
            "seats.id": seat
        },
        {
        $set: {
                "seats.$.id" : seat,
                "seats.$.isAvailable" : false,
              }
       },(err,data) => {
          if(err) {
            console.log(err)
          }
        }
    )

  // register a passanger to the backend
  
    const newReservation = new Reservation({_id, flight, seat, givenName, surName, email})
    newReservation.save().
      then(()=>{
        Flight.updateOne({"seats.id":"seat"},
          {$set: {"seast.$.isAvailable" : false }},(err,data) => {
            if(err) {
              console.log(err)
            }
            if(data){
             res.status(200).json(
            { 
              status: 200,  
              message: "success" 
            });
            }
          }
      )
    })
   
  })

  // @method get
  // @route /view-reservation
  // @desc get 
  
  router.get('/view-reservation/:id', (req,res) => {
   
    const id = req.params.id;
    Reservation.findById(id)
    .then(data => {
        res.status(200).json(
          { 
            status: 200, 
            data: data, 
            message: "success" 
          });
      })
      .catch(err => {
        res.status(err).json(
          { 
            status: err,  
            message: "error" 
          });
      })
  })
   
  // _______________________________________________________________________________________________________
  // *******************************************************************************************************
  // add new endpoints here ☝️
  // ---------------------------------
  // Nothing to modify below this line

  // this is our catch all endpoint.
  router.get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "This is obviously not what you are looking for.",
    });
  })


module.exports = router
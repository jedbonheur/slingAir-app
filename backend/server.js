"use strict";

// import the needed node_modules.
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const app = express();
var cookieParser = require("cookie-parser");
const route = require('./routes/routes');
const Auth = require('./auth')




// constants
const mongoURI ='mongodb+srv://flight_reservation_db:bootcamp2021@cluster0.y6cdg.mongodb.net/flight_reservation_db?retryWrites=true&w=majority'
const port = 8000

express()
  // Below are methods that are included in express(). We chain them for convenience.
  // --------------------------------------------------------------------------------

  // This will give us will log more info to the console. see https://www.npmjs.com/package/morgan
  .use(morgan("tiny"))

  // Any requests for static files will go into the public folder
  .use(express.static("public"))

  // use parse body
  app.use(express.json())
  app.use(cookieParser());
// initialize express-session 
 app.use(Auth)

 // use routes
 app.use(route)

  // Node spins up our server and sets it to listen on port 8000.

  // connect initially while catching errors
  try {
    mongoose.connect(mongoURI).then(()=> {
    app.listen(port, () => {
      console.log('listening on port ' + port)
    })
  })
  } catch (error) {
    console.log('fail to connect', error)
  }
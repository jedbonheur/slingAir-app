const mongoose = require('mongoose')
const {Schema } = mongoose;

// schema of model @ flight

const flightSchema = new Schema({
  _id: {
   type: String,
   require: true
  },
  seats: [
    { 
      id: {
        type: String,
        require: true,
      },
      isAvailable : {
      type: Boolean,
      require: true,
      },
    }
  ]
})

// export of model @ flight

module.exports = mongoose.model('Flight',flightSchema)
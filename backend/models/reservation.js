const mongoose = require('mongoose')
const {Schema } = mongoose;

// schema of model @ reservation

const reservationSchema = new Schema({
  _id: {
   type: String,
   require: true
  },
  flight: {
   type: String,
   require: true,
  },
  seat: {
   type: String,
   require: true,
  },
  givenName: {
   type: String,
   require: true,
  },
  surName: {
   type: String,
   require: true,
  },
  email: {
   type: String,
   require: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

// export of model @ reservation

module.exports = mongoose.model('Reservation',reservationSchema)
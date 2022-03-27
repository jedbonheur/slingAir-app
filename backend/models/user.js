const mongoose = require('mongoose')
const {Schema } = mongoose;
const bcrypt = require('bcrypt') 

// schema of model @user

const userSchema = new Schema({
  username: {
   type: String,
   require: true
  },
  email: {
   type: String,
   require: true
  },
  password: {
   type: String,
   require: true
  },
  createdAt: {
   type: Date,
   default: Date.now()
  }
});

// hashing password

userSchema.pre("save", function (next){
  if(!this.isModified("password")) {
    return next();
  }
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});


// creating comparing password method

userSchema.methods.comparePassword = function (plaintext,cb) {
      return cb(null, bcrypt.compareSync(plaintext, this.password));
}


// export of model @ user

module.exports = mongoose.model('User',userSchema)
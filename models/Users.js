const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const buyer = {
  name:{
    type:String,
    required:false,
    unique:false,
    minlength:3
  }

 
  
}


const supplier = {
  name:{type:String, required:false},
  currency:{type:String, required:false},

  company_name:{type:String, required:false},
  company_code:{type:String, required:false},
  phone_number:{type:String, required:false},
  postal:{type:String, required:false},
  address:{type:String, required:false},
  email:{type:String, required:false},


  city:{type:String, required:false},
  state:{type:String, required:false},
  country:{type:String, required:false},
 



}


const userSchema = new Schema({
  supplier,
  buyer,
  phone_no: {
    type: String,
    required: true,
   
   
    minlength: 3
  },
  password:{
    type:String,
    required:true,
    minlength:3
  },
  
  role:{
    type:String,
    required:true,
    minlength:3
  },

}, {
  timestamps: true,
});

const Users = mongoose.model('Users', userSchema);

module.exports = Users;
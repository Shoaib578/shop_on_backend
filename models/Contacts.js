const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const ContactsSchema = new Schema({
   added_by:{
    type:Schema.ObjectId,

   },
    user_name:{
        type:String,
    },
    user_phone_no:{
      type:String,
      
    },
   
    
  
  
  }, {
    timestamps: true,
  });
  
  const Contacts = mongoose.model('Contacts', ContactsSchema);
  
  module.exports = Contacts;
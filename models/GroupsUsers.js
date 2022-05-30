const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const GroupUsersSchema = new Schema({
   
    
    group_id:{
      type:Schema.ObjectId,
      
    },
    user_phone_number:{
        type:String,
        
    },
    user_name:{
      type:String
    }
    
  
  }, {
    timestamps: true,
  });
  
  const GroupUsers = mongoose.model('GroupUsers', GroupUsersSchema);
  
  module.exports = GroupUsers;
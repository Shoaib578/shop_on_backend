const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const HashTagSchema = new Schema({
   
    hash_tag:{
      type:String,
      required:true,
     
    },
    
    user_id:{
      type:Schema.ObjectId,
      
    },
  
  }, {
    timestamps: true,
  });
  
  const HashTags = mongoose.model('HashTag', HashTagSchema);
  
  module.exports = HashTags;
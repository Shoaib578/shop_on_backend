const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const SizesSchema = new Schema({
   
    
    user_id:{
      type:Schema.ObjectId,
      
    },
   
    size:{
      type:String,
    }
  
  
  }, {
    timestamps: true,
  });
  
  const Sizes = mongoose.model('Sizes', SizesSchema);
  
  module.exports = Sizes;
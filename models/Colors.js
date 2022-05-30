const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const ColorsSchema = new Schema({
   
    
    user_id:{
      type:Schema.ObjectId,
      
    },
   
    color:{
      type:String,
    }
  
  
  }, {
    timestamps: true,
  });
  
  const Colors = mongoose.model('Colors', ColorsSchema);
  
  module.exports = Colors;
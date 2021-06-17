const mongoose = require('mongoose');
const Schema = mongoose.Schema

const PushSchema = new Schema(
   { name: {
        type: String,
        lowercase: true,
        
      },
      message: {
        type: String,
        lowercase: true,
        
      },
      url: {
        type: String,
        lowercase: true,
        
      },
      repoName: {
        type: String,
        lowercase: true,
      },
      img: { 
        data: Buffer, 
        contentType: String 
     }
    });


  
module.exports = mongoose.model('Push',PushSchema);
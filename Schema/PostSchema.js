const mongoose = require('mongoose')

const PostSchema = mongoose.Schema({
    title : {
        type : String,
        required  : true,
        trim : true
    },
    category : {
        type : String,
        trim : true
    },
    content : {
        type : String,
        required  : true,
        trim : true
    },
    meta : {
        type : String,
        required  : true,
        trim : true
    },
    author : {
        type : String,
        default : "Admin"
    },
    slug : {
        type : String,
        required : true,
        trim : true,
        unique : true
    },
 
    thumbnail : {
        type : Object,
        url : {
            types : URL,
            
        },
        public_id : {
            type : String,
            
        }
    },

},{
    timestamps : true
})

module.exports = mongoose.model('Post',PostSchema)
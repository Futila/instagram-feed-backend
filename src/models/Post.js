const mongoose = require('mongoose');


const PostSchema = new mongoose.Schema({
    author: String,
    place: String,
    description: String, 
    hashtags: String,
    image: String,
    likes:{
        type: Number,
        default: 0
    }
},{
    timestamps: true,
    toObject: {virtuals: true},
    toJSON: {virtuals: true},

});

PostSchema.virtual('url').get(function(){
    const url = process.env.URL || 'http://localhost:3333'; 
    return `${url}/files/${encodeURIComponent(this.image)}`;
});

module.exports = mongoose.model('Post', PostSchema);
const { default: mongoose } = require('mongoose');

const ObjectId = mongoose.Schema.Types.ObjectId

/*
{ title: {mandatory}, body: {mandatory}, authorId: {mandatory, refs to author model}, tags: {array of string}, category: {string, mandatory, examples: [technology, entertainment, life style, food, fashion]}, subcategory: {array of string, examples[technology-[web development, mobile development, AI, ML etc]] }, createdAt, updatedAt, deletedAt: {when the document is deleted}, isDeleted: {boolean, default: false}, publishedAt: {when the blog is published}, isPublished: {boolean, default: false}}

*/
const blogSchema = mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    body:{
        type:String,
        require:true
    },
    authorId:{
        type:ObjectId,
        require:true,
        ref:"auther"

    },

    tags:{
        type:Array
    },

    category:{
        type:String,
        require:true
    },
    subcategory:{
        type:Array,
        require:true
    },

    deletedAt:{
        Boolean:false,
        type:Date,
        default:Date.now
    },

    updatedAt:{
        type:Date,
        default:Date.now
    },

    isDeleted:{
        type:Boolean,
        default:false
    },

    publishedAt:{
        type:Date,
        default:Date.now
    },

    isPublished:{
        type:Boolean,
        default:false
    }



},{timestamps:true})

module.exports = mongoose.model('blog',blogSchema);
const { default: mongoose } = require('mongoose');

/*
{ fname: { mandatory}, lname: {mandatory}, title: {mandatory, enum[Mr, Mrs, Miss]}, email: {mandatory, valid email, unique}, password: {mandatory} }
*/

const authorSchema = new mongoose.Schema({
    firstName:{
        type:String,
        require:true
    },
    lastName:{
        type:String,
        require:true
    },
    title:{
        type:String,
        require:true,
        enum:["Mr", "Mrs", "Miss"]
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    }

})

module.exports = mongoose.model('author',authorSchema);
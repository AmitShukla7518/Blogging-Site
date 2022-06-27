const { default: mongoose } = require('mongoose');

/*
{ fname: { mandatory}, lname: {mandatory}, title: {mandatory, enum[Mr, Mrs, Miss]}, email: {mandatory, valid email, unique}, password: {mandatory} }
*/

var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};


const authorSchema = new mongoose.Schema({
    fname:{
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
    // email:{
    //     type:String,
    //     require:true,

    // }
    // email: {
    //     type: String,
    //     match: [/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, `Please fill valid email address`],
    //     validate: {
    //       validator: function() {
    //         return new Promise((res, rej) =>{
    //           User.findOne({email: this.email, _id: {$ne: this._id}})
    //               .then(data => {
    //                   if(data) {
    //                       res(false)
    //                   } else {
    //                       res(true)
    //                   }
    //               })
    //               .catch(err => {
    //                   res(false)
    //               })
    //         })
    //       }, message: 'Email Already Taken'
    //     }
    //   }

    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    }


,
    password:{
        type:String,
        require:true
    }

})

module.exports = mongoose.model('author',authorSchema);

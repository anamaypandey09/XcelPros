const mongoose =require ('mongoose')
// Name, Email, Password, Age, Gender, Company, Designation, about
var userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:'This field is required'
    },
    email:{
        type:String,
        required:'This field is required'
    },
    password:{
        type:String,
        required:'This field is required'
    },
    age:{
        type:String
    },
    gender:{
        type:String
        
    },
    company:{
        type:String
    },
    designation:{
        type:String
    },
    about:{
        type:String
       
    }
})



module.exports = mongoose.model('userinfo',userSchema)
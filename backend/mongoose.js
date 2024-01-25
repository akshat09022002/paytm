const mongoose=require("mongoose");

mongoose.connect('mongodb+srv://akshatkindle:Aisehi%401234@akbase.zt293q8.mongodb.net/paytm');

const signupSchema= mongoose.Schema({
    firstName:String,
    lastName:String,
    username:String,
    password:String
})

const signup = mongoose.model('signup',signupSchema);

module.exports={
    signup : signup
}
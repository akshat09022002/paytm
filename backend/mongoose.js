const mongoose=require("mongoose");

mongoose.connect('mongodb+srv://akshatkindle:Aisehi%401234@akbase.zt293q8.mongodb.net/paytm');

const loginSchema= mongoose.Schema({
    firstName:String,
    lastName:String,
    username:String,
    password:String
})

const Login = mongoose.model("Login",loginSchema);

module.exports={
    Login
}
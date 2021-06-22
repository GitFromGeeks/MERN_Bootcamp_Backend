const { Router } = require("express")
const {check,validationResult} =require("express-validator")
var express=require("express")
var router =express.Router()
const {signout,signup,signin, isSignedIn} = require("../controllers/auth")

router.post('/signup',[
    check("name","name should be atleast 3 char").isLength({min:3}),
    check("email","email is required").isEmail(),
    check("password","password should be atleaset 3 char").isLength({min:3}),
],signup)

router.post('/signin',[
    check("email","email is required").isEmail(),
    check("password","password is required").isLength({min:3}),
],signin)

router.get("/signout",signout)


router.get("/testRoute",isSignedIn,(req,res)=>{
    res.send("A protected route")
})


module.exports=router;
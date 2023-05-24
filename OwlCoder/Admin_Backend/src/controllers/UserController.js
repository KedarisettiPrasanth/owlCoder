const User = require('../Models/Users');

 const Register = async (req, res, next) => {    
    const { email, user_name, password, userType} = req.body;
    
    let user;
    try {
        user = new User({
            user_name,
            email,
            password,
            userType
        });
        await user.save()
    } catch (err) {
        console.log(err);
    }
    if (!user) {
        return res.status(500).json({ message: "User details not saved" })
    }
    return res.status(201).json({ message:"User Added successfully" })
}

 const getUsers = async(req,res,next)=>{
    let users;
    try{
        users = await User.find({})
    } catch(err){
        console.log(err)
    }
    if(!users){
        return res.status(500).json({message:"Users not found"})
    }
    return res.status(201).json({users})
}

const loginUser = async(req,res,next)=>{
    var data = {
        email:req.body.email,
        password:req.body.password
    }

    let user;
    try{
        user = await User.findOne(data)
    } catch(err){
        console.log(err)
    }

    if(!user){
        return res.status(500).json({message:"login failed"})
        
    }
    // if(res.status==201){
    //     //localStorage.setItem("currUsername", data.user_name);
    //     //console.log(localStorage.getItem("currUsername"));
    // }
    return res.status(201).json({"username":user.user_name, "email":user.email, "userType":user.userType})
    
}
exports.Register = Register;
exports.getUsers = getUsers;
exports.loginUser = loginUser;
const mongoose=require("mongoose")
const bcrypt=require("bcryptjs")
const imageSchema=new mongoose.Schema({
    image:{
        type:Buffer
    },
    extName:{
        type:String
    }
})
const Image=mongoose.model("Image",imageSchema)


const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    firstName:{
        type:String,
        default:""
       },
       lastName:{
        type:String,
        default:""
       },
    password:{
        type:String,
        required:true
    },
    imageData:{
        type:Object,
        ref:"Image"
    }
})

userSchema.pre("save",async function(next){
        if(!this.isModified("password")){
            next()
        }
        const salt=await bcrypt.genSalt(Number(process.env.BCRYPT_SALT))
        const hashedPassword=await bcrypt.hashSync(this.password,salt)
        this.password=hashedPassword
})

const User=mongoose.model("User",userSchema)
module.exports={
    User
}

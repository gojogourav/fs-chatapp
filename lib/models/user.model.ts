import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    userid:{type:String,required:true,unique:true},
    username:{type:String,required:true,unique:true},
    name:{type:String,required:true},
    image:String,
    bio:String,
    threads:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"thread"
        }
    ],
    onboard:{
        type:Boolean,
        default:false
    },
    communities:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"community"
        }
    ]
})

const User = mongoose.models.User || mongoose.model('User',userSchema)

export default User;
const {Schema,model}=require('mongoose')
const userSchema = new Schema(
    {
        userName:{type:String,required:true},
        userEmail:{type:String,required:true,unique:true},
        password:{type:String,required:true},
    }
)

    module.exports=new model("user",userSchema)
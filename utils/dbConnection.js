const  mongoose = require("mongoose");


module.exports=()=>{
    mongoose
.connect(process.env.MONGO_URI, { dbName: "todoApp" })
.then(() => {
  console.log("db connected");
})
.catch((e) => console.log(e));
}
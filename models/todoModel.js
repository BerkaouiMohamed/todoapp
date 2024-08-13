const {Schema,model}=require('mongoose')
const todoSchema = new Schema(
    {
      todo: { type: String, required: true, },
      status: { type: String, enum: ["done", "pending"], default: "pending" },
      user: String,
    },
    { timestamps: true }
  );
  
module.exports = new model("todo", todoSchema);



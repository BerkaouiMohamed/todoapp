const {Schema,model, Types}=require('mongoose')
const todoSchema = new Schema(
    {
      todo: { type: String, required: true, },
      status: { type: String, enum: ["done", "pending"], default: "pending" },
      user: {type:Types.ObjectId,ref:"user"},
    },
    { timestamps: true }
  );
  
module.exports = new model("todo", todoSchema);



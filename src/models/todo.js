const mongoose = require("mongoose");



const Scheme = mongoose.Schema;

const todoSchema = new Scheme({

    task:{
        type:String,
        required:true
    },
    completed:{
        type:Boolean,
        default:false
    }
})


module.exports = mongoose.models.todo || mongoose.model("todo",todoSchema)


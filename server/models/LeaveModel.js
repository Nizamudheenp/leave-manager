const mongoose = require('mongoose');

const leaveSchema = new mongoose.Schema({
    employeeId: {type:mongoose.Schema.Types.ObjectId, ref:"User",required:true},
    fromDate: {type:Date,required:true},
    toDate: {type:Date,required:true},
    type : {type:String,required:true,enum: ["sick","casual"]},
    reason:  {type:String,required:true},
    status: {type:String,required:true,enum: ["Pending","Approved","Rejected"],default:"pending"} ,

},
{timestamps:true});

module.exports = mongoose.model("Leave",leaveSchema);
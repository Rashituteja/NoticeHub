const mongoose = require ("mongoose");
const Schema  = mongoose.Schema ;

const noticeSchema =  new Schema({
title:{
    type:String,
    required:true,
},
description:
{
    type:String,
    required:true,
},
date:{
    type:Date,
    default:Date.now
},

pdf:{
     type:String,
     required:true
}
});
    module.exports = {noticeSchema}

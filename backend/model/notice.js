const mongoose = require("mongoose");
const { model } = mongoose;
const {noticeSchema} = require("../Schemas/notice");

const noticeModel = model ("notices", noticeSchema);
module.exports = {noticeModel};
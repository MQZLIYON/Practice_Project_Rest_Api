const mongoose = require('mongoose');
const dataSchema = mongoose.Schema({
    FirstName: {type:String},
    LastName: {type:String},
    Email: {type:String},
    Mobile: {type:String},
    City: {type:String},
    UserName: {
        type:String,
        unique:true
    },
    Password: {type:String}
},{versionKey:false});
const ProfileModel = mongoose.model('profiles',dataSchema);

module.exports = {ProfileModel};
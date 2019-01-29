const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    FirstName:{type:String,required:true,min:[4,'Too Short'],max:[120,"Too long,mas take 120 character"]},
    LastName:{type:String,required:true,min:[4,'Too short'],max:[120,"Too long,mas take 120 character"]},
    email:{type:String,match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/],required:'Email is required',min:[4,'Too Short'],max:[120,"Too long,mas take 120 character"]},
    password:{type:String,min:[4,'Too Short'],max:[120,"Too long,mas take 120 character"],required:'Password is required'},
    
});
userSchema.methods.hasSamePassword = function(requestedPassword){
  return bcrypt.compareSync(requestedPassword,this.password);
}

userSchema.pre('save',function(next){
  const user = this;
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(user.password, salt, function(err, hash) {
        user.password = hash;
        next();
    });
});
});
module.exports = mongoose.model('User',userSchema);
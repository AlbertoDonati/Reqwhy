module.exports = function(mongoose) {
    var Schema = mongoose.Schema;
    var UserSchema = new Schema({
        username: {type:String, unique: true, index:true},
        password: String,
        isTeacher: Boolean,
    });
    UserSchema.set('autoIndex',false);
    return mongoose.model('usermodel', UserSchema, 'Users');
};
module.exports = function(mongoose) {
    var Schema = mongoose.Schema;
    var UserSchema = new Schema({
        username: {type:String, unique: true, index:true}, //controllare se non è un problema sto indice, acnhe nel db, e se settare un idice, vedere preferiti, cronologia ecc.
        password: String,
        isTeacher: Boolean,
    });
    UserSchema.set('autoIndex',false);
   // UserSchema.set("_id", false);
    return mongoose.model('usermodel', UserSchema, 'Users');
};
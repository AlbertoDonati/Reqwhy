module.exports = function(mongoose) {
    var Schema = mongoose.Schema;
    var QuestionSchema = new Schema({
        titleQuestion: String,
		descriptionQuestion: String,
        dateQuestion: Date,
        area: String,
        userQuestion: String
    });
    return mongoose.model('questionmodel', QuestionSchema, 'Questions');
};

module.exports = function(mongoose) {
    var Schema = mongoose.Schema;
    var QuestionSchema = new Schema({
        titleQuestion: String,
		descriptionQuestion: String,
        userQuestion: String,
        dateQuestion: Date,
        area: String,
    });
    return mongoose.model('questionmodel', QuestionSchema, 'Questions');
};

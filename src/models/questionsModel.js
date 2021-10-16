module.exports = function(mongoose) {
    var Schema = mongoose.Schema;
    var QuestionSchema = new Schema({
        titleQuestion: String,
		descriptionQuestion: String,
        userIdQuestion: String,
        dateQuestion: Date,
        area: String,
        bestByUser: String,
        loves: [String]
    });
    return mongoose.model('questionmodel', QuestionSchema, 'Questions');
};

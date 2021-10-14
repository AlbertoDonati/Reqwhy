module.exports = function(mongoose) {
    var Schema = mongoose.Schema;
    var AnswerSchema = new Schema({
        idQuestion: String,
        textAnswer: String,
        userIdAnswer: String,
        dateAnswer: Date,
        bests: String,
        tops: [String],
    });
    return mongoose.model('answermodel', AnswerSchema, 'Answers');
};

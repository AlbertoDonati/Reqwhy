module.exports = function(mongoose) {
    var Schema = mongoose.Schema;
    var AnswerSchema = new Schema({
        idQuestion: String,
        textAnswer: String,
        userAnswer: String,
        dateAnswer: Date,
        tops: String,
        loves: String,
        bests: String,
    });
    return mongoose.model('answermodel', AnswerSchema, 'Answers');
};
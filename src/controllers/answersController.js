var mongoose = require('mongoose');
Answer = require("../models/answersModel.js")(mongoose);

exports.show_answers = function(req, res) {
	res.sendFile(appRoot  + '/www/answers.html');
};

exports.list_answers = function(req, res) {
	Answer.find({}, (err, answer) => {
		if (err)
			res.send(err);
		res.json(answer);
	});
};

exports.list_answers_by_question_id = function(req, res) {
	Answer.find({idQuestion: req.params.question}, function (err, answer) {
		if (err)
			res.send(err);
		res.json(answer);
	});
};

var mongoose = require('mongoose');
Answer = require("../models/answersModel.js")(mongoose);

exports.list_answers_by_question_id = function(req, res) {
	Answer.find({idQuestion: req.params.question}, function (err, answer) {
		if (err)
			res.send(err);
		res.json(answer);
	});
};

exports.create_answer = function(req, res) {
	var new_answer = new Answer(req.body);
	new_answer.save(function(err, answer) {
		if (err)
			res.send(err);
		res.status(201).json(answer);
	});
};

exports.update_answer = function(req, res) {
		Answer.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, function(err, answer) {
			if (err)
				res.send(err);
			else{
				if(answer==null){
					res.status(404).send({
						description: 'Answer not found'
					});
				}
				else{
					res.json(answer);
				}
			}
		});
};

exports.delete_answers_by_question_id = function(req, res) {
	Answer.deleteMany({idQuestion: req.params.question}, function(err, result) {
		if (err)
			res.send(err);
		else{
				res.json({ message: 'Answers successfully deleted' });
			}
	});
};
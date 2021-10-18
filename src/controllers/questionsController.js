var mongoose = require('mongoose');
Question = require("../models/questionsModel.js")(mongoose);

exports.show_reqwhy = function(req, res) {
	res.sendFile(appRoot  + '/www/reqwhy.html');
};

exports.list_questions = function(req, res) {
	Question.find({}, (err, question) => {
		if (err)
			res.send(err);
		res.json(question);
	});
};

exports.list_questions_by_area = function(req, res) {
	Question.find({area: req.params.area}, function (err, question) {
		if (err)
			res.send(err);
		res.json(question);
	});
};

exports.create_question = function(req, res) {
	var new_question = new Question(req.body);
	new_question.save(function(err, question) {
		if (err)
			res.send(err);
		res.status(201).json(question);
	});
};

exports.read_question = function(req, res) {
	Question.findById({_id: req.params.id}, function(err, question) {
		if (err)
			res.send(err);
		else{
			if(question==null){
				res.status(404).send({
					description: 'Question not found'
				});
			}
			else{
				res.json(question);
			}
		}
	});
};

exports.update_question = function(req, res) {
	Question.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, function(err, question) {
		if (err)
			res.send(err);
		else{
			if(question==null){
				res.status(404).send({
					description: 'Question not found'
				});
			}
			else{
				res.json(question);
			}
		}
	});
};

exports.delete_question = function(req, res) {
	Question.deleteOne({_id: req.params.id}, function(err, result) {
		if (err)
			res.send(err);
		else{
			if(result.deletedCount===0){
				res.status(404).send({
					description: 'Question not deleted'
				});
			}
			else{
				res.json({ message: 'Question successfully deleted' });
			}
		}
	});
};
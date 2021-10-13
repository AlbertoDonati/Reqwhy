var mongoose = require('mongoose');
User = require("../models/usersModel.js")(mongoose);

exports.create_user = function(req, res) {
    var new_user = new User(req.body);
    new_user.save(function(err, user) {
        if (err)
            res.status(404).send({
                description: 'username already used'
            });
        else {
            res.status(201).json(user);
        }
    });
};


exports.verify_user = function(req, res) {
  //  var new_user = new User(req.body);
    User.find({username: req.params.username} && {password: req.params.password}, function (err, user) {
        if (err || typeof this.user === "undefined")
            res.status(404).send({
                description: 'accidenti non va sto coso already used'
            });
        else {
            res.json(this.user);
        }
    });
};

/*
exports.verify_user = function(req, res) {
	User.find({username: 'req.params.username'} && {password: 'req.params.password'},req.json, function (err, res) {
		res.json(res);
	});
};*/

/*
    User.findOne({username: req.params.username}, function(err, user) {
        if (err) // || user.username === null || user.username === "" || typeof user.username === "undefined")
            res.status(404).send({
                description: 'No user with these credentials found'
            });
        else {
            res.json(user);

        }
});
};        */
















































/*
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

exports.create_answer = function(req, res) {
	var new_answer = new Answer(req.body);
	new_answer.save(function(err, answer) {
		if (err)
			res.send(err);
		res.status(201).json(answer);
	});

};

	exports.update_answer = function(req, res) {
		Answer.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, function(err, question) {
			if (err)
				res.send(err);
			res.json(question);
		});
	};

exports.delete_answers_by_question_id = function(req, res) {
	Answer.deleteMany({idQuestion: req.params.question}, function(err, result) {

		if (err)
			res.send(err);
		else{
			if(result.deletedCount==0){
				res.json({ message: 'No deleted answers' });
			}
			else{
				res.json({ message: 'Answers successfully deleted' });
			}
		}
	});
};


 */

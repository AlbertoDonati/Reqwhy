var mongoose = require('mongoose');
var bcrypt = require("bcryptjs");
User = require("../models/usersModel.js")(mongoose);

exports.create_user = function(req, res) {
    var new_user = new User(req.body);
    new_user.save(function(err, user) {
            if (err)
                res.send(err);
            else{
                    res.status(201).send(true);
                }
    });
};

exports.read_type_of_user = function(req, res) {
    User.findOne({username: req.params.username}, function(err, user) {
        if (err)
            res.send(err);
        else{
            if(user==null){
                res.status(404).send({
                    description: 'User not found'
                });
            }
            else{
                if(user.isTeacher === true){
                    res.send(true)
                } else {
                    res.send(false)
                }
            }
        }
    });
};

exports.verify_user = function(req, res) {
    User.findOne({username:  req.body.username, password: req.body.password}, req.body, function(err, user) {
        if (err)
            res.send(err);
        else{
            if(user==null){
                res.send(false)
            }
            else {
                res.send(true)
            }
        }
    });
};

exports.crypt = function (req, res) {
    var psw = req.body.password;
    var hash = bcrypt.hashSync(psw, 10);
    res.send(hash);
};

exports.decrypt = function (req, res) {
    var dePsw = req.body.password;
    var polloDB = '$2a$10$zJ.OBePwXYjXOm9dJhNNKe7zM8HMsbC7JE48.QpaUiFPEmicY7Nii';
    var value = bcrypt.compareSync(dePsw, polloDB);
    res.send(value);
};








/*


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



 */



/*
exports.verify_user = function(req, res) {
    User.find({username: req.params.username} && {password: req.params.password}, function (err, user) {
        if (err || typeof this.user === "undefined")
            res.status(404).send({
                description: 'accidenti non va sto coso already used'
            });
        else {
            res.json(this.user);
        }
    });
};*/

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

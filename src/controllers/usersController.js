var mongoose = require('mongoose');
var bcrypt = require("bcryptjs");
User = require("../models/usersModel.js")(mongoose);

exports.create_user = function(req, res) {
    var new_user = new User(req.body);
    new_user.password = bcrypt.hashSync(req.body.password, 10);
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
    User.findOne({username:  req.body.username}, req.body, function(err, user) {
        if (err)
            res.send(err);
        else{
            if(user==null){
                res.send(false);
            }
            else{
                if(bcrypt.compareSync(req.body.password, user.password)) {
                    res.send(true);
                }
                else{
                    res.send(false);
                }
            }
        }
    });
};
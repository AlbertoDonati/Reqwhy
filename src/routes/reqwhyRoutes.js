const answersController = require("../controllers/answersController.js");
module.exports = function(app) {
	var questionsController = require('../controllers/questionsController.js');
	var answersController = require('../controllers/answersController.js');

	app.route('/api/questions')
		.get(questionsController.list_questions)
	 	.post(questionsController.create_question);

	app.route('/api/questions/:id')
	  .get(questionsController.read_question)
	  .put(questionsController.update_question)
	  .delete(questionsController.delete_question);

	app.route('/api/questionsbyarea/:area')
		.get(questionsController.list_questions_by_area);

	app.route('/api/answers')
		.get(answersController.list_answers);

	app.route('/api/answersbyquestionid/:question')
		.get(answersController.list_answers_by_question_id);

	app.use(questionsController.show_questions);
	app.use(questionsController.show_crud_questions);
  	app.use(questionsController.show_questions_by_area);

	app.use(answersController.show_answers);

};

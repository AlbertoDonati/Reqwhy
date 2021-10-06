const questionsController = require("../controllers/questionsController.js");
module.exports = function(app) {
	var questionsController = require('../controllers/questionsController.js');

	app.route('/api/questions')
		.get(questionsController.list_questions)
	 	.post(questionsController.create_question);

	app.route('/api/questions/:id')
		.get(questionsController.read_question)
	  .put(questionsController.update_question)
	  .delete(questionsController.delete_question);

	app.route('/api/questionsbyarea/:area')
		.get(questionsController.list_questions_by_area);

	app.use(questionsController.show_questions);
	app.use(questionsController.show_crud_questions);
  app.use(questionsController.show_questions_by_area);

};

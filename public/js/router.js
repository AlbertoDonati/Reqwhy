const router = new VueRouter({
    mode: 'history',
    routes: [
      { path: '/', name: "Questions", component: Questions },
      { path: '/crudquestions', name: "CrudQuestions", component: CrudQuestions },
      { path: '/area/:area', name: "QuestionsByArea", component: QuestionsByArea},
      { path: '/answers', name: "Answers", component: Answers},
      { path: '/answersbyid/:question', name: "AnswersByQuestionId", component: AnswersByQuestionId},
      { path: '/404', component: NotFound },
      { path: '*', redirect: '/404' },
    ]
})

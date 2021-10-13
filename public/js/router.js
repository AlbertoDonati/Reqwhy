const router = new VueRouter({
    mode: 'history',
    routes: [
      { path: '/', name: "Home", component: Home },
      { path: '/questions', name: "Questions", component: Questions },
      { path: '/crudquestions', name: "CrudQuestions", component: CrudQuestions },
      { path: '/area/:area', name: "QuestionsByArea", component: QuestionsByArea},
      { path: '/answers', name: "Answers", component: Answers},
      { path: '/answersbyid/:question', name: "AnswersByQuestionId", component: AnswersByQuestionId},
      { path: '/login', name: "Login", component: Login},
      { path: '/signup', name: "SignUp", component: SignUp},
      { path: '/404', component: NotFound },
      { path: '*', redirect: '/404' },
    ]
})

const router = new VueRouter({
    mode: 'history',
    routes: [
      { path: '/', name: "Home", component: Questions},
      { path: '/area/:area', name: "QuestionsByArea", component: Questions},
      { path: '/answersbyid/:question', name: "AnswersByQuestionId", component: AnswersByQuestionId},
      { path: '/login', name: "Login", component: Login},
      { path: '/signup', name: "SignUp", component: SignUp},
      { path: '/404', component: NotFound },
      { path: '*', redirect: '/404' },
    ]
})

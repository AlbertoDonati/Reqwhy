const router = new VueRouter({
    mode: 'history',
    routes: [
      { path: '/', name: "Questions", component: Questions },
      { path: '/crudquestions', name: "CrudQuestions", component: CrudQuestions },
      { path: '/404', component: NotFound },
      { path: '*', redirect: '/404' },
    ]
})

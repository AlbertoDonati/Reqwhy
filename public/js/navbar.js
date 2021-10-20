const Navbar = {
    template: `
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
          <div id="navbarNav">
            <ul class="navbar-nav">
                <a class="navbar-brand" style="text-emphasis-style: circle;">Reqwhy</a>
                
                <li class="nav-item">
                <button @click="goToSignUp()" type="button" class="btn btnsm">
                     <i class="fas fa-user-plus"></i>
                </button>
                
                <li class="nav-item">
                <button @click="goToLogin()" type="button" class="btn btnsm">
                     <i class="fas fa-user"></i>
                </button>
                </li>
                
                <li class="nav-item" style="margin-left: 3%"><router-link class="nav-link" :to="'/'">Home</router-link></li>
                <li class="nav-item" style="margin-left: 3%"><router-link class="nav-link" :to="'/area/' + 'IT'">IT</router-link></li>
                <li class="nav-item" style="margin-left: 3%"><router-link class="nav-link" :to="'/area/' + 'MATH'">MATH</router-link></li>
                <li class="nav-item" style="margin-left: 3%"><router-link class="nav-link" :to="'/area/' + 'SCIENCE'">SCIENCE</router-link></li>
                <li class="nav-item" style="margin-left: 3%"><router-link class="nav-link" :to="'/area/' + 'HISTORY'">HISTORY</router-link></li>
                <li class="nav-item" style="margin-left: 3%"><router-link class="nav-link" :to="'/area/' + 'ART'">ART</router-link></li>
                <li class="nav-item" style="margin-left: 3%"><router-link class="nav-link" :to="'/area/' + 'OTHER'">OTHER</router-link></li>
               
            </ul>
          </div>
        </nav>
        `,
    methods: {
        goToLogin() {
                router.push(`/login`, () => {});
            },
        goToSignUp() {
                router.push(`/signup`, () => {});
        },
    },
}
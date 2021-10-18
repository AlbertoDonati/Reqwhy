const Navbar = {
    template: `
        <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
          <div id="navbarNav">
            <ul class="navbar-nav">
                <a class="navbar-brand" href="/" style="text-emphasis-style: circle;color: darkblue;margin-left: 10pt">Reqwhy</a>
                
                <li class="nav-item"><router-link class="nav-link" :to="'/'">Home</router-link></li>
                <li class="nav-item"><router-link class="nav-link" :to="'/questions'">All</router-link></li>
                <li class="nav-item"><router-link class="nav-link" :to="'/crudquestions'">Insert</router-link></li>
                
                <li class="nav-item"><router-link class="nav-link" :to="'/area/' + 'IT'">IT</router-link></li>
                <li class="nav-item"><router-link class="nav-link" :to="'/area/' + 'MATH'">MATH</router-link></li>
                <li class="nav-item"><router-link class="nav-link" :to="'/area/' + 'SCIENCE'">SCIENCE</router-link></li>
                <li class="nav-item"><router-link class="nav-link" :to="'/area/' + 'HISTORY'">HISTORY</router-link></li>
                <li class="nav-item"><router-link class="nav-link" :to="'/area/' + 'ART'">ART</router-link></li>
                <li class="nav-item"><router-link class="nav-link" :to="'/area/' + 'OTHER'">OTHER</router-link></li>
               
                <li class="nav-item">
                <button @click="goToLogin()" type="button" class="btn btnsm">
                     <i class="fas fa-user"></i>
                </button>
                </li>
                
                <li class="nav-item">
                <button @click="goToSignUp()" type="button" class="btn btnsm">
                     <i class="fas fa-user-plus"></i>
                </button>
                </li>
                
            </ul>
          </div>
        </nav>
        `,
    data: function () {
        return {
        }
    },
    methods: {
        goToLogin() {
                router.push({path: `/login`});
            },
        goToSignUp() {
                router.push({path: `/signup`});
        },
    },


}
/* sti navbutton non servono ad un cavolo */
/*
const Navbutton =  {
    props: ['text'],

    template: `
        <li v-on:click="onClickButton()" class="nav-item">
            <router-link class="nav-link" :to="{ name: text }">{{text}} ({{ count }} click)</router-link>
        </li>
    `,

    data: function () {
        return {
            count: 0
        }
    },

    methods: {
        onClickButton() {
            this.count++;
            this.$emit('clicked')
        }
    },
}*/

/*erano dentro navbar*/
/*
data: function () {
    return {
        count: 0,
    }
},

methods: {
    onClickChild() {
        this.count++;
    },
} */

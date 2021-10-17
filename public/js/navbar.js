const Navbar = {
    template: `
        <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
          <div id="navbarNav">
            <ul class="navbar-nav">
                <h2 style="text-emphasis-style: circle">Reqwhy</h2>
                
                <li><router-link class="nav-link" :to="'/'">HOME</router-link></li>
                <li><router-link class="nav-link" :to="'/login'">LOGIN</router-link></li>
                <li><router-link class="nav-link" :to="'/signup'">SIGNUP</router-link></li>
                <li><router-link class="nav-link" :to="'/questions'" style="color: #3aa6d9">All</router-link></li>
                <li><router-link class="nav-link" :to="'/crudquestions'">Insert</router-link></li>
                
                <li><router-link class="nav-link" :to="'/area/' + 'IT'">IT</router-link></li>
                <li><router-link class="nav-link" :to="'/area/' + 'MATH'">MATH</router-link></li>
                <li><router-link class="nav-link" :to="'/area/' + 'SCIENCE'">SCIENCE</router-link></li>
                <li><router-link class="nav-link" :to="'/area/' + 'HISTORY'">HISTORY</router-link></li>
                <li><router-link class="nav-link" :to="'/area/' + 'ART'">ART</router-link></li>
                <li><router-link class="nav-link" :to="'/area/' + 'OTHER'">OTHER</router-link></li>
             
            </ul>
            
          </div>
        </nav>
        `,
    data: function () {
        return {
        }
    },
    methods: {
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

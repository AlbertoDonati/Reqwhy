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
}

const Navbar = {
    components: {
        'navbutton': Navbutton,
    },

    template: `
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <div id="navbarNav">
            <ul class="navbar-nav">
                <navbutton text="Questions" @clicked="onClickChild()"></navbutton>
                <navbutton text="CrudQuestions" @clicked="onClickChild()"></navbutton>
                <navbutton text="Answers" @clicked="onClickChild()"></navbutton>
               
                <li><router-link class="nav-link" :to="'/area/' + 'IT'">IT</router-link></li>
                <li><router-link class="nav-link" :to="'/area/' + 'MATH'">MATH</router-link></li>
                <li><router-link class="nav-link" :to="'/area/' + 'SCIENCE'">SCIENCE</router-link></li>
                <li><router-link class="nav-link" :to="'/area/' + 'HISTORY'">HISTORY</router-link></li>
                <li><router-link class="nav-link" :to="'/area/' + 'ART'">ART</router-link></li>
                <li><router-link class="nav-link" :to="'/area/' + 'OTHER'">OTHER</router-link></li>
             
            </ul>
             
            <p>Tot click: {{count}}</p>
            
          </div>
        </nav>
        `,

    data: function () {
        return {
            count: 0,
        }
    },

    methods: {
        onClickChild() {
            this.count++;
        },
    }
}

/*
  a class="nav-link" @onclick.prevent="href='/area/OTHER'">OTHER </a>

            <li><router-link class="nav-link" to="./area/IT">POLLOM</router-link></li>
            <li><router-link class="nav-link" to="area/ART">PbOLLOM</router-link></li>
            <li><router-link class="nav-link" to="/area/HISTORY">HISTORY</router-link></li>
            <li><router-link class="nav-link" to="/area/ART">ART</router-link></li>


<navbutton text="IT" @clicked="onPassString()"></navbutton>

<router-link v-bind:to="'/area/' + 'IT'">CAVOLO2</router-link>
<router-link v-bind:to="'/area/' + 'MATH'">CAVOLO3</router-link>
<router-link v-bind:to="'/area/' + 'SCIENCE'">CAVO3LO</router-link>

va ma è brutto ricarica tutta la pagina
<li><a href="/area/IT" class="nav-link">poi</a></li>

stare attuenti alle barre prima ecc ecc
<li><router-link v-bind:to="'./area/' + 'IT'">CAVOLO2</router-link></li>
<router-link v-bind:to="'../area/' + 'MATH'">CAVOLffO2</router-link>
<router-link v-bind:to="'area/' + 'IT'">CAVOLO2</router-link>

<a :href="$router.resolve({name: '/area/ART'}).href">link</a>

<router-link v-bind:to="'/area/' + 'MATH'">MATH</router-link>
<router-link v-bind:to="'/area/' + 'SCIENCE'">SCIENCE</router-link>
*/

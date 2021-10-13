const Home = {
    template: `
<div id="home-component" class="container-fluid">
	<h1> Home Component</h1>
	<h1>Questa è la home</h1></h>
	<div>
	<h1 v-if="isUserSetted()">Welcome, {{this.userId}}</h1>
	<h1 v-else>Login to continue :)</h1>
	</div>
</div>
`,

    data: function (){
        return {
            userId : "",
        }
    },

    methods: {
        init() {
            this.userId = localStorage.getItem('username');
            console.log("home opened");
        },
        isUserSetted(){
            if((this.userId === null) || (this.userId === "") || (typeof this.userId === "undefined")){
                console.log("no user logged");
                return false;
            }
            else {
                console.log("logged as " + this.userId);
                return true;
            }
        },

    },

    mounted() {
        this.init();
    },

}
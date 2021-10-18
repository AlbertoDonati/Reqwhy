const Home = {
    template: `
<div id="home-component" class="container-fluid">
	<h1> Home Component</h1>
	<div>
	<h1>Welcome, {{this.userId}}</h1>
	</div>
	<p>Please, go to the area you prefer. Ask and reply.</p>
</div>
`,
    data: function (){
        return {
            userId : "",
        }
    },
    mounted() {
        this.userId = localStorage.getItem('username');
        if((this.userId === null) || (this.userId === "") || (typeof this.userId === "undefined")){
            router.push(`/login`, () => {});
        }
    },

/*

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
*/

}
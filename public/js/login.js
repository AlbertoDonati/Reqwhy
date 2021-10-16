const Login = {
    template: `
<div id="login-component" class="container-fluid">
	<h1>Login Component</h1>
	<div class="row">
		<div class="col">
		<div v-if="!isLoginCorrect">
		<p style="color: darkorange">Wrong username and/or password</p>
		</div>
			<form id="formLogin">
				<div class="form-group">
					<label>username</label>
					<input class="form-control" v-model="user.username" type="text" id="username">
				</div>
				<div class="form-group">
					<label>password</label>
					<input class="form-control" v-model="user.password" type="password" id="password">
				</div>
			</form>
			<div>
			<button @click.prevent="verifyUser" :disabled="!isFilled" type="submit" class="btn btn-primary">Login</button>
			<button @click.prevent="logout" type="submit" class="btn btn-primary">Logout</button>
			</div>
			
			<div>
			<button @click.prevent="fakeLoginUser1" type="submit" class="btn btn-primary">FakeLoginUtente</button>
			<button @click.prevent="fakeLoginUser2" type="submit" class="btn btn-primary">FakeLoginProf</button>
		    </div>
		    
		</div>
	</div>		
</div>
`,

    data() {
        return  {
            user: {
                username: "",
                password: "",
                isTeacher: "",
            },
            userId: "",
            isLoginCorrect: true,
        }
    },

    methods: {

        /*da rivedere tutta questa perchè boh, incluso ritorno ed errori ecc */
        /*se errore sett islogincorrect a false così fa vedere il warning*/

        verifyUser() {
            axios.post("http://localhost:3000/api/login", this.user)
                .then(response => {
                    console.log("login success of username" + response.username);
                })
        },

        /* verifyUser() {
            axios.post("http://localhost:3000/api/login", this.new_user)
                .then(response => {
                    console.log("login success of username" + response.username);
                    // router.push({ path: `/` });
                }).catch((error) => {
                if (error.response.status === 404) {
                    this.isLoginCorrect = false;
                }
            })
        },  */

        /*  console.log("CAVOLO" + response.data);
        console.log("login success")
        localStorage.setItem('username', response.data.username);
        this.isSetted(); */

        isSetted(){
            if((this.userId === null) || (this.userId === "") || (typeof this.userId === "undefined")){
                console.log("no user logged");
                return false;
            }
            else {
                console.log("logged as " + this.userId);
                return true;
            }
        },

        logout(){
            localStorage.setItem('username', "");
            console.log("logout");
            router.push({ path: `/` });
        },

        fakeLoginUser1(){
            localStorage.setItem('username', "utente");
            this.isSetted();
            router.push({ path: `/` });
        },

        fakeLoginUser2(){
            localStorage.setItem('username', "prof");
            this.isSetted();
            router.push({ path: `/` });
        },

        init() {
            this.userId = localStorage.getItem('username');
            console.log("login opened");
            this.isSetted();
        }

    },

    mounted() {
        this.init();
    },

    computed: {
        isFilled() {
            return this.user.username && this.user.password;
        }
    },

}

const Login = {
    template: `
<div id="login-component" class="container-fluid">
	<h1>Login Component</h1>
	<div class="row">
		<div class="col">
		<!--
		<div v-if="!isLoginCorrect">
		<p style="color: darkorange">Wrong username and/or password</p>-->
		</div>
			<form id="formLogin">
				<div class="form-group">
					<label>username</label>
					<input class="form-control" v-model="inserted_user.username" type="text" id="username">
					
				</div>
				<div class="form-group">
					<label>password</label>
					<input class="form-control" v-model="inserted_user.password" type="password" id="password">
				</div>
			</form>
			
			<div>
			<button @click="verifyUser(inserted_user)" :disabled="!isFilled" type="submit" class="btn btn-primary">Login</button>
			</div>
			<div>
			<button @click="logout" type="submit" class="btn btn-primary">Logout</button>
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
            inserted_user: {
                username: "",
                password: "",
            },
            verified_user: {
                username: "",
                password: "",
            },
            userId: "",
            isLoginCorrect: true,
        }
    },

    methods: {
        verifyUser(inserteduser) {
            this.verified_user.username = inserteduser.username;
            this.verified_user.password = inserteduser.password;
            axios.post("/api/login", this.verified_user)
                .then(response => {
                    console.log("login success of " + this.verified_user.username);
                })
        },
        /*
        addAnswer(){
            axios.post("/api/answers",this.new_answer)
                .then(response => {
                    this.answers.push(response.data);
                    this.hideAddAndResetAnswer();
                })
            console.log("riposta inserita");
        },*/

        /*da rivedere tutta questa perchè boh, incluso ritorno ed errori ecc */
        /*se errore sett islogincorrect a false così fa vedere il warning*/



        logout(){
            localStorage.setItem('username', "");
            console.log("logout");
            router.push({ path: `/` });
        },

        fakeLoginUser1(){
            localStorage.setItem('username', "utente");
            router.push({ path: `/crudquestions` });
        },

        fakeLoginUser2(){
            localStorage.setItem('username', "prof");
            router.push({ path: `/crudquestions` });
        },
    },
    mounted() {
        this.userId = localStorage.getItem('username');
    },
    computed: {
        isFilled() {
           if ((this.inserted_user.username !== "") && (this.inserted_user.password !== "")) {
                return true;
            }
        }
    },

}

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
//penso che l'is setted non serva a molto in sto caso
/*
isSetted(){
    if((this.userId === null) || (this.userId === "") || (typeof this.userId === "undefined")){
        console.log("not logged");
        return false;
    }
    else {
        console.log("logged as " + this.userId);
        return true;
    }
},*/



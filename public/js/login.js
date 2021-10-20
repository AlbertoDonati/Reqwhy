const Login = {
    template: `
<div id="login-component" class="container-fluid">
    
    <h1 v-if="showForm">Login</h1>			
	<h1 v-if="!showForm">Logout</h1>
	
	<div class="row">
		<div class="col">
		
		<div v-if="!isLoginCorrect">
		<p style="color: darkorange">Wrong username and/or password</p>
		</div>
		
		  <div v-if="showForm">
			<form id="formLogin">
				<div class="form-group">
					<label>username</label>
					<input class="form-control" v-model="inserted_user.username" type="text" id="username" placeholder="Enter username">	
				</div>
				<div class="form-group">
					<label>password</label>
					<i v-if="!showPassword" @click.prevent="showPsw" class="far fa-laugh" style="margin-left: 1%"></i>
					<i v-if="showPassword" @click.prevent="showPsw" class="fas fa-laugh-squint" style="margin-left: 1%"></i>
					<input v-if="!showPassword" class="form-control" v-model="inserted_user.password" type="password" id="password_hidden" placeholder="Enter password">
				    <input v-if="showPassword" class="form-control" v-model="inserted_user.password" type="text" id="password_show" placeholder="Enter password">
				</div>
			</form>
			<button @click="verifyUser(inserted_user)" :disabled="!isFilled" type="submit" class="btn btn-primary" style="margin-top: 1%">Login</button>
		  </div>
		  
			<div v-if="!showForm">
			<button @click="logout" type="submit" class="btn btn-info" style="margin-top: 1%">Logout</button>
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
            showForm: true,
            showPassword: false,
        }
    },
    methods: {
        verifyUser(inserteduser) {
            this.verified_user.username = inserteduser.username;
            this.verified_user.password = inserteduser.password;
            axios.post("/api/login", this.verified_user)
                .then(response => {
                    if(response.data === true) {
                        console.log("login success of " + this.verified_user.username);
                        localStorage.setItem('username', this.verified_user.username);
                        this.isLoginCorrect = true;
                        this.showForm = false;
                        router.push(`/`, () => {});
                    }
                    else {
                        console.log("wrong username and/or password");
                        this.showWarningAndReset();
                    }
                    this.showPassword = false;
                })
                .catch(error => {
                    console.log(error);
                })
        },
        logout(){
            localStorage.setItem('username', "");
            console.log("logout");
            this.isLoginCorrect = true;
            this.showForm = true;
            router.push(`/login`, () => {});
        },
        showWarningAndReset(){
            this.isLoginCorrect = false;
            this.inserted_user.username = "";
            this.inserted_user.password = "";
        },
        showLogin(){
            this.showForm = true;
        },
        hideLogin(){
            this.showForm = false;
        },
        showPsw(){
            this.showPassword = this.showPassword !== true;
        },
    },
    mounted() {
        this.userId = localStorage.getItem('username');
        if((this.userId === null) || (this.userId === "") || (typeof this.userId === "undefined")){
            console.log("no user logged");
            this.showLogin();
        }
        else {
            console.log("logged user " + this.userId);
            this.hideLogin();
        }
    },
    computed: {
        isFilled() {
            if ((this.inserted_user.username !== "") && (this.inserted_user.password !== "")) {
                return true;
            }
        }
    },
}
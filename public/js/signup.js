const SignUp = {
    template: `
<div id="signup-component" class="container-fluid">
	<h1>SignUp</h1>
	<div class="row">
		<div class="col">
		        <div v-if="isError">
		        <p style="color: darkorange">Error. Try again.</p>
		        </div>
			<form id="formSignUp">
				<div class="form-group">
					<label>username</label>
					<input class="form-control" v-model="new_user.username" type="text" id="username" placeholder="Enter username">
				</div>
				<div class="form-group">
					<label>password</label> <i @click.prevent="showPsw" class="fas fa-eye-slash" style="margin-left: 1%"></i>
					<input v-if="!showPassword" class="form-control" v-model="new_user.password" type="password" id="password_hidden" placeholder="Enter password">
				    <input v-if="showPassword" class="form-control" v-model="new_user.password" type="text" id="password_show" placeholder="Enter password">
				</div>
				<div class="form-group form-check" style="margin-top: 1%">
                <input type="checkbox" class="form-check-input" v-model="new_user.isTeacher" id="isTeacher">
                <label class="form-check-label">I'm a teacher</label>
                </div>
			</form>
				<button @click="addUser" :disabled="!isFilled" type="submit" class="btn btn-primary" style="margin-top: 1%">SignUp</button>
		</div>
	</div>
</div>
`,

    data() {
        return  {
            new_user: {
                username: "",
                password: "",
                isTeacher: false,
            },
            isError: false,
            showPassword: false,
        }
    },

    methods: {
        addUser() {
            axios.post("/api/crypt", this.new_user)
                .then(response => {
                    this.new_user.password = response.data;
                    axios.post("/api/signup", this.new_user)
                        .then(response => {
                            if (response.data === true) {
                                console.log("signup success of " + this.new_user.username);
                                this.isError = false;
                                router.push(`/login`, () => {});
                            } else {
                                console.log("error");
                                this.showWarningAndReset();
                            }
                            this.showPassword = false;
                        })
                        .catch(error => {
                            console.log(error);
                        })
                })
                .catch(error => {
                    console.log(error);
                })
        },
        showWarningAndReset(){
            this.isError = true;
            this.new_user.username = "";
            this.new_user.password = "";
            this.new_user.isTeacher = false;
        },
        showPsw(){
            this.showPassword = this.showPassword !== true;
        },
    },
    computed: {
        isFilled() {
            if ((this.new_user.username !== "") && (this.new_user.password !== "")) {
                return true;
            }
        }
    },
}
const SignUp = {
    template: `
<div id="signup-component" class="container-fluid">
	<h1>SignUp Component</h1>
	<div class="row">
		<div class="col">
		<div v-if="isAlreadyUsed">
		<p style="color: darkorange">Username already assigned</p>
		</div>
			<form id="formSignUp">
				<div class="form-group">
					<label>username</label>
					<input class="form-control" v-model="new_user.username" type="text" id="username">
				</div>
				<div class="form-group">
					<label>password</label>
					<input class="form-control" v-model="new_user.password" type="password" id="password">
				</div>
				<div class="form-group form-check">
                <input type="checkbox" class="form-check-input" v-model="new_user.isTeacher" id="type">
                <label class="form-check-label">I'm a teacher</label>
                </div>
			</form>
				<button @click.prevent="addUser" type="submit" class="btn btn-primary">SignUp</button>
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
            isAlreadyUsed: false,
        }
    },

    methods: {

        addUser() {
            axios.post("./api/signup", this.new_user)
                .then(response => {
                    console.log("signup success");
                    router.push({ path: `/login` });
                }).catch((error) => {
                if (error.response.status === 404) {
                    this.isAlreadyUsed = true;
                }
            })
        },
        init() {
            console.log("signup opened");
        },
    },


    mounted() {
        this.init();
    },

}


const AnswersByQuestionId = {
	template: `
<div id="answers-component" class="container-fluid">
	<h1>Answers Component</h1>

	<div class="card">
  		<div class="card-header">
   		 {{questionReaded.titleQuestion}}
  		</div>
  		<div class="card-body">
    	<h5 class="card-title">{{questionReaded.descriptionQuestion}}</h5>
    	<p class="card-text"><small class="text-muted">Posted on {{questionReaded.dateQuestion | limit(10)}} by {{questionReaded.userIdQuestion}}</small></p>
    	<p class="card-text"></p>
    	<a href="#" class="btn btn-primary">Go somewhere</a>
		</div>
	</div>
	
	<div>
 	<p>Answers</p>
	</div>
	
	<div class="row">
		<div class="col">
		<table class="table responsive">
			<thead class="thead-dark">
				<tr>
					<th scope="col">idQuestion</th>
					<th scope="col">Text</th>
					<th scope="col">User</th>
					<th scope="col">Date</th>
					<th scopt="col">Actions</th>
					<th scope="col">Bests</th>
					<th scope="col">Tops</th>
				</tr>
			</thead>
			<tbody>
			<tr v-for="(answer,index) in answers" :key="answer._id">
				<td>{{answer.idQuestion}}</td>
				<td>{{answer.textAnswer | limit(30)}}</td>
				<td>{{answer.userIdAnswer}}</td>
				<td>{{answer.dateAnswer | limit(10)}}</td>
				<td v-if="!controlMyAns(index)">
				<button @click.prevent="upAnswer(answer._id,index,answer)" type="button" class="btn btnsm">
						<i class="fas fa-angle-double-up"></i>
				</button>
				</td>
				<td v-if="controlMyAns(index)">
				<button @click.prevent="downAnswer(answer._id,index,answer)" type="button" class="btn btnsm">
						<i class="fas fa-angle-double-down"></i>
				</button>
				</td>
				<td>{{answer.bests}}</td>
				<p v-for="(top,indexTop) in answer.tops" :key="top._id">{{top}}</p>
			</tr>
			</tbody>
		</table>
		</div>
	</div>
	
	<div class="row">
		<div class="col">
			<button @click.prevent="showAddAnswer" type="button" class="btn btn-success"><i class="fas fa-plus"></i> Add Answer</button>
		</div>
	</div>
	
	<div class="row" v-if="adding">
		<div class="col">
			<form id="formCrudAnswers">
				<div class="form-group">
					<label>Text</label>
					<textarea class="form-control" v-model="new_answer.textAnswer" id="textAnswer" placeholder="Enter text"></textarea>
				</div>
				<div class="form-group">
					<label>Date {{new_answer.dateAnswer | limit(10)}} </label>
				</div>
			</form>
				<button @click.prevent="addAnswer" type="submit" class="btn btn-primary">Submit</button>
				<button @click.prevent="hideAddAnswer" type="cancel" class="btn btn-danger">Cancel</button>
		</div>
	</div>
	
</div>
`,

	data: function (){
		return {
			answers: [],
			questionReaded: "",
			questionId: this.$route.params.question,
			adding: false,
			new_answer: {
				idQuestion: "",
				textAnswer: "",
				userIdAnswer: "",
				dateAnswer: new Date(Date.now()).toISOString(),
				bests: "",
				tops: [],
			},
			new_mod_answer: {
				idQuestion: "",
				textAnswer: "",
				userIdAnswer: "",
				dateAnswer: "",
				bests: "",
				tops: [],
			},
			userId : "",
			isAlreadyInTops: false,
			answerReaded: "", /*non serve answerreader*/
			topsOfAnswer: [],
			indexOfTop: -1,
		}
	},

	methods: {
		listAnswersByQuestionId(question_id) {
			axios.get("http://localhost:3000/api/answersbyquestionid/" + question_id)
				.then(response => {
					this.answers = response.data;
				})
				.catch(error => {
					console.log(error);
				})
			console.log("answers readed");
		},

		readQuestion(question_id){
			axios.get("http://localhost:3000/api/questions/"+question_id)
				.then(response => {
					this.questionReaded = response.data;
				})
				.catch(error => {
					console.log(error);
				})
			console.log("question readed");
		},
		/* questo read answer non serve */
		readAnswer(answer_id){
			axios.get("http://localhost:3000/api/answers/"+answer_id)
				.then(response => {
					this.answerReaded = response.data;
				})
				.catch(error => {
					console.log(error);
				})
			console.log("answer readed");
		},
		showAddAnswer(){
			this.adding = true;
		},
		hideAddAnswer(){
			this.adding = false;
		},
		addAnswer(){
			axios.post("http://localhost:3000/api/answers",this.new_answer)
				.then(response => {
					this.answers.push(response.data);
					this.hideAddAnswer();
				})
			console.log("riposta inserita");
		},
		upAnswer(answer_id,idx,newanswer){
				this.new_mod_answer.idQuestion =  newanswer.idQuestion;
				this.new_mod_answer.textAnswer =  newanswer.textAnswer;
				this.new_mod_answer.userIdAnswer =  newanswer.userIdAnswer;
				this.new_mod_answer.dateAnswer =  newanswer.dateAnswer;
				newanswer.tops.push(this.userId);
				this.new_mod_answer.tops = newanswer.tops;
				this.new_mod_answer.bests = newanswer.bestsAnswer;

			axios.put("http://localhost:3000/api/answers/"+answer_id,this.new_mod_answer)
				.then(response => {
					this.answers.splice(idx,1,response.data);
				});
			console.log("answer up");
		},
		downAnswer(answer_id,idx,newanswer){
			this.new_mod_answer.idQuestion =  newanswer.idQuestion;
			this.new_mod_answer.textAnswer =  newanswer.textAnswer;
			this.new_mod_answer.userIdAnswer =  newanswer.userIdAnswer;
			this.new_mod_answer.dateAnswer =  newanswer.dateAnswer;
			this.topsArray = newanswer.tops;
			this.indexOfTop = this.topsArray.indexOf(this.userId,0);
			newanswer.tops.splice(this.indexOfTop,1);
			this.new_mod_answer.tops = newanswer.tops;
			this.new_mod_answer.loves = newanswer.lovesAnswer;
			this.new_mod_answer.bests = newanswer.bestsAnswer;

			axios.put("http://localhost:3000/api/answers/"+answer_id,this.new_mod_answer)
				.then(response => {
					this.answers.splice(idx,1,response.data);
				})
			console.log("answer down");
		},
		controlMyAns(idx){
			this.topsArray = this.answers.at(idx).tops;
			if(this.topsArray.indexOf(this.userId,0) === -1){
				return false;
			} else {
				return true;
			}
		},
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
	},

	mounted() {
		this.userId = localStorage.getItem('username');
		if(!this.isSetted()){
			router.push({ path: `/` })
		}
		else {
			this.new_answer.userIdAnswer = this.userId;
			this.new_answer.idQuestion = this.questionId;
			this.readQuestion(this.questionId);
			this.listAnswersByQuestionId(this.questionId);
		}
	},

	filters: {
		limit(text,length){
			if(text==null) return ""
			return text.substring(0,length);
		}
	},

}
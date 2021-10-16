const CrudQuestions = {
  template: `
<div id="crud-questions-component" class="container-fluid">
	<h1>Crud Questions Component</h1>
	<div class="row">
		<div class="col">
			<button @click.prevent="showAddQuestion" type="button" class="btn btn-success"><i class="fas fa-plus"></i> Add Question</button>
		</div>
	</div>
	<div class="row" v-if="adding">
		<div class="col">
			<form id="formCrudQuestions">
				<div class="form-group">
					<label>Title</label>
					<input class="form-control" v-model="new_question.titleQuestion" type="text" id="titleQuestion" placeholder="Enter title">
				</div>
				<div class="form-group">
					<label>Description</label>
					<textarea class="form-control" v-model="new_question.descriptionQuestion" id="descriptionQuestion" placeholder="Enter description"></textarea>
				</div>
				<div class="form-group">
					<label>Date {{new_question.dateQuestion | limit(10)}} </label>
					<!---
					<input v-model="new_question.dateQuestion" type="date" class="form-control" id="dateQuestion" >
				  -->
				</div>
				<div class="form-group">
				<label>Area</label>
				<div class="form-check">
        <input class="form-check-input" type="radio" value="IT" v-model="new_question.area" id="radioBtn">
        <label class="form-check-label" for="radioBtn" >IT</label>
        </div>
        <div class="form-check">
        <input class="form-check-input" type="radio" value="MATH" v-model="new_question.area" id="radioMATH">
        <label class="form-check-label" for="radioBtn" >MATH</label>
        </div>
        <div class="form-check">
        <input class="form-check-input" type="radio" value="SCIENCE" v-model="new_question.area" id="radioSCIENCE">
        <label class="form-check-label" for="radioBtn" >SCIENCE</label>
        </div>
        <div class="form-check">
        <input class="form-check-input" type="radio" value="HISTORY" v-model="new_question.area" id="radioHISTORY">
        <label class="form-check-label" for="radioBtn" >HISTORY</label>
        </div>
        <div class="form-check">
        <input class="form-check-input" type="radio" value="ART" v-model="new_question.area" id="radioART">
        <label class="form-check-label" for="radioBtn" >ART</label>
        </div>
        <div class="form-check">
        <input class="form-check-input" type="radio" value="OTHER" v-model="new_question.area" id="radioOTHER">
        <label class="form-check-label" for="radioBtn">OTHER</label>
        </div>
        </div>
			</form>
				<button @click.prevent="addQuestion" type="submit" class="btn btn-primary">Submit</button>
				<button @click.prevent="hideAddQuestion" type="cancel" class="btn btn-danger">Cancel</button>
		</div>
	</div>
	<div class="row">
		<div class="col">
		<table class="table responsive">
			<thead class="thead-dark">
				<tr>
					<th scope="col">Title</th>
					<th scope="col">Description</th>
					<th scope="col">User</th>
					<th scope="col">Date</th>
					<th scope="col">Area</th>
					<th scope="col">Actions</th>
				</tr>
			</thead>
			<tbody>
			<tr v-for="(question,index) in questions" :key="question._id">
				<td>{{question.titleQuestion}}</td>
				<td>{{question.descriptionQuestion | limit(30)}}</td>
				<td>{{question.userIdQuestion}}</td>
				<td>{{question.dateQuestion | limit(10)}}</td>
				<td>{{question.area}}</td>
				<td>
					<button @click.prevent="deleteQuestion(question._id,index)" type="button" class="btn btnsm">
						<i class="fas fa-trash-alt"></i>
					</button>
					<button @click.prevent="sendIdToAnswer(question._id)" type="button" class="btn btnsm">
						<i class="fas fa-pen-alt"></i>
					</button>
				</td>
			</tr>
			</tbody>
		</table>
		</div>
	</div>
</div>
`,

  data() {
    return  {
      questions: [],
      adding: false,
      new_question: {
        titleQuestion: "",
        desriptionQuestion: "",
        userIdQuestion: "",
        dateQuestion: new Date(Date.now()).toISOString(),
        area: "",
      },
      userId: "",
    }
  },

  methods: {
    listQuestions(){
      axios.get("/api/questions")
        .then( response => {
          this.questions = response.data;
        })
    },
    showAddQuestion(){
      this.adding = true;
    },
    hideAddQuestion(){
      this.adding = false;
    },
    addQuestion(){
      axios.post("/api/questions",this.new_question)
        .then(response => {
          this.questions.push(response.data);
          this.hideAddQuestion();
        })
    },
    deleteQuestion(question_id,idx){
      axios.delete("/api/answersbyquestionid/"+question_id)
          .then(response => {
            console.log("Deleted answers related to question " + question_id)
          })
          .catch(error => {
            console.log(error);
          })

      axios.delete("/api/questions/"+question_id)
        .then(response => {
          this.questions.splice(idx,1);
          console.log("Deleted question " + question_id)
        })
        .catch(error => {
          console.log(error);
        })

    },
    sendIdToAnswer(question_id){
      console.log("apro le risposte della domanda " + question_id)
      router.push({ path: `/answersbyid/${question_id}` })
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
      this.new_question.userIdQuestion = this.userId;
      this.listQuestions();
    }
  },

  filters: {
    limit(text,length){
      if(text==null) return ""
      return text.substring(0,length);
    }
  },

}


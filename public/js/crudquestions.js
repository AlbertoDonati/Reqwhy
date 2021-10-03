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
			<form>
				<div class="form-group">
					<label>Title</label>
					<input v-model="new_question.titleQuestion" type="text" class="form-control" id="titleQuestion" placeholder="Enter title">
				</div>
				<div class="form-group">
					<label>Description</label>
					<textarea v-model="new_question.descriptionQuestion" class="form-control" id="descriptionQuestion"></textarea>
				</div>
				<div class="form-group">
					<label>Date</label>
					<input v-model="new_question.dateQuestion" type="date" class="form-control" id="dateQuestion" >
				</div>
				<div class="form-group">
					<label>Area</label>
					<textarea v-model="new_question.area" class="form-control" id="area"></textarea>
				</div>
				<div class="form-group">
					<label>Category</label>
					<textarea v-model="new_question.category" class="form-control" id="category"></textarea>
				</div>
				<button @click.prevent="addQuestion" type="submit" class="btn btn-primary">Submit</button>
				<button @click.prevent="hideAddQuestion" text="submit" class="btn btn-danger">Cancel</button>

			</form>
		</div>
	</div>
	<div class="row">
		<div class="col">
		<table class="table responsive">
			<thead class="thead-dark">
				<tr>
					<th scope="col">Title</th>
					<th scope="col">Description</th>
					<th scope="col">Date</th>
					<th scope="col">Area</th>
					<th scope="col">Category</th>
					<th scope="col">Delete</th>
				</tr>
			</thead>
			<tbody>
			<tr v-for="(question,index) in questions" :key="question._id">
				<td>{{question.titleQuestion}}</td>
				<td>{{question.descriptionQuestion | limit(30)}}</td>
				<td>{{question.dateQuestion | limit(10)}}</td>
				<td>{{question.area}}</td>
				<td>{{question.category}}</td>
				<td>
					<button @click.prevent="deleteQuestion(question._id,index)" type="button" class="btn btnsm">
						<i class="fas fa-trash-alt"></i>
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
        dateQuestion: "",
        area: "",
        category: ""
      }
    }
  },

  methods: {
    listQuestions(){
      axios.get("http://localhost:3000/api/questions")
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
      axios.post("http://localhost:3000/api/questions",this.new_question)
        .then(response => {
          this.questions.push(response.data);
          this.hideAddQuestion();
        })
    },
    deleteQuestion(question_id,idx){
      axios.delete("http://localhost:3000/api/questions/"+question_id)
        .then(response => {
          this.questions.splice(idx,1);
        })
        .catch(error => {
          console.log(error);
        })
    }
  },

  mounted() {
    this.listQuestions();
  },

  filters: {
    limit(text,length){
      if(text==null) return ""
      return text.substring(0,length);
    }
  },

}


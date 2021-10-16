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
		<button @click.prevent="addQuestion" :disabled="!isFilled" type="submit" class="btn btn-primary">Submit</button>
		<button @click.prevent="hideAddAndResetQuestion" type="cancel" class="btn btn-danger">Cancel</button>			
	 </div>
  </div>
	<div class="row">
		<div class="col">
		<table class="table responsive">
			<thead class="thead-dark">
				<tr>
					<th style="text-align: left;" scope="col">Title</th>
					<th style="text-align: left;" scope="col">Description</th>
					<th style="text-align: center;" scope="col">User</th>
					<th style="text-align: center;" scope="col">Date</th>
					<th style="text-align: center;" scope="col">Area</th>
					<th style="text-align: center;" scope="col">Actions</th>
				</tr>
			</thead>
			<tbody>
			<tr v-for="(question,index) in questions" :key="question._id">
				<td style="text-align: left;">{{question.titleQuestion}}</td>
				<td style="text-align: left;">{{question.descriptionQuestion | limit(225)}}</td>
				<td style="text-align: center;">{{question.userIdQuestion}}</td>
				<td style="text-align: center;">{{question.dateQuestion | limit(10)}}</td>
				<td style="text-align: center;">{{question.area}}</td>
				<td style="text-align: center;">
                         <button v-if="!controlMyQuest(index)" @click.prevent="loveQuestion(question._id,index,question)" type="button" class="btn btnsm">
                         <i class="far fa-grin-hearts"></i>
                         {{question.loves.length}}
                         </button>
                        
                         <button v-if="controlMyQuest(index)" @click.prevent="notLoveQuestion(question._id,index,question)" type="button" class="btn btnsm">
                         <i class="fas fa-grin-hearts"></i>
                         {{question.loves.length}}
                         </button>
                       
                    <button @click.prevent="deleteQuestion(question._id,index)" type="button" class="btn btnsm">
					<i class="fas fa-trash"></i>
					</button>
					
                    <button @click.prevent="sendIdToAnswer(question._id)" type="button" class="btn btnsm">
					<i class="fas fa-chevron-right"></i>
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
        descriptionQuestion: "",
        userIdQuestion: "",
        dateQuestion: new Date(Date.now()).toISOString(),
        area: "",
        bestByUser: "",
        loves: [],
      },
      new_mod_question: {
        titleQuestion: "",
        descriptionQuestion: "",
        userIdQuestion: "",
        dateQuestion: "",
        area: "",
        bestByUser: "",
        loves: [],
      },
      userId: "",
      indexOfLove: -1,
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
      this.new_question.dateQuestion = new Date(Date.now()).toISOString();
    },
    hideAddAndResetQuestion(){
      this.adding = false;
      this.new_question.titleQuestion = "";
      this.new_question.descriptionQuestion = "";
    },
    addQuestion(){
      axios.post("/api/questions",this.new_question)
        .then(response => {
          this.questions.push(response.data);
          this.hideAddAndResetQuestion()
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
    loveQuestion(question_id,idx,newquestion){
          this.new_mod_question.titleQuestion =  newquestion.titleQuestion;
          this.new_mod_question.descriptionQuestion =  newquestion.descriptionQuestion;
          this.new_mod_question.userIdQuestion =  newquestion.userIdQuestion;
          this.new_mod_question.dateQuestion =  newquestion.dateQuestion;
          this.new_mod_question.area =  newquestion.area;
          this.new_mod_question.bestByUser =  newquestion.bestByUser;
          newquestion.loves.push(this.userId);
          this.new_mod_question.loves = newquestion.loves;

          axios.put("/api/questions/"+question_id,this.new_mod_question)
              .then(response => {
                this.questions.splice(idx,1,response.data);
              })
          console.log("question love");
        },
        notLoveQuestion(question_id,idx,newquestion){
          this.new_mod_question.titleQuestion =  newquestion.titleQuestion;
          this.new_mod_question.descriptionQuestion =  newquestion.descriptionQuestion;
          this.new_mod_question.userIdQuestion =  newquestion.userIdQuestion;
          this.new_mod_question.dateQuestion =  newquestion.dateQuestion;
          this.new_mod_question.area =  newquestion.area;
          this.new_mod_question.bestByUser =  newquestion.bestByUser;
          this.indexOfLove = newquestion.loves.indexOf(this.userId);
          newquestion.loves.splice(this.indexOfLove,1);
          this.new_mod_question.loves = newquestion.loves;

          axios.put("/api/questions/"+question_id,this.new_mod_question)
              .then(response => {
                this.questions.splice(idx,1,response.data);
              })
          console.log("question not love");
        },
        controlMyQuest(idx){
          if(this.questions.at(idx).loves.indexOf(this.userId) === -1){
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
      this.new_question.userIdQuestion = this.userId;
      this.listQuestions();
    }
  },
  computed: {
    isFilled() {
        return true
  }
},
  filters: {
    limit(text,length){
      if(text==null) return ""
      else if(text.length > Number(225)) {
        return (text.substring(0, length).concat("[continue...]"));
        } else {
        return text.substring(0, length);
        }
    }
  },
}
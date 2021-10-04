const Questions = {
	template: `
<div id="questions-component" class="container-fluid">
	<h1>Questions Component</h1>
				<button @click="listQuestionsByArea(area)" type="button" class="btn btn-success"><i class="fas fa-plus"></i>ESPLODI</button>
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
				</tr>
			</thead>
			<tbody>
			<tr v-for="(question,index) in questions" :key="question._id">
				<td>{{question.titleQuestion}}</td>
				<td>{{question.descriptionQuestion | limit(30)}}</td>
				<td>{{question.dateQuestion | limit(10)}}</td>
				<td>{{question.area}}</td>
				<td>{{question.category}}</td>
			</tr>
			</tbody>
		</table>
		</div>
	</div>
</div>
`,

	data: function (){
		return {
			questions: [],
			area: "IT",
		}
	},

	methods: {
		listQuestions(){
			axios.get("http://localhost:3000/api/questions")
				.then( response => {
					this.questions = response.data;
				})
		},
		listQuestionsByArea(area){
			axios.get("http://localhost:3000/api/questionsbyarea/" + area)
				.then( response => {
					this.questions = response.data;
				})
		},
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
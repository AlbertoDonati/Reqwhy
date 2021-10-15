const Questions = {
	template: `
<div id="questions-component" class="container-fluid">
	<h1>Questions Component</h1>
	<div class="row">
		<div class="col">
		<table class="table responsive">
			<thead class="thead-dark">
				<tr>
					<th scope="col">Title</th>
					<th scope="col">Description</th>
					<th scope="col">Date</th>
					<th scope="col">Area</th>
				</tr>
			</thead>
			<tbody>
			<tr v-for="(question,index) in questions" :key="question._id">
				<td>{{question.titleQuestion}}</td>
				<td>{{question.descriptionQuestion | limit(30)}}</td>
				<td>{{question.dateQuestion | limit(10)}}</td>
				<td>{{question.area}}</td>
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
		}
	},

	methods: {
		listQuestions(){
			axios.get("./api/questions")
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
const QuestionsByArea = {
	template: `
<div id="questions-by-area-component" class="container-fluid">
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

	data: function () {
		return {
			questions: [],
			area: this.$route.params.area,
			now: new Date(Date.now()).toISOString(),
		}
	},

	methods: {
		listQuestionsByArea(area) {
			axios.get("./api/questionsbyarea/" + area)
				.then(response => {
					this.questions = response.data;
				})
		},
	},

	mounted() {
		console.log("AREA " + this.area);
		console.log("NOW " + this.now);
		this.listQuestionsByArea(this.area);
	},

	filters: {
		limit(text,length){
			if(text==null) return ""
			return text.substring(0,length);
		}
	},

}
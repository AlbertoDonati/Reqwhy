const AnswersByQuestionId = {
	template: `
<div id="answers-component" class="container-fluid">
	<h1>Answers Component</h1>
	<div class="row">
		<div class="col">
		<table class="table responsive">
			<thead class="thead-dark">
				<tr>
					<th scope="col">idQuestion</th>
					<th scope="col">Text</th>
					<th scope="col">Date</th>
					<th scope="col">Tops</th>
					<th scope="col">Loves</th>
					<th scope="col">Bests</th>		
				</tr>
			</thead>
			<tbody>
			<tr v-for="(answer,index) in answers" :key="answer._id">
				<td>{{answer.idQuestion}}</td>
				<td>{{answer.textAnswer | limit(30)}}</td>
				<td>{{answer.dateAnswer | limit(10)}}</td>
				<td>{{answer.tops}}</td>
				<td>{{answer.loves}}</td>
				<td>{{answer.bests}}</td>
			</tr>
			</tbody>
		</table>
		</div>
	</div>
</div>
`,

	data: function (){
		return {
			answers: [],
			question: this.$route.params.question,
		}
	},

	methods: {
		listAnswersByQuestionId(question) {
			axios.get("http://localhost:3000/api/answersbyquestionid/" + question)
				.then(response => {
					this.answers = response.data;
				})
		},

	},

	mounted() {
		this.listAnswersByQuestionId(this.question);
	},

	filters: {
		limit(text,length){
			if(text==null) return ""
			return text.substring(0,length);
		}
	},

}
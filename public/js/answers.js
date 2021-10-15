const Answers = {
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
					<th scope="col">User</th>
					<th scope="col">Date</th>
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
				<td>{{answer.bests}}</td>
				<td>{{answer.tops}}</td>
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
		listAnswers() {
			axios.get("./api/answers")
				.then(response => {
					this.answers = response.data;
				})
		},
	},

	mounted() {
		this.listAnswers();
	},

	filters: {
		limit(text,length){
			if(text==null) return ""
			return text.substring(0,length);
		}
	},

}
<script>
	import { Line, mixins } from 'vue-chartjs'
	const { reactiveProp } = mixins

	export default {
	  name: 'LineChart',
	  extends: Line,
		mixins: [reactiveProp],
    props: ['chartData', 'options'],
    watch: {
			'options': {
				handler (newOption, oldOption) {
					this._chart.destroy()
					this.renderChart(this.chartData, this.options)
				},
				deep: true
			}
		},
		mounted () {
			this.renderChart(this.chartData, this.options)
		}
	}
</script>
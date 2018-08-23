<script>
	import { Bar, mixins } from 'vue-chartjs'
	const { reactiveProp } = mixins

	export default {
	  name: 'BarChart',
	  extends: Bar,
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
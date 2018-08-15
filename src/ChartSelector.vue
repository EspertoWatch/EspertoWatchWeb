<template>
    <div style="margin-left: 30px; margin-right: 30px; margin-top: 20px">
        <LineChart v-if="timeFrame === 'Today'" :height="175" :chartData="chartData" :options="chartOptions" class="chart"></LineChart>
        <BarChart v-else :height="175" :chartData="chartData" :options="chartOptions" class="chart"></BarChart>
        <v-layout row wrap style="margin-bottom: 15px">
            <v-flex xs3>
            <p class="input-label">Select Time Period: </p>
            </v-flex>
            <v-flex xs8>
            <v-select
                :items="timePeriodChoices"
                v-model="timeFrame"
            ></v-select>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
import LineChart from './Charts/LineChart.vue'
import BarChart from './Charts/BarChart.vue'
export default {
  name: 'HeartRate',
  props: {
      timePeriod: String,
      timePeriodChoices: Array,
      dayData: Array,
      weekData: Array,
      monthData: Array,
      chartColor: String,
      labelName: String,
      yAxisTitle: String
  },
  data () {
    return {
      timeFrame: this.timePeriod
    }
  },
  computed: {
    chartOptions(){
      return{
        scales: {
          xAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: this.getXTitle(),
              fontSize: 18,
            }
          }],
          yAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: this.yAxisTitle,
              fontSize: 18,
            }
          }]
        },
        legend: {
            display: false
        },
        tooltips: {
            callbacks: {
              label: function(tooltipItem) {
                      return tooltipItem.yLabel;
              }
            }
        }
      }
    },
    chartData(){
      return{
          labels: this.getLabels(),
          datasets: [
              {
                  label: this.labelName,
                  backgroundColor: this.chartColor,
                  data: this.getData()
              }
          ]
      }
    },
  },
  components: {
    LineChart,
    BarChart
  },
  methods: {
    getData(){
      if(this.timeFrame === "Today"){
        return this.dayData;
      }
      else if(this.timeFrame === "Last 7 Days"){
        return this.weekData;
      }
      else{
        return this.monthData;
      }
    },
    getLabels(){
      let n;
      if(this.timeFrame === "Today"){
        n = this.dayData.length;
      }
      else if(this.timeFrame === "Last 7 Days"){
        n = this.weekData.length;
      }
      else{
        n = this.monthData.length;
      }
      return Array.apply(null, {length: n}).map(Number.call, Number);
    },
    getXTitle(){
      if(this.timeFrame === "Today"){
        return "Time";
      }
      else if(this.timeFrame === "Last 7 Days"){
        return "Day of the Week"
      }
      else{
        return "Date"
      }
    }
  }
}
</script>

<style lang="scss" scoped>

h1 {
  font-weight: normal;
  font-size: 40px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
.input-label{
  line-height: 60px;
  font-size: 18px;
}
</style>
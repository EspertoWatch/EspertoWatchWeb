<template>
  <div id="stepCount">
    <h1> My Step Count Data </h1>
    <v-layout row justify-space-around>
      <v-card width="80vw" style="padding-right=10px; padding-left=10px;">
        <ChartSelector 
          :weekData="getMonthSteps.slice(Math.max(getMonthSteps.length - 7, 0))"
          :monthData="getMonthSteps"
          time-period="Last 7 Days"
          :time-period-choices="['Last 7 Days', 'Last 30 Days']"
          chartColor="#0000FF"
          labelName="Step Count"
          yAxisTitle="Number of Steps"
        />
      </v-card>
    </v-layout>
  </div>
</template>

<script>
import StepArchMeter from './StepArchMeter.vue'
import ChartSelector from './Chartselector.vue'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'StepCount',
  components: {
    StepArchMeter,
    ChartSelector
  },
  computed: {
    currentSteps(){
       return this.$store.state.stepCountData.currentSteps;
    },
    stepGoal(){
      return this.$store.state.userGoalsData.stepGoals.currentGoal;
    },
    ...mapGetters([
        'stepGoalProgress',
        'getMonthSteps'
    ])
  },
  methods: {
      ...mapActions([
          'getStepCountData',
          'getStepCountGoals',
      ])
  },
  mounted: function () {
      this.getStepCountData();
      this.getStepCountGoals();
  },
  filters:{
    getPercentageForStep(stepGoalProgress, basePercentage){
        const percentage = Math.min(Math.max(0, ((stepGoalProgress - (basePercentage-20))/20)*100), 100);
        return `${percentage}%`;
    }
  }
}
</script>

<style lang="scss" scoped>
#stepCount {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

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

.desc-text{
  font-size: 2.0rem !important;
  margin-left: 10px;
  margin-right: 10px;
}

.main-value{
  font-size: 3.2rem !important;
  font-weight: 545;
}

</style>
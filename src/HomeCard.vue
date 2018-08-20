<template>
  <div id="homeCard">
    <v-toolbar extension-height=40 style="backgroundColor: #fff">
        <v-layout row justify-space-around>
          <v-toolbar-title class="title" v-bind:style="{ color: themeColor }">{{title}}</v-toolbar-title>
          <v-flex xs3>
            <v-layout row justify-space-around>
              <img class="right-imgs" @click="showChartModal" src="/assets/app-images/graph-icon-2.png">
              <img class="right-imgs" @click="showCalendarModal" src="/assets/app-images/calendar-icon-2.png">
              <v-flex xs1/>
            </v-layout>
          </v-flex>
        </v-layout>
        <v-tabs centered
          slot="extension"
          slider-color="blue"
          slider-width=2px
          height=40px
          v-model="tab"
        >
          <v-tab v-for="tab in tabs" :key="tab.title" :href="'#tab-' + tab.title" style="font-size: 1.2em">
            {{tab.title}}
          </v-tab>
        </v-tabs>
    </v-toolbar>
    <v-card height=250px>
      <v-tabs-items v-model="tab">
        <v-tab-item v-for="tab in tabs" :key="tab.title" :id="'tab-' + tab.title">
            <div class="main-value-container">
              <v-layout row justify-center v-if="tab.unit === 'Steps'">
                <v-flex xs5>
                  <p class="main-value" style="font-size: 4.4rem !important;">{{tab.mainValue}}</p>
                  <div v-if="tab.id === 'week_steps' || tab.id === 'month_steps'">
                    <p style="font-size: 2.6rem !important;" class="main-value">{{tab.unit}}/day</p>
                  </div>
                  <div v-else>
                   <p style="font-size: 3.6rem !important;" class="main-value">{{tab.unit}}</p>
                  </div>
                </v-flex>
                <v-flex xs7>
                  <div style="margin-top: 30px;">
                    <StepArchMeter :idPrefix="tab.id" scale="0.6" :percentage1="getPercentageForStep(tab.mainValue, 20)" :percentage2="getPercentageForStep(tab.mainValue, 40)" :percentage3="getPercentageForStep(tab.mainValue, 60)" :percentage4="getPercentageForStep(tab.mainValue, 80)" :percentage5="getPercentageForStep(tab.mainValue, 100)"/>
                    <p style="font-size: 1.5rem">Goal {{Math.round((tab.mainValue/stepGoal)*100, 1)}}% complete!</p>
                  </div>
                </v-flex>
               </v-layout>
               <div v-else style="display: flex; flex-direction: column; justify-content: center; height: 150px;">
                <p class="main-value" style="font-size: 4.4rem !important;">{{tab.mainValue}} {{tab.unit}}</p>
               </div>
            </div>
            <div class="divider-container">
              <v-layout row justify-center style="margin-bottom: 30px">
                <v-flex xs2 v-if="showUpIcon(tab) !== false">
                  <div v-if="showUpIcon(tab) === 'green'">
                    <img src="/assets/app-images/up_arrow.png"></img>
                  </div>
                  <div v-else-if="showUpIcon(tab) === 'red'">
                     <img src="/assets/app-images/down_arrow.png"></img>
                  </div>
                </v-flex>
                <div class="vert-center" style="height: 68px">
                  <p class="sub-text"> {{tab | getIntervalString}}</p>
                </div>
              </v-layout>
            </div>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
    <v-dialog v-model="calendarModal" max-width="400">
      <CalendarView></CalendarView>
    </v-dialog>
    <v-dialog v-model="chartModal" max-width="400">
        <v-card style="padding-bottom: 20px;">
            <LineChart v-if="title === 'My Heart Rate'" :chartData="getChartData()" :options="getChartOptions()" class="chart"></LineChart>
            <BarChart v-else :chartData="getChartData()" :options="getChartOptions()" class="chart"></BarChart>
        </v-card>
    </v-dialog>
  </div>
</template>

<script>
import CalendarView from './CalendarView.vue'
import LineChart from './Charts/LineChart.vue'
import BarChart from './Charts/BarChart.vue'
import StepArchMeter from './StepArchMeter.vue'
import moment from 'moment'

export default {
  name: 'homeCard',
  props: {
    iconSrc: String,
    yAxisTitle: String,
    xAxisTitle: String,
    tabs: Array,
    link: String,
    chartData: Array,
    themeColor: String,
    chartTitle: String,
    stepGoal: String,
    title: String
  },
  data () {
    return {
      tab: null,
      chartModal: false,
      calendarModal: false
    }
  },
  methods: {
    showCalendarModal () {
      this.calendarModal = true;
    },
    showChartModal(){
      this.chartModal = true;
    },
    showUpIcon(item){
      if(item.title === "This Month"){
        return false;
      }
      else if(item.lastInterval > 0){
        return "green";
      }
      else{
        return "red";
      }
      return item.lastInterval > 0;
    },
    getLabels(){
      if(this.title === "My Step Count"){
        const daysOfWeek = [];
        for(let i = 0; i < 7; i ++){
          const dayOfWeek =  moment().subtract(i, 'day').format('ddd');
          daysOfWeek.unshift(dayOfWeek);
        }
        return daysOfWeek;
      }
      return Array.apply(null, {length: this.chartData.length}).map(Number.call, Number);
    },
    getChartOptions(){
      const options = {
            title: {
                display: true,
                text: this.chartTitle,
                fontSize: 20
            },
            scales: {
              xAxes: [{
                display: true,
                scaleLabel: {
                  display: true,
                  labelString: this.xAxisTitle,
                  fontSize: 16,
                },
                gridLines: {
                    display:false
                },
                ticks: {
                    display: (this.title === "My Step Count")
                }
              }],
              yAxes: [{
                display: true,
                scaleLabel: {
                  display: true,
                  labelString: this.yAxisTitle,
                  fontSize: 16,
                },
                ticks: {
                  beginAtZero: true,
                },
                gridLines: {
                    display:false
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
            },
            elements: { 
              point: { radius: 0 } 
            }
        };
        return options;
    },
    getChartData(){
      const data =  {
          labels: this.getLabels(),
          datasets: [
              {
                  label: "",
                  backgroundColor: this.themeColor,
                  data: this.chartData
              }
          ]
      };
      return data;
    },
    getPercentageForStep(stepValue, basePercentage){
        let percentage = Math.min(Math.max(0, (((stepValue/this.stepGoal)*100 - (basePercentage-20))/20)*100), 100);
        if(stepValue){
          percentage = Math.min(Math.max(0, (((stepValue/this.stepGoal)*100 - (basePercentage-20))/20)*100), 100);
        }
        return percentage + "%";
    }
  },
  filters:{
    getIntervalString(item){
      const lastInt = Math.abs(item.lastInterval);
      const unit = item.unit;
      if(item.title === "Today"){
        return lastInt + " " + unit + " from yesterday.";
      }
      else if(item.title === "This Week"){
        return lastInt + " " + unit + " from last week."
      }
      else if(item.title === "This Month"){
        return item.totalValue + " " + unit + " in total."
      }
      else if(item.title === "Current"){
        return lastInt + " " + unit + " from last updated value."
      }
    }
  },
  components: {
    CalendarView,
    LineChart,
    BarChart,
    StepArchMeter
  }
}
</script>

<style lang="scss" scoped>
  #homeCard{
    text-align: center
  }
  .circle{
    width: 40px;
    height: 40px;
    border-radius: 20px;
    border: solid 1px;
  }
  .circle-icon{
    margin-top: 10px;
    height: 20px;
    width: 20px;
  }
  .title{
    font-size: 2.5rem !important;
    font-weight: 525;
    margin: auto;
  }
  .right-imgs{
    height: 36px;
  }
  .title-container{
    align-items: center
  }
  .main-value-container{
    margin-bottom: 10px;
    margin-top: 10px;
    height: 150px;
  }
  .divider-container{
    margin-right: 10px;
    margin-left: 10px;
  }
  .main-value{
    font-weight: 545;
    line-height: 75px;
    margin-bottom: 0px;
  }
  .sub-text{
    font-size: 1.8em !important;
    line-height: 28px;
    margin-bottom: 0px;
  }
  .chart{
    padding-top: 20px;
    padding-left: 20px;
    padding-right: 20px;
  }
  .vert-center{
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
</style>
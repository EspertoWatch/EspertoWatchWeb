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
    <v-card height=225px>
      <v-tabs-items v-model="tab">
        <v-tab-item v-for="tab in tabs" :key="tab.title" :id="'tab-' + tab.title">
            <div class="main-value-container">
              <p class="main-value">{{tab.mainValue + " " + tab.unit}}</p>
            </div>
            <div class="divider-container">
              <v-layout row justify-center style="margin-bottom: 30px">
                <v-flex xs2 v-if="showUpIcon(tab) !== false">
                  <div v-if="showUpIcon(tab) === 'green'">
                    <img src="/assets/app-images/up_arrow.png"></img>
                  </div>
                  <div v-else-if="showUpIcon(tab) === 'red'">
                     <img style="margin-top: -5px" src="/assets/app-images/down_arrow.png"></img>
                  </div>
                </v-flex>
                <v-flex xs8>
                  <p class="sub-text"> {{tab | getIntervalString}}</p>
                </v-flex>
              </v-layout>
            </div>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
    <v-dialog v-model="calendarModal" max-width="400">
      <CalendarView></CalendarView>
    </v-dialog>
    <v-dialog v-model="chartModal" max-width="400">
        <v-card style="padding-bottom: 50px;">
            <BarChart :chartData="getChartData()" :options="getChartOptions()" class="chart"></BarChart>
        </v-card>
    </v-dialog>
  </div>
</template>

<script>
import CalendarView from './CalendarView.vue'
import LineChart from './Charts/LineChart.vue'
import BarChart from './Charts/BarChart.vue'

export default {
  name: 'homeCard',
  props: {
    iconSrc: String,
    title: String,
    tabs: Array,
    link: String,
    chartData: Array,
    themeColor: String,
    chartTitle: String
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
      const n = this.chartData.length;
      return Array.apply(null, {length: n}).map(Number.call, Number);
    },
    getChartOptions(){
      const options = {
            title: {
                display: true,
                text: this.chartTitle,
                fontSize: 20
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        };
        return options;
    },
    getChartData(){
      const data =  {
          labels: this.getLabels(),
          datasets: [
              {
                  label: this.title,
                  backgroundColor: this.themeColor,
                  data: this.chartData
              }
          ]
      };
      return data;
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
        return lastInt + " " + unit + " from last hour."
      }
    }
  },
  components: {
    CalendarView,
    LineChart,
    BarChart
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
    height: 150px;
  }
  .divider-container{
    margin-right: 10px;
    margin-left: 10px;
    height: 50px;
  }
  .main-value{
    font-size: 3.2rem !important;
    font-weight: 545;
    line-height: 150px;
  }
  .sub-text{
    font-size: 2.0rem !important;
  }
  .chart{
    padding-top: 20px;
    padding-left: 20px;
    padding-right: 20px;
  }
</style>
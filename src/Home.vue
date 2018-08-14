<template>
  <div id="home">
    <v-layout row justify-space-around>
        <v-flex xs11>
          <v-layout row>
            <img src="/assets/app-images/profile_placeholder.png" class="profile"></img>
            <v-layout column>
              <v-layout row style="margin-top: 20px;">
                <p class="welcome"> Welcome {{user.name}}! </p>
              </v-layout>
              <v-layout row style="margin-top: -20px;">
                <img src="/assets/app-images/watch_icon.png" class="watch-icon">
                <div class="vert-center">
                  <p class="sync-text" style="margin-right: 10px"> {{device.name}} last synced {{device.lastSynced | timestampToDate}}</p>
                </div>
              </v-layout>
            </v-layout>
          </v-layout>
        </v-flex>
    </v-layout>
    <v-layout row justify-space-around>
       <v-flex xs5>
        <HomeCard :chartData="getTodayHR" chartTitle="Today's Heart Rate" title="My Heart Rate" v-bind:tabs="getHomeCardHeartRateData" link="HeartRate" themeColor='#f87979'></HomeCard>
      </v-flex>
      <v-flex xs5>
        <HomeCard :stepGoal="stepGoal" :chartData="getMonthSteps.slice(Math.max(getMonthSteps.length - 7, 0))" chartTitle="This Week's Step Count" title="My Step Count" v-bind:tabs="getHomeCardStepData" link="StepCount" themeColor='#0000FF'></HomeCard>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import HomeCard from './HomeCard.vue'
import moment from 'moment'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'home',
  data () {
    return {
      msg: 'Home Section'
    }
  },
  //todo: remove hardcoded vals
  computed: {
    device(){
      return this.$store.state.device;
    },
    user(){
      return this.$store.state.user;
    },
    stepGoal(){
      return this.$store.state.userGoalsData.stepGoals.currentGoal;
    },
    ...mapGetters([
        'getHomeCardStepData',
        'getHomeCardHeartRateData',
        'getMonthSteps',
        'getTodayHR'
    ])
  },
  filters: {
    timestampToDate(date){
      return moment.unix(date).fromNow();
    }
  },
  methods: {
      ...mapActions([
          'getStepCountData',
          'getHeartRateData',
          'getStepCountGoals',
          'getHeartRateGoals'
      ])
  },
  mounted: function () {
      this.getStepCountData();
      this.getHeartRateData();
      this.getStepCountGoals();
      this.getHeartRateGoals();
  },
  components: {
    HomeCard
  }
}
</script>

<style lang="scss">
#home {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.vert-center{
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 50px;
}
.profile{
  height: 150px;
}
.watch-icon{
  height: 50px;
}
.welcome{
  font-size: 3.5rem;
  font-weight: 520;
  margin-bottom: 0px;
  margin-left: 4px;
}
.sync-text{
  font-size: 1.8rem;
  font-weight: 525;
  margin-bottom: 0px;
  color: #F95F62;
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
</style>
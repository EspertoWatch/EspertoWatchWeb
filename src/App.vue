<template>
  <v-app style="backgroundColor: #EFF2F7">
    <div v-if="loginStatus.isLoggedIn">
     <v-toolbar flat style=" backgroundColor: #fff; border-bottom: solid 1px; border-color: #d3d3d3">
      <v-toolbar-title>
        <router-link to="/">
            <v-layout row justify-center>
                <img src="/assets/app-images/espertoLogo.png" class="esperto-logo">
                <div class="vert-center">
                    <p class="esperto-logo-text">Esperto Labs</p>
                </div>
            </v-layout>
        </router-link>
      </v-toolbar-title>
      <v-spacer/>
      <div class="nav-logos">
        <v-layout row>
          <router-link to="Profile"><img src="/assets/app-images/profile-nav-2.png"></router-link>
          <router-link to="StepCount"><img src="/assets/app-images/step-nav-2.png"></router-link>
          <router-link to="HeartRate"><img src="/assets/app-images/heart-nav-2.png"></router-link>
          <div style=" display: flex; flex-direction: column; justify-content: center;">
            <a @click='logout'>Logout</a>
          </div>
        </v-layout>
      </div>
      </v-toolbar>
      <v-content>
        <v-container fluid>
          <router-view></router-view>
        </v-container>
      </v-content>
    </div>
    <div v-else>
      <Login></Login>
    </div>
  </v-app>
</template>

<script>
import Login from './Login.vue';
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  computed: {
    loginStatus(){
        return this.$store.state.loginStatus;
    },
  },
  components: {
    Login
  },
  methods: {
      ...mapActions([
          'checkAuthentication',
          'logout'
      ])
  },
  mounted: function () {
     this.checkAuthentication();
  },
}
</script>

<style lang="scss" scoped>
a {
  color: inherit; /* blue colors for links too */
  text-decoration: none !important; /* no underline */
}
.nav-logos{
  img{
    vertical-align: middle;
    height: 35px;
    margin-left: 3vw;
    margin-right: 3vw;
  }
}
.esperto-logo{
  height: 50px;
  margin-top: 5px;
}
.esperto-logo-text{
  font-size: 1.5em;
  margin-left: 5px;
  margin-bottom: 0px;
  font-weight: 400 !important;
}
.vert-center{
  margin-top: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

</style>

<template>
  <div id="profile">
    <v-layout row justify-center style="margin-bottom: 10px">
      <v-flex xs10>
        <v-layout row>
          <p class="section-header-text">My Settings</p>
          <v-layout row v-if="isEditing" style="margin-left: 50px">
            <v-icon v-on:click="saveData" x-large>save</v-icon>
            <div class="vert-center" style="margin-left: 10px">
              <a v-on:click="saveData" class="save-text">Save Changes</a>
            </div>
          </v-layout>
        </v-layout>
      </v-flex>
    </v-layout>
    <v-layout row justify-space-around style="margin-bottom: 10px">
            <v-flex xs5>
                <EditField ref="nameField" fieldName="name" v-on:start_editing="startEditing" v-on:data_updated="updateData" label="Name" :value="user.name" iconName="edit"/>
            </v-flex>
            <v-flex xs5>
                <EditField ref="birthDateField" fieldName="birthDate" v-on:start_editing="startEditing" v-on:data_updated="updateData" label="Birth Date" :value="user.birthDate | timestampToBirthDate" type="dateSelector" iconName="edit"/>
            </v-flex>
      </v-layout>
      <v-layout row justify-space-around style="margin-bottom: 10px">
            <v-flex xs5>
                <EditField ref="heightField" fieldName="height" v-on:start_editing="startEditing" v-on:data_updated="updateData" label="Height" :value="user.height" :unit="user.heightUnit" :options="['cm', 'inches']" iconName="edit" type="unitField"/>
            </v-flex>
            <v-flex xs5>
                <EditField ref="weightField" fieldName="weight" v-on:start_editing="startEditing" v-on:data_updated="updateData" label="Weight" :value="user.weight" :unit="user.weightUnit" :options="['lbs', 'kg']" type="unitField" iconName="edit"/>
            </v-flex>
      </v-layout>
      <v-layout row justify-space-around style="margin-bottom: 10px">
            <v-flex xs5>
                <EditField ref="handednessField" fieldName="handedness" v-on:start_editing="startEditing" v-on:data_updated="updateData" label="Handedness" :value="user.handedness" type="dropdownField" :options="['Right', 'Left']" iconName="edit"/>
            </v-flex>
            <v-flex xs5>
                <EditField ref="genderField" fieldName="gender" v-on:start_editing="startEditing" v-on:data_updated="updateData" label="Gender" :options="['Male', 'Female']" type="dropdownField" :value="user.gender" iconName="edit"/>
            </v-flex>
      </v-layout>
      <v-layout row justify-space-around style="margin-bottom: 10px">
            <v-flex xs5>
                <EditField ref="goalField" fieldName="currentGoal" v-on:start_editing="startEditing" v-on:data_updated="updateData" label="Daily Step Goal" :value="stepGoals.currentGoal"  iconName="edit"/>
            </v-flex>
            <v-flex xs5>
                <EditField label="My Device" :value="`${device.name} ${device.version}`" type="info" iconName="info-circle"/>
            </v-flex>
      </v-layout>
      <div style="margin-top: 100px">
          <v-alert
            v-model="showAlert"
            dismissible
            type="success">
            You've successfully submitted your changes!
        </v-alert>
      </div>
  </div>
</template>

<script>
import moment from 'moment'
import EditField from './EditField.vue'
import { mapActions } from 'vuex'
export default {
  name: 'profile',
  data () {
    return {
      msg: 'Profile Section',
      isEditing: false,
      showAlert: false
    }
  },
  filters: {
    timestampToReadableBirthDate(date){
      return moment.unix(date).format('MMM Do YYYY')
    },
    timestampToBirthDate(date){
      return moment.unix(date).format('YYYY-MM-DD');
    },
  },
  computed: {
    user(){
      return this.$store.state.user;
    },
    stepGoals(){
      return this.$store.state.userGoalsData.stepGoals;
    },
    device(){
      return this.$store.state.device;
    }
  },
  methods: {
    ...mapActions([
        'updateUserData',
        'getUserInfo',
        'getStepCountGoals',
        'getHeartRateGoals',
        'changeStepGoal'
      ]),
      startEditing(status){
        this.isEditing = status;
      },
      saveData(){
        if(this.userDataEdits !== undefined){
           this.updateUserData(this.userDataEdits);
        }
        if(this.stepGoalEdits !== undefined){
          this.changeStepGoal(this.stepGoalEdits);
        }
        this.showAlert = true;
        this.isEditing = false;
        this.$refs.nameField.stopEditing();
        this.$refs.birthDateField.stopEditing();
        this.$refs.genderField.stopEditing();
        this.$refs.handednessField.stopEditing();
        this.$refs.heightField.stopEditing();
        this.$refs.weightField.stopEditing();
        this.$refs.goalField.stopEditing();
      },
      updateData(data){
        const propName = data.propName;
        const updatedData = data.data;
        if(propName !== "currentGoal"){
          let newUser = Object.assign({}, this.user);
          if(this.userDataEdits !== undefined){
            newUser = Object.assign({}, this.userDataEdits);
          }
          if(propName === "birthDate"){
            newUser[propName] = moment(updatedData, 'YYYY-MM-DD').unix();
          }
          else{
            newUser[propName] = updatedData;
          }
          this.userDataEdits = newUser;
        }
        else{
          let newStepGoal = Object.assign({}, this.stepGoals);
          if(this.stepGoalEdits !== undefined){
            newUser = Object.assign({}, this.stepGoalEdits);
          }
          newStepGoal[propName] = updatedData;
          this.stepGoalEdits = newStepGoal;
        }
      }
  },
  mounted: function () {
      this.getUserInfo();
      this.getStepCountGoals();
      this.getHeartRateGoals();
  },
  components: {
    EditField
  }
}
</script>

<style lang="scss">
#profile {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.section-header-text{
  font-size: 40px;
  font-weight: normal;
  margin-bottom: 0px;
}
.text-field-label{
  text-align: center;
  font-size: 20px;
  margin-top: 16px;
}
.text-field-value{
  text-align: center;
  font-size: 20px;
  color: #A9A9A9;
  margin-top: 16px;
}
.icon-style{
  margin-top: 15px;
  margin-right: 15px;
}
.vert-center{
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.save-text{
  color: #0A7BF6;
  font-size: 1.3em;
  margin-bottom: 0px;
}
</style>
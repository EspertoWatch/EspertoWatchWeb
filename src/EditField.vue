<template>
    <v-card>
      <v-layout row justify-space-between>
        <v-flex xs4>
          <p class="text-field-label">{{label}}</p>
        </v-flex>
        <v-flex xs6>
          <p v-if="!isEditing" class="text-field-value">{{getDisplayValue}}</p>
          <template v-else-if="type === 'dateSelector'">
              <v-date-picker :full-width="true" @change="dataUpdated(false)" v-model="value" color="blue"/>
          </template>
          <template v-else-if="type === 'dropdownField'">
              <v-select :items="options" @input="dataUpdated(false)" v-model="value"/>
          </template>
          <template v-else>
            <v-text-field v-model="value" @change="dataUpdated(false)"/>
            <v-select v-if="type==='unitField'" :items="options" @input="dataUpdated(true)" v-model="unit"/>
          </template>
        </v-flex>
        <div v-on:click="onPressIcon">
            <icon v-if="!isEditing" class="icon-style" :name="iconName" scale="2"/>
        </div>
      </v-layout>
    </v-card>
</template>

<script>
import moment from 'moment'
export default {
  name: 'editField',
  data () {
    return {
      isEditing: false,
    }
  },
  props: {
    iconName: String,
    label: String,
    value: [String, Number],
    type: String,
    options: Array,
    unit: String,
    fieldName: String
  },
  methods: {
    onPressIcon(){
      if(this.type !== "info"){
        this.isEditing = true;
        this.$emit('start_editing', true);
      }
    },
    stopEditing(){
      this.isEditing = false;
    },
    dataUpdated(isUnit){
      let data = {propName: this.fieldName, data: this.value}
      if(isUnit){
        data = {propName: this.fieldName + "unit", data: this.unit};
      }
      console.log(data);
      this.$emit('data_updated', data);
    }
  },
  computed: {
    getDisplayValue: function(){
      if(this.type === "unitField"){
        return this.value.toString() + this.unit;
      }
      else if(this.type ==="dateSelector"){
        return moment(this.value, 'YYYY-MM-DD').format('MMM Do YYYY');
      }
      else{
        return this.value;
      }
    }
  }
}
</script>

<style lang="scss">
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
</style>
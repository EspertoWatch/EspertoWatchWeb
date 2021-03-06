import Vue from 'vue'
import Vuex from 'vuex'
import moment from 'moment'
import axios from 'axios';
import { API } from 'aws-amplify';
import Amplify from 'aws-amplify';
import config from "./config";
import { Auth } from "aws-amplify";

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: config.cognito.REGION,
    userPoolId: config.cognito.USER_POOL_ID,
    identityPoolId: config.cognito.IDENTITY_POOL_ID,
    userPoolWebClientId: config.cognito.APP_CLIENT_ID
  },
  API: {
    endpoints: [
      {
        name: "esperto-app",
        endpoint: config.apiGateway.URL,
        region: config.apiGateway.REGION
      },
    ]
  }
});

Vue.use(Vuex);
"use strict";

//basically stores the state of the whole application
//currently you just see the initial state but that will change
//when users interact with it/api calls are made

//for now the store has fake data but it'll change
export const store = new Vuex.Store({
	state: {
		heartRateData: {
			rawHRData: {},
			avgDailyHR: {}
		},
		stepCountData: {
			totalDailySteps: {},
			rawStepData: {}
		},
		device: {
			name: "Esperto Watch",
			version: "1.0",
			lastSynced: 1520673603,
			specs: {
				storageSpaceTotal: "500Mb",
				storageSpaceRemaining: "400Mb",
				RAM: "20Mb",
				sensors: ["Accelerometer", "PPG (Heart Rate)", "Gyroscope", "Sp02 (temperature)"],
				processor: "nRF52",
			},
			image: "",
		},
		user: {},
		signUpInfo: {},
		loginStatus: {
			isLoggedIn: false,
			mustChangePass: false,
		},
		userGoalsData: {
			heartRateGoals: {},
			stepGoals: {}
		}
	},
	getters: {
		getHomeCardStepData: state => {
			//todo: remove hardcoded vals
			const today = state.stepCountData.currentSteps;
			const yesterday = state.stepCountData.totalDailySteps[moment().subtract(1, 'day').format("YYYY-MM-DD")] ? Math.round(state.stepCountData.totalDailySteps[moment().subtract(1, 'day').format("YYYY-MM-DD")], 1) : 0;
			let thisWkSum = state.stepCountData.currentSteps;
			let thisWkCounter = 1;
			for(let i = 1; i < 7; i ++){
				const date = moment().subtract(i, 'day').format("YYYY-MM-DD");
				if(state.stepCountData.totalDailySteps[date]){
					thisWkCounter++;
					thisWkSum = thisWkSum + state.stepCountData.totalDailySteps[date];
				}
			}
			const thisWeek = Math.round(thisWkSum/thisWkCounter, 1);

			let lastWkSum = 0;
			let lastWkCounter = 0;
			for(let i = 7; i < 14; i ++){
				const date = moment().subtract(i, 'day').format("YYYY-MM-DD");
				if(state.stepCountData.totalDailySteps[date]){
					lastWkCounter++;
					lastWkSum = lastWkSum + state.stepCountData.totalDailySteps[date];
				}
			}
			const lastWeek = Math.round(lastWkSum/lastWkCounter, 1);

			let thisMonthSum = state.stepCountData.currentSteps;
			let thisMonthCounter = 1;
			for(let i = 1; i < 30; i ++){
				const date = moment().subtract(i, 'day').format("YYYY-MM-DD");
				if(state.stepCountData.totalDailySteps[date]){
					thisMonthCounter++;
					thisMonthSum = thisMonthSum + state.stepCountData.totalDailySteps[date];
				}
			}
			const thisMonth = Math.round(thisMonthSum/thisMonthCounter, 1);

            const lastMonth = 12000;
			const unit = state.stepCountData.unit;
			let tabData = [
				{
					id: "today_steps",
					title: "Today",
					mainValue: today,
					lastInterval: today - yesterday,
					unit: unit
				},
				{
					id: "week_steps",
					title: "This Week",
					mainValue: thisWeek,
					lastInterval: thisWeek - lastWeek,
					unit: unit
				},
				{
					id: "month_steps",
					title: "This Month",
					mainValue: thisMonth,
					totalValue: thisMonthSum,
					unit: unit
				},
			];
			return tabData;
		},
        getHomeCardHeartRateData: state => {
            //todo: remove hardcoded vals
            const current = Math.round(state.heartRateData.currentHR, 1);

			const lastHrSuffix = moment().hour() > 11 ? (moment().hour() - 1).toString() : "0" + (moment().hour() - 1).toString();
			const lastHR = state.heartRateData.avgDailyHR[moment().format("YYYY-MM-DD") + " " + lastHrSuffix] ? state.heartRateData.avgDailyHR[moment().format("YYYY-MM-DD") + " " + lastHrSuffix] : 0;

			const today = state.heartRateData.avgDailyHR[moment().format("YYYY-MM-DD")] ? Math.round(state.heartRateData.avgDailyHR[moment().format("YYYY-MM-DD")], 1) : 0;
            const yesterday = state.heartRateData.avgDailyHR[moment().subtract(1, 'day').format("YYYY-MM-DD")] ? Math.round(state.heartRateData.avgDailyHR[moment().subtract(1, 'day').format("YYYY-MM-DD")], 1) : 0;
			
			let thisWkSum = 0;
			let thisWkCounter = 0;
			for(let i = 0; i < 7; i ++){
				const date = moment().subtract(i, 'day').format("YYYY-MM-DD");
				if(state.heartRateData.avgDailyHR[date]){
					thisWkCounter++;
					thisWkSum = thisWkSum + state.heartRateData.avgDailyHR[date];
				}
			}
			const thisWeek = Math.round(thisWkSum/thisWkCounter, 1);

			let lastWkSum = 0;
			let lastWkCounter = 0;
			for(let i = 7; i < 14; i ++){
				const date = moment().subtract(i, 'day').format("YYYY-MM-DD");
				if(state.heartRateData.avgDailyHR[date]){
					lastWkCounter++;
					lastWkSum = lastWkSum + state.heartRateData.avgDailyHR[date];
				}
			}
			const lastWeek = Math.round(lastWkCounter !== 0 ? lastWkSum/lastWkCounter : 0, 1);


			const unit = state.heartRateData.unit;
			let tabData = [
				{
					title: "Current",
					mainValue: current,
					lastInterval: current - lastHR,
					unit: unit
				},
				{
					title: "Today",
					mainValue: today,
					lastInterval: today - yesterday,
					unit: unit
				},
				{
					title: "This Week",
					mainValue: thisWeek,
					lastInterval: thisWeek - lastWeek,
					unit: unit
				},
			];
			return tabData;
        },
		stepGoalProgress: state => {
			return Math.round((state.stepCountData.currentSteps/state.userGoalsData.stepGoals.currentGoal)*100, 2);
		},
		getMonthSteps: state => {
			let monthSteps = [state.stepCountData.currentSteps];
			for(let i = 1; i < 30; i ++){
				const date = moment().subtract(i, 'day').format("YYYY-MM-DD");
				const numSteps = state.stepCountData.totalDailySteps[date] ? state.stepCountData.totalDailySteps[date] : 0;
				monthSteps.unshift(numSteps);
			}
			return monthSteps;
		},
		getTodayHR: state => {
			const keys = Object.keys(state.heartRateData.rawHRData).map(Number);
			const unixStart = moment().startOf('day').unix();
			const unixEnd = moment().endOf('day').unix();
			const todayUnixTimes = keys.filter(key => key <= unixEnd && key >= unixStart).sort((a, b) => a - b);

			let todayHRs = [];
			todayUnixTimes.forEach(function(timestamp){
				todayHRs.push(state.heartRateData.rawHRData[timestamp]);
			});
			todayHRs.push(state.heartRateData.currentHR);

			return todayHRs;
		},
		getWeekHR: state => {
			let weekHR = [];
			for(let i = 0; i < 7; i ++){
				const date = moment().subtract(i, 'day').format("YYYY-MM-DD");
				const hrVal = state.heartRateData.avgDailyHR[date] ? state.heartRateData.avgDailyHR[date] : 0;
				weekHR.unshift(hrVal);
			}
			return weekHR;
		}
	},
	mutations: {
		CHANGE_USER_DATA(state, newUser){
			state.user = newUser;
		},
		CHANGE_STEP_GOAL(state, newGoal){
			state.userGoalsData.stepGoals.currentGoal = newGoal;
		},
		CHANGE_HEART_GOAL(state, newGoal){
			state.userGoalsData.heartRateGoals.currentGoal = newGoal;
		},
        GET_STEP_COUNT(state, stepCount){
            state.stepCountData = stepCount;
			state.stepCountData.unit = "Steps";
			state.stepCountData.rawStepData = stepCount.stepsMap;

			const keys = Object.keys(stepCount.stepsMap);
			let totDailySteps = {};
			//the above object will store the avg daily HR for the past week
			for(let i = 0; i < 30; i ++){
				const date = moment().subtract(i, 'day').format("YYYY-MM-DD");
				const unixStart = moment().subtract(i,'days').startOf('day').unix();
				const unixEnd = moment().subtract(i,'days').endOf('day').unix();
				const dayUnixTimes = keys.filter(key => key <= unixEnd && key >= unixStart);

				const stepCountsForDay = [];
				dayUnixTimes.forEach(function(timestamp){
					stepCountsForDay.push(stepCount.stepsMap[timestamp]);
				});
				if(stepCountsForDay.length > 0){
					totDailySteps[date] = Math.max(...stepCountsForDay);
				}
			}

			state.stepCountData.totalDailySteps = totDailySteps;
        },
        GET_HEART_RATE(state, heartRate){
            state.heartRateData.currentHR = heartRate.currentHR;
			state.heartRateData.unit = "BPM";
			state.heartRateData.rawHRData = heartRate.HRMap;
			
			const keys = Object.keys(heartRate.HRMap);
			let avgDailyHR = {};
			//the above object will store the avg daily HR for the past week
			for(let i = 0; i < 7; i ++){
				const date = moment().subtract(i, 'day').format("YYYY-MM-DD");
				const unixStart = moment().subtract(i,'days').startOf('day').unix();
				const unixEnd = moment().subtract(i,'days').endOf('day').unix();
				const dayUnixTimes = keys.filter(key => key <= unixEnd && key >= unixStart);

				let sum = 0;
				let numVals = 0;
				dayUnixTimes.forEach(function(timestamp){
					sum = sum + heartRate.HRMap[timestamp];
					numVals = numVals + 1;
				});
				avgDailyHR[date] = sum === 0 ? 0 : sum/numVals;
			}
			state.heartRateData.avgDailyHR = avgDailyHR;
			debugger;
        },
		LOGOUT_SUCCESS(state){
			//reset to default state upon logout
			state.loginStatus = {
				isLoggedIn: false,
				mustChangePass: false,
			}
		},
		GET_USER_INFO(state, userInfo){
			state.user = userInfo;
			state.loginStatus.isLoggedIn = true;
		},
		GET_USER_STEP_GOALS(state, stepGoals){
			state.userGoalsData.stepGoals = stepGoals;
		},
		GET_USER_HEART_GOALS(state, heartRateGoals){
			state.userGoalsData.heartRateGoals = heartRateGoals;
		},
		NEW_PASS_REQUIRED(state, cognitoUser){
			state.cognitoUser = cognitoUser;
			state.loginStatus.mustChangePass = true;
		},
		STORE_SIGN_UP_INFO(state, signUpInfo){
			state.signUpInfo = signUpInfo;
		}
	},
	actions: {
  		async updateUserData(context, newUserData){
			const res = await API.post('esperto-app', '/userInfo', {body: newUserData});
  			context.commit('CHANGE_USER_DATA', newUserData);
  		},
		
		//still need to add api calls here
		//right now newGoal just contains new int to be set as currentGoal
		//eventually will need to be an object with isAutoset and currentGoal
		async changeStepGoal(context, newGoal){
			const res = await API.post('esperto-app', '/stepCountGoals', {body: newGoal});
			context.commit('CHANGE_STEP_GOAL', newGoal.currentGoal);
		},
		async changeHeartGoal(context, newGoal){
			const goalObj = Object.assign({}, context.state.userGoalsData.heartRateGoals);
			goalObj.currentGoal = newGoal;
			const res = await API.post('esperto-app', '/heartRateGoals', {body: goalObj})
			context.commit('CHANGE_HEART_GOAL', newGoal);
		},

  		async getStepCountData(context){
            const stepCount = await API.get('esperto-app', `/stepCount/${context.state.user.userId}`);
			context.commit('GET_STEP_COUNT', stepCount);
		},
        async getHeartRateData(context){
            const heartRate = await API.get('esperto-app', `/heartRate/${context.state.user.userId}`);
            context.commit('GET_HEART_RATE', heartRate);
        },
		async getUserInfo(context, userId){
			const id = userId ? userId : context.state.user.userId
			const userInfo = await API.get('esperto-app', `/userInfo/${id}`);
			context.commit('GET_USER_INFO', userInfo);
		},
		async postUserInfo(context, userObj){
			const res = await API.post('esperto-app', '/userInfo', {body: userObj});
			context.commit('GET_USER_INFO', userObj);
		},
		async getStepCountGoals(context){
			const stepCountGoals = await API.get('esperto-app', `/stepCountGoals/${context.state.user.userId}`);
			context.commit('GET_USER_STEP_GOALS', stepCountGoals);
		},
		async getHeartRateGoals(context){
			const heartRateGoals = await API.get('esperto-app', `/heartRateGoals/${context.state.user.userId}`);
			context.commit('GET_USER_HEART_GOALS', heartRateGoals);
		},
		async login(context, loginAttempt){
			try {
				await Auth.signIn(loginAttempt.username, loginAttempt.password)
					.then(function(res){
						if(res.challengeName === 'NEW_PASSWORD_REQUIRED'){
							context.commit('NEW_PASS_REQUIRED', res);
						}
						else{
							context.dispatch('getUserInfo', res.username);
						}
					});
			} catch (e) {
				alert(e.message);
			}
		},

		//need to update to use cognito
		async signUp(context, signUpData){
			try{
				await Auth.signUp({username: signUpData.username, password: signUpData.password}).then(function(res){
					const signUpInfo = Object.assign({}, signUpData);
					signUpInfo.userId = res.userSub
					context.commit('STORE_SIGN_UP_INFO', signUpInfo);
				});
			} catch(e){
				alert(e.message);
			}
		},
		async confirmSignUp(context, confirmationCode){
			try {
				await Auth.confirmSignUp(context.state.signUpInfo.username, confirmationCode).then(function(res){
					const userInfo = {
						"name": context.state.signUpInfo.firstName + " " + context.state.signUpInfo.lastName,
						"userId": context.state.signUpInfo.userId
					};
					context.dispatch('postUserInfo', userInfo);
				})
				//await Auth.signIn(this.state.email, this.state.password);
			} catch (e) {
				alert(e.message);
			}
		},
		async checkAuthentication(context){
			await Auth.currentUserInfo()
					.then(function(res){
						if(res){
							context.dispatch('getUserInfo', res.username)
						}
						else{
							console.log('No user signed in');
						}
					});
		},
		async resetPassword(context, payload){
			await Auth.completeNewPassword(payload.cognitoUser, payload.password, {email: payload.email})
				.then(function(res){
					context.dispatch('getUserInfo', payload.cognitoUser.username);
				});
		},
		async logout(context){
			 await Auth.signOut()
			 	.then(function(){
					 context.commit('LOGOUT_SUCCESS');
				 });
		}
	}
})

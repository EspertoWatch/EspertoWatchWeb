<template>
	<div>
		<svg version="1.1" :id="getID(1)" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" :width="sizeValOne" :height="sizeValOne" viewBox="0 0 500 700" >
          <linearGradient :id="getGradID(1)" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%" stop-opacity="1" stop-color="black"/>
              <stop :offset="percentage1" stop-opacity="1" stop-color="black"/>
              <stop :offset="percentage1" stop-opacity="1" stop-color="grey"/>
              <stop offset="100%" stop-opacity="1" stop-color="grey"/>
          </linearGradient>
          <path d="M298.794,386.711c27.805,9.522,52.357,15.587,87.633,26.427C372.875,584.374,210.952,516.371,298.794,386.711z
         M443.366,229.409c-1.826-51.415-10.882-118.86-83.017-108.292c-33.815,8.825-58.8,45.962-70.551,110.035
        c-6.454,35.229-2.701,84.678,4.912,114.32c6.951,20.889,4.587,19.605,12.058,23.572c28.916,6.514,57.542,13.725,86.693,21.078
        C423.075,369.209,447.397,258.182,443.366,229.409z M220.752,225.463c7.607-29.646,11.36-79.095,4.909-114.32
        C213.919,47.067,188.931,9.924,155.11,1.105C82.975-9.463,73.919,57.981,72.093,109.399
        c-4.031,28.768,20.294,139.802,49.911,160.711c29.149-7.353,57.771-14.558,86.696-21.078
        C216.162,245.069,213.798,246.352,220.752,225.463z M129.029,293.132c13.547,171.234,175.47,103.231,87.63-26.427
        C188.854,276.228,164.304,282.292,129.029,293.132z" :fill="getFill(1)" transform="rotate(45) translate(325, -225)"/>
        </svg>
        <svg version="1.1" :id="getID(2)" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" :width="sizeValOne" :height="sizeValOne" viewBox="0 0 500 700" >
          <linearGradient :id="getGradID(2)" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%" stop-opacity="1" stop-color="black"/>
              <stop :offset="percentage2" stop-opacity="1" stop-color="black"/>
              <stop :offset="percentage2" stop-opacity="1" stop-color="grey"/>
              <stop offset="100%" stop-opacity="1" stop-color="grey"/>
          </linearGradient>
          <path d="M298.794,386.711c27.805,9.522,52.357,15.587,87.633,26.427C372.875,584.374,210.952,516.371,298.794,386.711z
         M443.366,229.409c-1.826-51.415-10.882-118.86-83.017-108.292c-33.815,8.825-58.8,45.962-70.551,110.035
        c-6.454,35.229-2.701,84.678,4.912,114.32c6.951,20.889,4.587,19.605,12.058,23.572c28.916,6.514,57.542,13.725,86.693,21.078
        C423.075,369.209,447.397,258.182,443.366,229.409z M220.752,225.463c7.607-29.646,11.36-79.095,4.909-114.32
        C213.919,47.067,188.931,9.924,155.11,1.105C82.975-9.463,73.919,57.981,72.093,109.399
        c-4.031,28.768,20.294,139.802,49.911,160.711c29.149-7.353,57.771-14.558,86.696-21.078
        C216.162,245.069,213.798,246.352,220.752,225.463z M129.029,293.132c13.547,171.234,175.47,103.231,87.63-26.427
        C188.854,276.228,164.304,282.292,129.029,293.132z" :fill="getFill(2)" transform="rotate(
      70) translate(75, -400)"/>
        </svg>
        <svg version="1.1" :id="getID(3)" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" :width="sizeValTwo" :height="sizeValOne" viewBox="0 0 500 700" >
          <linearGradient :id="getGradID(3)" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%" stop-opacity="1" stop-color="black"/>
              <stop :offset="percentage3" stop-opacity="1" stop-color="black"/>
              <stop :offset="percentage3" stop-opacity="1" stop-color="grey"/>
              <stop offset="100%" stop-opacity="1" stop-color="grey"/>
          </linearGradient>
          <path d="M298.794,386.711c27.805,9.522,52.357,15.587,87.633,26.427C372.875,584.374,210.952,516.371,298.794,386.711z
         M443.366,229.409c-1.826-51.415-10.882-118.86-83.017-108.292c-33.815,8.825-58.8,45.962-70.551,110.035
        c-6.454,35.229-2.701,84.678,4.912,114.32c6.951,20.889,4.587,19.605,12.058,23.572c28.916,6.514,57.542,13.725,86.693,21.078
        C423.075,369.209,447.397,258.182,443.366,229.409z M220.752,225.463c7.607-29.646,11.36-79.095,4.909-114.32
        C213.919,47.067,188.931,9.924,155.11,1.105C82.975-9.463,73.919,57.981,72.093,109.399
        c-4.031,28.768,20.294,139.802,49.911,160.711c29.149-7.353,57.771-14.558,86.696-21.078
        C216.162,245.069,213.798,246.352,220.752,225.463z M129.029,293.132c13.547,171.234,175.47,103.231,87.63-26.427
        C188.854,276.228,164.304,282.292,129.029,293.132z" :fill="getFill(3)" transform="rotate(
      90) translate(-50, -500)"/>
        </svg>
        <svg version="1.1" :id="getID(4)" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" :width="sizeValTwo" :height="sizeValOne" viewBox="0 0 500 700" >
          <linearGradient :id="getGradID(4)" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%" stop-opacity="1" stop-color="black"/>
              <stop :offset="percentage4" stop-opacity="1" stop-color="black"/>
              <stop :offset="percentage4" stop-opacity="1" stop-color="grey"/>
              <stop offset="100%" stop-opacity="1" stop-color="grey"/>
          </linearGradient>
          <path d="M298.794,386.711c27.805,9.522,52.357,15.587,87.633,26.427C372.875,584.374,210.952,516.371,298.794,386.711z
         M443.366,229.409c-1.826-51.415-10.882-118.86-83.017-108.292c-33.815,8.825-58.8,45.962-70.551,110.035
        c-6.454,35.229-2.701,84.678,4.912,114.32c6.951,20.889,4.587,19.605,12.058,23.572c28.916,6.514,57.542,13.725,86.693,21.078
        C423.075,369.209,447.397,258.182,443.366,229.409z M220.752,225.463c7.607-29.646,11.36-79.095,4.909-114.32
        C213.919,47.067,188.931,9.924,155.11,1.105C82.975-9.463,73.919,57.981,72.093,109.399
        c-4.031,28.768,20.294,139.802,49.911,160.711c29.149-7.353,57.771-14.558,86.696-21.078
        C216.162,245.069,213.798,246.352,220.752,225.463z M129.029,293.132c13.547,171.234,175.47,103.231,87.63-26.427
        C188.854,276.228,164.304,282.292,129.029,293.132z" :fill="getFill(4)" transform="rotate(
      110) translate(-75, -575)"/>
        </svg>
        <svg version="1.1" :id="getID(5)" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" :width="sizeValOne" :height="sizeValOne" viewBox="0 0 500 700" >
          <linearGradient :id="getGradID(5)" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%" stop-opacity="1" stop-color="black"/>
              <stop :offset="percentage5" stop-opacity="1" stop-color="black"/>
              <stop :offset="percentage5" stop-opacity="1" stop-color="grey"/>
              <stop offset="100%" stop-opacity="1" stop-color="grey"/>
          </linearGradient>
          <path d="M298.794,386.711c27.805,9.522,52.357,15.587,87.633,26.427C372.875,584.374,210.952,516.371,298.794,386.711z
         M443.366,229.409c-1.826-51.415-10.882-118.86-83.017-108.292c-33.815,8.825-58.8,45.962-70.551,110.035
        c-6.454,35.229-2.701,84.678,4.912,114.32c6.951,20.889,4.587,19.605,12.058,23.572c28.916,6.514,57.542,13.725,86.693,21.078
        C423.075,369.209,447.397,258.182,443.366,229.409z M220.752,225.463c7.607-29.646,11.36-79.095,4.909-114.32
        C213.919,47.067,188.931,9.924,155.11,1.105C82.975-9.463,73.919,57.981,72.093,109.399
        c-4.031,28.768,20.294,139.802,49.911,160.711c29.149-7.353,57.771-14.558,86.696-21.078
        C216.162,245.069,213.798,246.352,220.752,225.463z M129.029,293.132c13.547,171.234,175.47,103.231,87.63-26.427
        C188.854,276.228,164.304,282.292,129.029,293.132z" :fill="getFill(5)" transform="rotate(130) translate(30, -690)"/>
        </svg>
	</div>
</template>

<script>
export default{
	name: 'StepArchMeter',
	props: {
		percentage1: String,
		percentage2: String,
		percentage3: String,
		percentage4: String,
		percentage5: String,
    scale: String,
    idPrefix: String
	},
  computed: {
    sizeValOne(){
      return this.scale*75 + "px";
    },
    sizeValTwo(){
      return this.scale*60 + "px";
    },
  },
  methods:{
    getID(num){
      return this.idPrefix + num;
    },
    getGradID(num){
      return this.idPrefix + "grad" + num;
    },
    getFill(num){
      return "url(#" + this.idPrefix + "grad" + num + ")";
    }
  },
}
</script

<style lang="scss" scoped>
</style>